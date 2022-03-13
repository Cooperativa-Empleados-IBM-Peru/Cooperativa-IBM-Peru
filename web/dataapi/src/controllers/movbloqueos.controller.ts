import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Movbloqueos} from '../models';
import {MovbloqueosRepository} from '../repositories';

export class MovbloqueosController {
  constructor(
    @repository(MovbloqueosRepository)
    public movbloqueosRepository: MovbloqueosRepository,
  ) { }

  /*
    @get('/movbloqueos/count', {
      responses: {
        '200': {
          description: 'Movbloqueos model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Movbloqueos) where?: Where<Movbloqueos>,
    ): Promise<Count> {
      return this.movbloqueosRepository.count(where);
    }
  */
  @get('/movbloqueos', {
    responses: {
      '200': {
        description: 'Array of Movbloqueos model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Movbloqueos, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Movbloqueos) filter?: Filter<Movbloqueos>,
  ): Promise<Movbloqueos[]> {
    return this.movbloqueosRepository.find(filter);
  }

  @get('/movbloqueos/{id}', {
    responses: {
      '200': {
        description: 'Movbloqueos model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Movbloqueos, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Movbloqueos, {exclude: 'where'}) filter?: FilterExcludingWhere<Movbloqueos>
  ): Promise<Movbloqueos> {
    return this.movbloqueosRepository.findById(id, filter);
  }

}
