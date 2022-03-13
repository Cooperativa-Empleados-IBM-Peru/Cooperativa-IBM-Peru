import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Certificadosmontos} from '../models';
import {CertificadosmontosRepository} from '../repositories';

export class CertificadosmontosController {
  constructor(
    @repository(CertificadosmontosRepository)
    public certificadosmontosRepository: CertificadosmontosRepository,
  ) { }
  /*
    @get('/certificadosmontos/count', {
      responses: {
        '200': {
          description: 'Certificadosmontos model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Certificadosmontos) where?: Where<Certificadosmontos>,
    ): Promise<Count> {
      return this.certificadosmontosRepository.count(where);
    }
  */
  @get('/certificadosmontos', {
    responses: {
      '200': {
        description: 'Array of Certificadosmontos model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Certificadosmontos, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Certificadosmontos) filter?: Filter<Certificadosmontos>,
  ): Promise<Certificadosmontos[]> {
    return this.certificadosmontosRepository.find(filter);
  }

  @get('/certificadosmontos/{id}', {
    responses: {
      '200': {
        description: 'Certificadosmontos model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Certificadosmontos, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Certificadosmontos, {exclude: 'where'}) filter?: FilterExcludingWhere<Certificadosmontos>
  ): Promise<Certificadosmontos> {
    return this.certificadosmontosRepository.findById(id, filter);
  }

}
