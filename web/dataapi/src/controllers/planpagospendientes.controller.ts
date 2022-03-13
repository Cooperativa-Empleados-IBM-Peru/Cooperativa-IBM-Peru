import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Planpagospendientes} from '../models';
import {PlanpagospendientesRepository} from '../repositories';

export class PlanpagospendientesController {
  constructor(
    @repository(PlanpagospendientesRepository)
    public planpagospendientesRepository: PlanpagospendientesRepository,
  ) { }

  /*
    @get('/planpagospendientes/count', {
      responses: {
        '200': {
          description: 'Planpagospendientes model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Planpagospendientes) where?: Where<Planpagospendientes>,
    ): Promise<Count> {
      return this.planpagospendientesRepository.count(where);
    }
  */

  @get('/planpagospendientes', {
    responses: {
      '200': {
        description: 'Array of Planpagospendientes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Planpagospendientes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Planpagospendientes) filter?: Filter<Planpagospendientes>,
  ): Promise<Planpagospendientes[]> {
    return this.planpagospendientesRepository.find(filter);
  }

  @get('/planpagospendientes/{id}', {
    responses: {
      '200': {
        description: 'Planpagospendientes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Planpagospendientes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Planpagospendientes, {exclude: 'where'}) filter?: FilterExcludingWhere<Planpagospendientes>
  ): Promise<Planpagospendientes> {
    return this.planpagospendientesRepository.findById(id, filter);
  }

}
