import {
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Planpagostotalpendientes} from '../models';
import {PlanpagostotalpendientesRepository} from '../repositories';

export class PlanpagostotalpendientesController {
  constructor(
    @repository(PlanpagostotalpendientesRepository)
    public planpagostotalpendientesRepository: PlanpagostotalpendientesRepository,
  ) { }
  /*
    @get('/planpagostotalpendientes/count', {
      responses: {
        '200': {
          description: 'Planpagostotalpendientes model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Planpagostotalpendientes) where?: Where<Planpagostotalpendientes>,
    ): Promise<Count> {
      return this.planpagostotalpendientesRepository.count(where);
    }
  
    @get('/planpagostotalpendientes', {
      responses: {
        '200': {
          description: 'Array of Planpagostotalpendientes model instances',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: getModelSchemaRef(Planpagostotalpendientes, {includeRelations: true}),
              },
            },
          },
        },
      },
    })
    async find(
      @param.filter(Planpagostotalpendientes) filter?: Filter<Planpagostotalpendientes>,
    ): Promise<Planpagostotalpendientes[]> {
      return this.planpagostotalpendientesRepository.find(filter);
    }
  */
  @get('/planpagostotalpendientes/{id}', {
    responses: {
      '200': {
        description: 'Planpagostotalpendientes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Planpagostotalpendientes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Planpagostotalpendientes, {exclude: 'where'}) filter?: FilterExcludingWhere<Planpagostotalpendientes>
  ): Promise<Planpagostotalpendientes> {
    return this.planpagostotalpendientesRepository.findById(id, filter);
  }

}
