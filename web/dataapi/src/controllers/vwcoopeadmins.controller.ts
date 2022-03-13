import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Vwcoopeadmins} from '../models';
import {VwcoopeadminsRepository} from '../repositories';

export class VwcoopeadminsController {
  constructor(
    @repository(VwcoopeadminsRepository)
    public vwcoopeadminsRepository: VwcoopeadminsRepository,
  ) { }
  /*
    @get('/vwcoopeadmins/count', {
      responses: {
        '200': {
          description: 'Vwcoopeadmins model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Vwcoopeadmins) where?: Where<Vwcoopeadmins>,
    ): Promise<Count> {
      return this.vwcoopeadminsRepository.count(where);
    }
  */
  @get('/vwcoopeadmins', {
    responses: {
      '200': {
        description: 'Array of Vwcoopeadmins model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Vwcoopeadmins, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Vwcoopeadmins) filter?: Filter<Vwcoopeadmins>,
  ): Promise<Vwcoopeadmins[]> {
    return this.vwcoopeadminsRepository.find(filter);
  }

  @get('/vwcoopeadmins/{id}', {
    responses: {
      '200': {
        description: 'Vwcoopeadmins model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Vwcoopeadmins, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Vwcoopeadmins, {exclude: 'where'}) filter?: FilterExcludingWhere<Vwcoopeadmins>
  ): Promise<Vwcoopeadmins> {
    return this.vwcoopeadminsRepository.findById(id, filter);
  }

}
