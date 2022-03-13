import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Garantizados} from '../models';
import {GarantizadosRepository} from '../repositories';

export class GarantizadosController {
  constructor(
    @repository(GarantizadosRepository)
    public garantizadosRepository: GarantizadosRepository,
  ) { }
  /*
    @get('/garantizados/count', {
      responses: {
        '200': {
          description: 'Garantizados model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Garantizados) where?: Where<Garantizados>,
    ): Promise<Count> {
      return this.garantizadosRepository.count(where);
    }
  */
  @get('/garantizados', {
    responses: {
      '200': {
        description: 'Array of Garantizados model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Garantizados, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Garantizados) filter?: Filter<Garantizados>,
  ): Promise<Garantizados[]> {
    return this.garantizadosRepository.find(filter);
  }

  @get('/garantizados/{id}', {
    responses: {
      '200': {
        description: 'Garantizados model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Garantizados, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Garantizados, {exclude: 'where'}) filter?: FilterExcludingWhere<Garantizados>
  ): Promise<Garantizados> {
    return this.garantizadosRepository.findById(id, filter);
  }

}
