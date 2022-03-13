import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Movaportaciones} from '../models';
import {MovaportacionesRepository} from '../repositories';

export class MovaportacionesController {
  constructor(
    @repository(MovaportacionesRepository)
    public movaportacionesRepository: MovaportacionesRepository,
  ) { }
  /*
    @get('/movaportaciones/count', {
      responses: {
        '200': {
          description: 'Movaportaciones model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Movaportaciones) where?: Where<Movaportaciones>,
    ): Promise<Count> {
      return this.movaportacionesRepository.count(where);
    }
  */
  @get('/movaportaciones', {
    responses: {
      '200': {
        description: 'Array of Movaportaciones model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Movaportaciones, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Movaportaciones) filter?: Filter<Movaportaciones>,
  ): Promise<Movaportaciones[]> {
    return this.movaportacionesRepository.find(filter);
  }

  @get('/movaportaciones/{id}', {
    responses: {
      '200': {
        description: 'Movaportaciones model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Movaportaciones, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Movaportaciones, {exclude: 'where'}) filter?: FilterExcludingWhere<Movaportaciones>
  ): Promise<Movaportaciones> {
    return this.movaportacionesRepository.findById(id, filter);
  }

}
