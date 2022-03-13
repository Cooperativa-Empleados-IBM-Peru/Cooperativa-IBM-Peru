import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Planpagostotales} from '../models';
import {PlanpagostotalesRepository} from '../repositories';

export class PlanpagostotalesController {
  constructor(
    @repository(PlanpagostotalesRepository)
    public planpagostotalesRepository: PlanpagostotalesRepository,
  ) { }
  /*
    @get('/planpagostotales/count', {
      responses: {
        '200': {
          description: 'Planpagostotales model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Planpagostotales) where?: Where<Planpagostotales>,
    ): Promise<Count> {
      return this.planpagostotalesRepository.count(where);
    }
  */
  @get('/planpagostotales', {
    responses: {
      '200': {
        description: 'Array of Planpagostotales model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Planpagostotales, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Planpagostotales) filter?: Filter<Planpagostotales>,
  ): Promise<Planpagostotales[]> {
    return this.planpagostotalesRepository.find(filter);
  }


  @get('/planpagostotales/{id}', {
    responses: {
      '200': {
        description: 'Planpagostotales model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Planpagostotales, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Planpagostotales, {exclude: 'where'}) filter?: FilterExcludingWhere<Planpagostotales>
  ): Promise<Planpagostotales> {
    return this.planpagostotalesRepository.findById(id, filter);
  }

}
