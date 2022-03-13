import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Prps} from '../models';
import {PrpsRepository} from '../repositories';

export class PrpsController {
  constructor(
    @repository(PrpsRepository)
    public prpsRepository: PrpsRepository,
  ) { }

  /*
    @get('/prps/count', {
      responses: {
        '200': {
          description: 'Prps model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Prps) where?: Where<Prps>,
    ): Promise<Count> {
      return this.prpsRepository.count(where);
    }
  */
  @get('/prps', {
    responses: {
      '200': {
        description: 'Array of Prps model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Prps, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Prps) filter?: Filter<Prps>,
  ): Promise<Prps[]> {
    return this.prpsRepository.find(filter);
  }

  @get('/prps/{id}', {
    responses: {
      '200': {
        description: 'Prps model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Prps, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Prps, {exclude: 'where'}) filter?: FilterExcludingWhere<Prps>
  ): Promise<Prps> {
    return this.prpsRepository.findById(id, filter);
  }

}
