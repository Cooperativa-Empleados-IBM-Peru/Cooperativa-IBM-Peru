import {
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Planpagostotalcancelados} from '../models';
import {PlanpagostotalcanceladosRepository} from '../repositories';

export class PlanpagostotalcandeladosController {
  constructor(
    @repository(PlanpagostotalcanceladosRepository)
    public planpagostotalcanceladosRepository: PlanpagostotalcanceladosRepository,
  ) { }
  /*
    @get('/planpagostotalcancelados/count', {
      responses: {
        '200': {
          description: 'Planpagostotalcancelados model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Planpagostotalcancelados) where?: Where<Planpagostotalcancelados>,
    ): Promise<Count> {
      return this.planpagostotalcanceladosRepository.count(where);
    }

    @get('/planpagostotalcancelados', {
      responses: {
        '200': {
          description: 'Array of Planpagostotalcancelados model instances',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: getModelSchemaRef(Planpagostotalcancelados, {includeRelations: true}),
              },
            },
          },
        },
      },
    })
    async find(
      @param.filter(Planpagostotalcancelados) filter?: Filter<Planpagostotalcancelados>,
    ): Promise<Planpagostotalcancelados[]> {
      return this.planpagostotalcanceladosRepository.find(filter);
    }
  */

  @get('/planpagostotalcancelados/{id}', {
    responses: {
      '200': {
        description: 'Planpagostotalcancelados model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Planpagostotalcancelados, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Planpagostotalcancelados, {exclude: 'where'}) filter?: FilterExcludingWhere<Planpagostotalcancelados>
  ): Promise<Planpagostotalcancelados> {
    return this.planpagostotalcanceladosRepository.findById(id, filter);
  }

}
