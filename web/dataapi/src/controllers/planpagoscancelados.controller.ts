import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Planpagoscancelados} from '../models';
import {PlanpagoscanceladosRepository} from '../repositories';

export class PlanpagoscanceladosController {
  constructor(
    @repository(PlanpagoscanceladosRepository)
    public planpagoscanceladosRepository: PlanpagoscanceladosRepository,
  ) { }

  /*
    @get('/planpagoscancelados/count', {
      responses: {
        '200': {
          description: 'Planpagoscancelados model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Planpagoscancelados) where?: Where<Planpagoscancelados>,
    ): Promise<Count> {
      return this.planpagoscanceladosRepository.count(where);
    }
  */
  @get('/planpagoscancelados', {
    responses: {
      '200': {
        description: 'Array of Planpagoscancelados model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Planpagoscancelados, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Planpagoscancelados) filter?: Filter<Planpagoscancelados>,
  ): Promise<Planpagoscancelados[]> {
    return this.planpagoscanceladosRepository.find(filter);
  }

  @get('/planpagoscancelados/{id}', {
    responses: {
      '200': {
        description: 'Planpagoscancelados model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Planpagoscancelados, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Planpagoscancelados, {exclude: 'where'}) filter?: FilterExcludingWhere<Planpagoscancelados>
  ): Promise<Planpagoscancelados> {
    return this.planpagoscanceladosRepository.findById(id, filter);
  }

}
