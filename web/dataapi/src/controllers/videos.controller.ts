import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Videos} from '../models';
import {VideosRepository} from '../repositories';

export class VideosController {
  constructor(
    @repository(VideosRepository)
    public videosRepository: VideosRepository,
  ) { }

  /*
    @get('/videos/count', {
      responses: {
        '200': {
          description: 'Videos model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Videos) where?: Where<Videos>,
    ): Promise<Count> {
      return this.videosRepository.count(where);
    }
  */
  @get('/videos', {
    responses: {
      '200': {
        description: 'Array of Videos model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Videos, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Videos) filter?: Filter<Videos>,
  ): Promise<Videos[]> {
    return this.videosRepository.find(filter);
  }

  @get('/videos/{id}', {
    responses: {
      '200': {
        description: 'Videos model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Videos, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Videos, {exclude: 'where'}) filter?: FilterExcludingWhere<Videos>
  ): Promise<Videos> {
    return this.videosRepository.findById(id, filter);
  }

}
