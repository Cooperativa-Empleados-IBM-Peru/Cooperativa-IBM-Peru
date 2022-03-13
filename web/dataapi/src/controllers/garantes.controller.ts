import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Garantes} from '../models';
import {GarantesRepository} from '../repositories';

export class GarantesController {
  constructor(
    @repository(GarantesRepository)
    public garantesRepository: GarantesRepository,
  ) { }
  /*
    @get('/garantes/count', {
      responses: {
        '200': {
          description: 'Garantes model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Garantes) where?: Where<Garantes>,
    ): Promise<Count> {
      return this.garantesRepository.count(where);
    }
  */
  @get('/garantes', {
    responses: {
      '200': {
        description: 'Array of Garantes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Garantes, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Garantes) filter?: Filter<Garantes>,
  ): Promise<Garantes[]> {
    return this.garantesRepository.find(filter);
  }

  @get('/garantes/{id}', {
    responses: {
      '200': {
        description: 'Garantes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Garantes, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Garantes, {exclude: 'where'}) filter?: FilterExcludingWhere<Garantes>
  ): Promise<Garantes> {
    return this.garantesRepository.findById(id, filter);
  }

}
