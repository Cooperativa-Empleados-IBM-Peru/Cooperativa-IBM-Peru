import {
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param, response
} from '@loopback/rest';
import {Certificadosmontostotalesid} from '../models';
import {CertificadosmontostotalesidRepository} from '../repositories';

export class CertificadosMontosTotalesIdController {
  constructor(
    @repository(CertificadosmontostotalesidRepository)
    public certificadosmontostotalesidRepository: CertificadosmontostotalesidRepository,
  ) { }
  /*
    @post('/certificadosmontostotalesids')
    @response(200, {
      description: 'Certificadosmontostotalesid model instance',
      content: {'application/json': {schema: getModelSchemaRef(Certificadosmontostotalesid)}},
    })
    async create(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Certificadosmontostotalesid, {
              title: 'NewCertificadosmontostotalesid',

            }),
          },
        },
      })
      certificadosmontostotalesid: Certificadosmontostotalesid,
    ): Promise<Certificadosmontostotalesid> {
      return this.certificadosmontostotalesidRepository.create(certificadosmontostotalesid);
    }

    @get('/certificadosmontostotalesids/count')
    @response(200, {
      description: 'Certificadosmontostotalesid model count',
      content: {'application/json': {schema: CountSchema}},
    })
    async count(
      @param.where(Certificadosmontostotalesid) where?: Where<Certificadosmontostotalesid>,
    ): Promise<Count> {
      return this.certificadosmontostotalesidRepository.count(where);
    }

    @get('/certificadosmontostotalesids')
    @response(200, {
      description: 'Array of Certificadosmontostotalesid model instances',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(Certificadosmontostotalesid, {includeRelations: true}),
          },
        },
      },
    })
    async find(
      @param.filter(Certificadosmontostotalesid) filter?: Filter<Certificadosmontostotalesid>,
    ): Promise<Certificadosmontostotalesid[]> {
      return this.certificadosmontostotalesidRepository.find(filter);
    }

    @patch('/certificadosmontostotalesids')
    @response(200, {
      description: 'Certificadosmontostotalesid PATCH success count',
      content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Certificadosmontostotalesid, {partial: true}),
          },
        },
      })
      certificadosmontostotalesid: Certificadosmontostotalesid,
      @param.where(Certificadosmontostotalesid) where?: Where<Certificadosmontostotalesid>,
    ): Promise<Count> {
      return this.certificadosmontostotalesidRepository.updateAll(certificadosmontostotalesid, where);
    }
  */
  @get('/certificadosmontostotalesids/{id}')
  @response(200, {
    description: 'Certificadosmontostotalesid model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Certificadosmontostotalesid, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Certificadosmontostotalesid, {exclude: 'where'}) filter?: FilterExcludingWhere<Certificadosmontostotalesid>
  ): Promise<Certificadosmontostotalesid> {
    return this.certificadosmontostotalesidRepository.findById(id, filter);
  }
  /*
    @patch('/certificadosmontostotalesids/{id}')
    @response(204, {
      description: 'Certificadosmontostotalesid PATCH success',
    })
    async updateById(
      @param.path.string('id') id: string,
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Certificadosmontostotalesid, {partial: true}),
          },
        },
      })
      certificadosmontostotalesid: Certificadosmontostotalesid,
    ): Promise<void> {
      await this.certificadosmontostotalesidRepository.updateById(id, certificadosmontostotalesid);
    }

    @put('/certificadosmontostotalesids/{id}')
    @response(204, {
      description: 'Certificadosmontostotalesid PUT success',
    })
    async replaceById(
      @param.path.string('id') id: string,
      @requestBody() certificadosmontostotalesid: Certificadosmontostotalesid,
    ): Promise<void> {
      await this.certificadosmontostotalesidRepository.replaceById(id, certificadosmontostotalesid);
    }

    @del('/certificadosmontostotalesids/{id}')
    @response(204, {
      description: 'Certificadosmontostotalesid DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
      await this.certificadosmontostotalesidRepository.deleteById(id);
    }
  */

}
