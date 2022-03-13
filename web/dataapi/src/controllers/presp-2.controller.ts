import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Presp2} from '../models';
import {Presp2Repository} from '../repositories';

export class Presp2Controller {
  constructor(
    @repository(Presp2Repository)
    public presp2Repository: Presp2Repository,
  ) { }
  /*
    @get('/presp2/count', {
      responses: {
        '200': {
          description: 'Presp2 model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Presp2) where?: Where<Presp2>,
    ): Promise<Count> {
      return this.presp2Repository.count(where);
    }
  */
  @get('/presp2', {
    responses: {
      '200': {
        description: 'Array of Presp2 model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Presp2, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Presp2) filter?: Filter<Presp2>,
  ): Promise<Presp2[]> {
    return this.presp2Repository.find(filter);
  }


  @get('/presp2/{id}', {
    responses: {
      '200': {
        description: 'Presp2 model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Presp2, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Presp2, {exclude: 'where'}) filter?: FilterExcludingWhere<Presp2>
  ): Promise<Presp2> {
    return this.presp2Repository.findById(id, filter);
  }

}
