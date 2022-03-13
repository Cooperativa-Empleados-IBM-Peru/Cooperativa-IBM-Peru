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
import {Vwsociosibm} from '../models';
import {VwsociosibmRepository} from '../repositories';

export class VwsociosibmController {
  constructor(
    @repository(VwsociosibmRepository)
    public vwsociosibmRepository: VwsociosibmRepository,
  ) { }

  @post('/vwsociosibm')
  @response(200, {
    description: 'Vwsociosibm model instance',
    content: {'application/json': {schema: getModelSchemaRef(Vwsociosibm)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vwsociosibm, {
            title: 'NewVwsociosibm',
            exclude: ['uuid'],
          }),
        },
      },
    })
    vwsociosibm: Omit<Vwsociosibm, 'uuid'>,
  ): Promise<Vwsociosibm> {
    return this.vwsociosibmRepository.create(vwsociosibm);
  }

  @get('/vwsociosibm/count')
  @response(200, {
    description: 'Vwsociosibm model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Vwsociosibm) where?: Where<Vwsociosibm>,
  ): Promise<Count> {
    return this.vwsociosibmRepository.count(where);
  }

  @get('/vwsociosibm')
  @response(200, {
    description: 'Array of Vwsociosibm model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Vwsociosibm, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Vwsociosibm) filter?: Filter<Vwsociosibm>,
  ): Promise<Vwsociosibm[]> {
    return this.vwsociosibmRepository.find(filter);
  }

  @patch('/vwsociosibm')
  @response(200, {
    description: 'Vwsociosibm PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vwsociosibm, {partial: true}),
        },
      },
    })
    vwsociosibm: Vwsociosibm,
    @param.where(Vwsociosibm) where?: Where<Vwsociosibm>,
  ): Promise<Count> {
    return this.vwsociosibmRepository.updateAll(vwsociosibm, where);
  }

  @get('/vwsociosibm/{id}')
  @response(200, {
    description: 'Vwsociosibm model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Vwsociosibm, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Vwsociosibm, {exclude: 'where'}) filter?: FilterExcludingWhere<Vwsociosibm>
  ): Promise<Vwsociosibm> {
    return this.vwsociosibmRepository.findById(id, filter);
  }

  @patch('/vwsociosibm/{id}')
  @response(204, {
    description: 'Vwsociosibm PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vwsociosibm, {partial: true}),
        },
      },
    })
    vwsociosibm: Vwsociosibm,
  ): Promise<void> {
    await this.vwsociosibmRepository.updateById(id, vwsociosibm);
  }

  @put('/vwsociosibm/{id}')
  @response(204, {
    description: 'Vwsociosibm PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vwsociosibm: Vwsociosibm,
  ): Promise<void> {
    await this.vwsociosibmRepository.replaceById(id, vwsociosibm);
  }

  @del('/vwsociosibm/{id}')
  @response(204, {
    description: 'Vwsociosibm DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vwsociosibmRepository.deleteById(id);
  }
}
