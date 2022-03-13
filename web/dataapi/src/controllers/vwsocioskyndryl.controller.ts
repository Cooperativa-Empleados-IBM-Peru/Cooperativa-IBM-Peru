import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Vwsocioskyndryl} from '../models';
import {VwsocioskyndrylRepository} from '../repositories';

export class VwsocioskyndrylController {
  constructor(
    @repository(VwsocioskyndrylRepository)
    public vwsocioskyndrylRepository: VwsocioskyndrylRepository,
  ) { }

  @post('/vwsocioskyndryl')
  @response(200, {
    description: 'Vwsocioskyndryl model instance',
    content: {'application/json': {schema: getModelSchemaRef(Vwsocioskyndryl)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vwsocioskyndryl, {
            title: 'NewVwsocioskyndryl',
            exclude: ['uuid'],
          }),
        },
      },
    })
    vwsocioskyndryl: Omit<Vwsocioskyndryl, 'uuid'>,
  ): Promise<Vwsocioskyndryl> {
    return this.vwsocioskyndrylRepository.create(vwsocioskyndryl);
  }

  @get('/vwsocioskyndryl/count')
  @response(200, {
    description: 'Vwsocioskyndryl model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Vwsocioskyndryl) where?: Where<Vwsocioskyndryl>,
  ): Promise<Count> {
    return this.vwsocioskyndrylRepository.count(where);
  }

  @get('/vwsocioskyndryl')
  @response(200, {
    description: 'Array of Vwsocioskyndryl model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Vwsocioskyndryl, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Vwsocioskyndryl) filter?: Filter<Vwsocioskyndryl>,
  ): Promise<Vwsocioskyndryl[]> {
    return this.vwsocioskyndrylRepository.find(filter);
  }

  @patch('/vwsocioskyndryl')
  @response(200, {
    description: 'Vwsocioskyndryl PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vwsocioskyndryl, {partial: true}),
        },
      },
    })
    vwsocioskyndryl: Vwsocioskyndryl,
    @param.where(Vwsocioskyndryl) where?: Where<Vwsocioskyndryl>,
  ): Promise<Count> {
    return this.vwsocioskyndrylRepository.updateAll(vwsocioskyndryl, where);
  }

  @get('/vwsocioskyndryl/{id}')
  @response(200, {
    description: 'Vwsocioskyndryl model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Vwsocioskyndryl, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Vwsocioskyndryl, {exclude: 'where'}) filter?: FilterExcludingWhere<Vwsocioskyndryl>
  ): Promise<Vwsocioskyndryl> {
    return this.vwsocioskyndrylRepository.findById(id, filter);
  }

  @patch('/vwsocioskyndryl/{id}')
  @response(204, {
    description: 'Vwsocioskyndryl PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vwsocioskyndryl, {partial: true}),
        },
      },
    })
    vwsocioskyndryl: Vwsocioskyndryl,
  ): Promise<void> {
    await this.vwsocioskyndrylRepository.updateById(id, vwsocioskyndryl);
  }

  @put('/vwsocioskyndryl/{id}')
  @response(204, {
    description: 'Vwsocioskyndryl PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vwsocioskyndryl: Vwsocioskyndryl,
  ): Promise<void> {
    await this.vwsocioskyndrylRepository.replaceById(id, vwsocioskyndryl);
  }

  @del('/vwsocioskyndryl/{id}')
  @response(204, {
    description: 'Vwsocioskyndryl DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vwsocioskyndrylRepository.deleteById(id);
  }
}
