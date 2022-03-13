import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Certificados} from '../models';
import {CertificadosRepository} from '../repositories';

export class CertificadosController {
  constructor(
    @repository(CertificadosRepository)
    public certificadosRepository: CertificadosRepository,
  ) { }

  /*
    @get('/certificados/count', {
      responses: {
        '200': {
          description: 'Certificados model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Certificados) where?: Where<Certificados>,
    ): Promise<Count> {
      return this.certificadosRepository.count(where);
    }
  */
  @get('/certificados', {
    responses: {
      '200': {
        description: 'Array of Certificados model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Certificados, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Certificados) filter?: Filter<Certificados>,
  ): Promise<Certificados[]> {
    return this.certificadosRepository.find(filter);
  }

  @get('/certificados/{id}', {
    responses: {
      '200': {
        description: 'Certificados model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Certificados, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Certificados, {exclude: 'where'}) filter?: FilterExcludingWhere<Certificados>
  ): Promise<Certificados> {
    return this.certificadosRepository.findById(id, filter);
  }

}
