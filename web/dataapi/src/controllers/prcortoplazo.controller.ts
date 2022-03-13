import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Prcortoplazo} from '../models';
import {PrcortoplazoRepository} from '../repositories';

export class PrcortoplazoController {
  constructor(
    @repository(PrcortoplazoRepository)
    public prcortoplazoRepository: PrcortoplazoRepository,
  ) { }

  /*
    @get('/prcortoplazo/count', {
      responses: {
        '200': {
          description: 'Prcortoplazo model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Prcortoplazo) where?: Where<Prcortoplazo>,
    ): Promise<Count> {
      return this.prcortoplazoRepository.count(where);
    }
  */
  @get('/prcortoplazo', {
    responses: {
      '200': {
        description: 'Array of Prcortoplazo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Prcortoplazo, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Prcortoplazo) filter?: Filter<Prcortoplazo>,
  ): Promise<Prcortoplazo[]> {
    return this.prcortoplazoRepository.find(filter);
  }


  @get('/prcortoplazo/{id}', {
    responses: {
      '200': {
        description: 'Prcortoplazo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Prcortoplazo, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Prcortoplazo, {exclude: 'where'}) filter?: FilterExcludingWhere<Prcortoplazo>
  ): Promise<Prcortoplazo> {
    return this.prcortoplazoRepository.findById(id, filter);
  }

}
