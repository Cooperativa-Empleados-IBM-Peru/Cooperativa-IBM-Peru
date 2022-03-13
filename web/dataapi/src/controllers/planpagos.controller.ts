import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Planpagos} from '../models';
import {PlanpagosRepository} from '../repositories';

export class PlanpagosController {
  constructor(
    @repository(PlanpagosRepository)
    public planpagosRepository: PlanpagosRepository,
  ) { }

  /*
    @get('/planpagos/count', {
      responses: {
        '200': {
          description: 'Planpagos model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Planpagos) where?: Where<Planpagos>,
    ): Promise<Count> {
      return this.planpagosRepository.count(where);
    }
  */
  @get('/planpagos', {
    responses: {
      '200': {
        description: 'Array of Planpagos model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Planpagos, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Planpagos) filter?: Filter<Planpagos>,
  ): Promise<Planpagos[]> {
    return this.planpagosRepository.find(filter);
  }


  @get('/planpagos/{id}', {
    responses: {
      '200': {
        description: 'Planpagos model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Planpagos, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Planpagos, {exclude: 'where'}) filter?: FilterExcludingWhere<Planpagos>
  ): Promise<Planpagos> {
    return this.planpagosRepository.findById(id, filter);
  }

}
