import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Presp1} from '../models';
import {Presp1Repository} from '../repositories';

export class Presp1Controller {
  constructor(
    @repository(Presp1Repository)
    public presp1Repository: Presp1Repository,
  ) { }
  /*
    @get('/presp1/count', {
      responses: {
        '200': {
          description: 'Presp1 model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Presp1) where?: Where<Presp1>,
    ): Promise<Count> {
      return this.presp1Repository.count(where);
    }
  */
  @get('/presp1', {
    responses: {
      '200': {
        description: 'Array of Presp1 model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Presp1, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Presp1) filter?: Filter<Presp1>,
  ): Promise<Presp1[]> {
    return this.presp1Repository.find(filter);
  }

  @get('/presp1/{id}', {
    responses: {
      '200': {
        description: 'Presp1 model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Presp1, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Presp1, {exclude: 'where'}) filter?: FilterExcludingWhere<Presp1>
  ): Promise<Presp1> {
    return this.presp1Repository.findById(id, filter);
  }

}
