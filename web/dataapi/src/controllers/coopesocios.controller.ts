import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param,
  patch, post,
  put, requestBody
} from '@loopback/rest';
import {Coopesocios} from '../models';
import {CoopesociosRepository} from '../repositories';

const PERSONAL_FIELDS = [
  'TIPDID', 'DOCIDE', 'APEPAT', 'APEMAT', 'NOMBRE', 'DIRECC', 'LOCALI',
  'PROVIN', 'DEPART', 'NCOMPL', 'NOMBC2', 'TELCEL', 'NACION', 'CCIUDA',
  'NOMCON', 'DNICY', 'ESTCIV', 'CARGAM', 'OFICIO', 'SECTO1',
] as const;

export class CoopesociosController {
  constructor(
    @repository(CoopesociosRepository)
    public coopesociosRepository: CoopesociosRepository,
  ) {}

  @post('/coopesocios', {
    responses: {
      '200': {
        description: 'Coopesocios model instance',
        content: {'application/json': {schema: getModelSchemaRef(Coopesocios)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Coopesocios, {
            title: 'NewCoopesocios',

          }),
        },
      },
    })
    coopesocios: Coopesocios,
  ): Promise<Coopesocios> {
    return this.coopesociosRepository.create(coopesocios);
  }

  @get('/coopesocios/count', {
    responses: {
      '200': {
        description: 'Coopesocios model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Coopesocios) where?: Where<Coopesocios>,
  ): Promise<Count> {
    return this.coopesociosRepository.count(where);
  }

  // Read-only contract for the portal. Single input (DOCUME), single row,
  // personal fields only. No raw LoopBack filters, no saldo/CTS/uuid.
  @get('/coopesocios/by-docume/{docume}', {
    responses: {
      '200': {
        description: 'Personal fields for one socio',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: Object.fromEntries(
                ['DOCUME', ...PERSONAL_FIELDS].map((f) => [f, {type: 'string', nullable: true}])
              ),
            },
          },
        },
      },
      '404': {
        description: 'Socio not found',
      },
    },
  })
  async findByDocume(
    @param.path.string('docume') docume: string,
  ): Promise<Record<string, string | undefined>> {
    const key = docume.trim();
    if (!key) {
      throw new HttpErrors.BadRequest('docume no puede estar vacío');
    }

    // codempleado is CHAR(15) in db2 and may carry trailing spaces. DB2 CHAR
    // comparisons are blank-padded by default, so a plain `=` already matches
    // the unpadded key against a padded column. The second try uses an
    // explicitly padded `=` for any connector/driver binding quirk. Both stay
    // on the index. We deliberately avoid LIKE here: the base connector emits
    // `LIKE ?` without an ESCAPE clause, so a `%`/`_` in the key would turn the
    // pattern into wildcards, and an artificial row cap could then drop the
    // real row before the JS trim filter sees it (false 404).
    let matches = await this.coopesociosRepository.find({
      where: {codempleado: key},
      limit: 5,
    });
    if (matches.length === 0) {
      matches = await this.coopesociosRepository.find({
        where: {codempleado: key.padEnd(15, ' ')},
        limit: 5,
      });
    }
    const socio = matches.find((s) => s.codempleado && s.codempleado.trim() === key);

    if (!socio) {
      throw new HttpErrors.NotFound(`Socio con código ${key} no encontrado en db2`);
    }

    return this.pickPersonal(socio);
  }

  private pickPersonal(socio: Coopesocios): Record<string, string | undefined> {
    const out: Record<string, string | undefined> = {
      DOCUME: socio.codempleado?.trim(),
    };
    for (const col of PERSONAL_FIELDS) {
      const prop = col.toLowerCase();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const value = (socio as any)[prop];
      out[col] = value == null ? undefined : String(value).trim();
    }
    return out;
  }

  @get('/coopesocios', {
    responses: {
      '200': {
        description: 'Array of Coopesocios model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Coopesocios, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Coopesocios) filter?: Filter<Coopesocios>,
  ): Promise<Coopesocios[]> {
    return this.coopesociosRepository.find(filter);
  }

  @patch('/coopesocios', {
    responses: {
      '200': {
        description: 'Coopesocios PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Coopesocios, {partial: true}),
        },
      },
    })
    coopesocios: Coopesocios,
    @param.where(Coopesocios) where?: Where<Coopesocios>,
  ): Promise<Count> {
    return this.coopesociosRepository.updateAll(coopesocios, where);
  }

  @get('/coopesocios/{id}', {
    responses: {
      '200': {
        description: 'Coopesocios model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Coopesocios, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Coopesocios, {exclude: 'where'}) filter?: FilterExcludingWhere<Coopesocios>
  ): Promise<Coopesocios> {
    return this.coopesociosRepository.findById(id, filter);
  }

  @patch('/coopesocios/{id}', {
    responses: {
      '204': {
        description: 'Coopesocios PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Coopesocios, {partial: true}),
        },
      },
    })
    coopesocios: Coopesocios,
  ): Promise<void> {
    await this.coopesociosRepository.updateById(id, coopesocios);
  }

  @put('/coopesocios/{id}', {
    responses: {
      '204': {
        description: 'Coopesocios PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() coopesocios: Coopesocios,
  ): Promise<void> {
    await this.coopesociosRepository.replaceById(id, coopesocios);
  }

  @del('/coopesocios/{id}', {
    responses: {
      '204': {
        description: 'Coopesocios DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.coopesociosRepository.deleteById(id);
  }

}
