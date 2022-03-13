import {
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param,
  response
} from '@loopback/rest';
import {Cuentasdetalles} from '../models';
import {CuentasdetallesRepository} from '../repositories';

export class CuentasdetallesController {
  constructor(
    @repository(CuentasdetallesRepository)
    public cuentasdetallesRepository: CuentasdetallesRepository,
  ) { }
  /*
    @post('/cuentasdetalles')
    @response(200, {
      description: 'Cuentasdetalles model instance',
      content: {'application/json': {schema: getModelSchemaRef(Cuentasdetalles)}},
    })
    async create(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cuentasdetalles, {
              title: 'NewCuentasdetalles',

            }),
          },
        },
      })
      cuentasdetalles: Cuentasdetalles,
    ): Promise<Cuentasdetalles> {
      return this.cuentasdetallesRepository.create(cuentasdetalles);
    }

    @get('/cuentasdetalles/count')
    @response(200, {
      description: 'Cuentasdetalles model count',
      content: {'application/json': {schema: CountSchema}},
    })
    async count(
      @param.where(Cuentasdetalles) where?: Where<Cuentasdetalles>,
    ): Promise<Count> {
      return this.cuentasdetallesRepository.count(where);
    }

    @get('/cuentasdetalles')
    @response(200, {
      description: 'Array of Cuentasdetalles model instances',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(Cuentasdetalles, {includeRelations: true}),
          },
        },
      },
    })
    async find(
      @param.filter(Cuentasdetalles) filter?: Filter<Cuentasdetalles>,
    ): Promise<Cuentasdetalles[]> {
      return this.cuentasdetallesRepository.find(filter);
    }

    @patch('/cuentasdetalles')
    @response(200, {
      description: 'Cuentasdetalles PATCH success count',
      content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cuentasdetalles, {partial: true}),
          },
        },
      })
      cuentasdetalles: Cuentasdetalles,
      @param.where(Cuentasdetalles) where?: Where<Cuentasdetalles>,
    ): Promise<Count> {
      return this.cuentasdetallesRepository.updateAll(cuentasdetalles, where);
    }
  */
  @get('/cuentasdetalles/{id}')
  @response(200, {
    description: 'Cuentasdetalles model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cuentasdetalles, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cuentasdetalles, {exclude: 'where'}) filter?: FilterExcludingWhere<Cuentasdetalles>
  ): Promise<Cuentasdetalles> {
    return this.cuentasdetallesRepository.findById(id, filter);
  }
  /*
    @patch('/cuentasdetalles/{id}')
    @response(204, {
      description: 'Cuentasdetalles PATCH success',
    })
    async updateById(
      @param.path.string('id') id: string,
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cuentasdetalles, {partial: true}),
          },
        },
      })
      cuentasdetalles: Cuentasdetalles,
    ): Promise<void> {
      await this.cuentasdetallesRepository.updateById(id, cuentasdetalles);
    }

    @put('/cuentasdetalles/{id}')
    @response(204, {
      description: 'Cuentasdetalles PUT success',
    })
    async replaceById(
      @param.path.string('id') id: string,
      @requestBody() cuentasdetalles: Cuentasdetalles,
    ): Promise<void> {
      await this.cuentasdetallesRepository.replaceById(id, cuentasdetalles);
    }

    @del('/cuentasdetalles/{id}')
    @response(204, {
      description: 'Cuentasdetalles DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
      await this.cuentasdetallesRepository.deleteById(id);
    }
    */
}
