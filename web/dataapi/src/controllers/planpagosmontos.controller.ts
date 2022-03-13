import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Planpagosmontos} from '../models';
import {PlanpagosmontosRepository} from '../repositories';

export class PlanpagosmontosController {
  constructor(
    @repository(PlanpagosmontosRepository)
    public planpagosmontosRepository: PlanpagosmontosRepository,
  ) { }

  /*
    @get('/planpagosmontos/count', {
      responses: {
        '200': {
          description: 'Planpagosmontos model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Planpagosmontos) where?: Where<Planpagosmontos>,
    ): Promise<Count> {
      return this.planpagosmontosRepository.count(where);
    }
  */
  @get('/planpagosmontos', {
    responses: {
      '200': {
        description: 'Array of Planpagosmontos model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Planpagosmontos, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Planpagosmontos) filter?: Filter<Planpagosmontos>,
  ): Promise<Planpagosmontos[]> {
    return this.planpagosmontosRepository.find(filter);
  }

  @get('/planpagosmontos/{id}', {
    responses: {
      '200': {
        description: 'Planpagosmontos model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Planpagosmontos, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Planpagosmontos, {exclude: 'where'}) filter?: FilterExcludingWhere<Planpagosmontos>
  ): Promise<Planpagosmontos> {
    return this.planpagosmontosRepository.findById(id, filter);
  }

}
