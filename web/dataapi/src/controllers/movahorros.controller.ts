import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Movahorros} from '../models';
import {MovahorrosRepository} from '../repositories';

export class MovahorrosController {
  constructor(
    @repository(MovahorrosRepository)
    public movahorrosRepository: MovahorrosRepository,
  ) { }

  /*
    @get('/movahorros/count', {
      responses: {
        '200': {
          description: 'Movahorros model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Movahorros) where?: Where<Movahorros>,
    ): Promise<Count> {
      return this.movahorrosRepository.count(where);
    }
  */
  @get('/movahorros', {
    responses: {
      '200': {
        description: 'Array of Movahorros model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Movahorros, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Movahorros) filter?: Filter<Movahorros>,
  ): Promise<Movahorros[]> {
    return this.movahorrosRepository.find(filter);
  }

  @get('/movahorros/{id}', {
    responses: {
      '200': {
        description: 'Movahorros model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Movahorros, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Movahorros, {exclude: 'where'}) filter?: FilterExcludingWhere<Movahorros>
  ): Promise<Movahorros> {
    return this.movahorrosRepository.findById(id, filter);
  }

}
