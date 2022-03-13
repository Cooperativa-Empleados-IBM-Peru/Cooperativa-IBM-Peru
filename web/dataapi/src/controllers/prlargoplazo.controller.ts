import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Prlargoplazo} from '../models';
import {PrlargoplazoRepository} from '../repositories';

export class PrlargoplazoController {
  constructor(
    @repository(PrlargoplazoRepository)
    public prlargoplazoRepository: PrlargoplazoRepository,
  ) { }
  /*
    @get('/prlargoplazo/count', {
      responses: {
        '200': {
          description: 'Prlargoplazo model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Prlargoplazo) where?: Where<Prlargoplazo>,
    ): Promise<Count> {
      return this.prlargoplazoRepository.count(where);
    }
  */
  @get('/prlargoplazo', {
    responses: {
      '200': {
        description: 'Array of Prlargoplazo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Prlargoplazo, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Prlargoplazo) filter?: Filter<Prlargoplazo>,
  ): Promise<Prlargoplazo[]> {
    return this.prlargoplazoRepository.find(filter);
  }


  @get('/prlargoplazo/{id}', {
    responses: {
      '200': {
        description: 'Prlargoplazo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Prlargoplazo, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Prlargoplazo, {exclude: 'where'}) filter?: FilterExcludingWhere<Prlargoplazo>
  ): Promise<Prlargoplazo> {
    return this.prlargoplazoRepository.findById(id, filter);
  }

}
