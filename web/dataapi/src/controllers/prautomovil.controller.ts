import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Prautomovil} from '../models';
import {PrautomovilRepository} from '../repositories';

export class PrautomovilController {
  constructor(
    @repository(PrautomovilRepository)
    public prautomovilRepository: PrautomovilRepository,
  ) { }

  /*
    @get('/prautomovil/count', {
      responses: {
        '200': {
          description: 'Prautomovil model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Prautomovil) where?: Where<Prautomovil>,
    ): Promise<Count> {
      return this.prautomovilRepository.count(where);
    }
  */
  @get('/prautomovil', {
    responses: {
      '200': {
        description: 'Array of Prautomovil model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Prautomovil, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Prautomovil) filter?: Filter<Prautomovil>,
  ): Promise<Prautomovil[]> {
    return this.prautomovilRepository.find(filter);
  }

  @get('/prautomovil/{id}', {
    responses: {
      '200': {
        description: 'Prautomovil model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Prautomovil, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Prautomovil, {exclude: 'where'}) filter?: FilterExcludingWhere<Prautomovil>
  ): Promise<Prautomovil> {
    return this.prautomovilRepository.findById(id, filter);
  }


}
