import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Vwsociosexempleados} from '../models';
import {VwsociosexempleadosRepository} from '../repositories';

export class VwsociosexempleadosController {
  constructor(
    @repository(VwsociosexempleadosRepository)
    public vwsociosexempleadosRepository : VwsociosexempleadosRepository,
  ) {}

  @post('/vwsociosexempleados')
  @response(200, {
    description: 'Vwsociosexempleados model instance',
    content: {'application/json': {schema: getModelSchemaRef(Vwsociosexempleados)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vwsociosexempleados, {
            title: 'NewVwsociosexempleados',
            exclude: ['uuid'],
          }),
        },
      },
    })
    vwsociosexempleados: Omit<Vwsociosexempleados, 'uuid'>,
  ): Promise<Vwsociosexempleados> {
    return this.vwsociosexempleadosRepository.create(vwsociosexempleados);
  }

  @get('/vwsociosexempleados/count')
  @response(200, {
    description: 'Vwsociosexempleados model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Vwsociosexempleados) where?: Where<Vwsociosexempleados>,
  ): Promise<Count> {
    return this.vwsociosexempleadosRepository.count(where);
  }

  @get('/vwsociosexempleados')
  @response(200, {
    description: 'Array of Vwsociosexempleados model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Vwsociosexempleados, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Vwsociosexempleados) filter?: Filter<Vwsociosexempleados>,
  ): Promise<Vwsociosexempleados[]> {
    return this.vwsociosexempleadosRepository.find(filter);
  }

  @patch('/vwsociosexempleados')
  @response(200, {
    description: 'Vwsociosexempleados PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vwsociosexempleados, {partial: true}),
        },
      },
    })
    vwsociosexempleados: Vwsociosexempleados,
    @param.where(Vwsociosexempleados) where?: Where<Vwsociosexempleados>,
  ): Promise<Count> {
    return this.vwsociosexempleadosRepository.updateAll(vwsociosexempleados, where);
  }

  @get('/vwsociosexempleados/{id}')
  @response(200, {
    description: 'Vwsociosexempleados model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Vwsociosexempleados, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Vwsociosexempleados, {exclude: 'where'}) filter?: FilterExcludingWhere<Vwsociosexempleados>
  ): Promise<Vwsociosexempleados> {
    return this.vwsociosexempleadosRepository.findById(id, filter);
  }

  @patch('/vwsociosexempleados/{id}')
  @response(204, {
    description: 'Vwsociosexempleados PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vwsociosexempleados, {partial: true}),
        },
      },
    })
    vwsociosexempleados: Vwsociosexempleados,
  ): Promise<void> {
    await this.vwsociosexempleadosRepository.updateById(id, vwsociosexempleados);
  }

  @put('/vwsociosexempleados/{id}')
  @response(204, {
    description: 'Vwsociosexempleados PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vwsociosexempleados: Vwsociosexempleados,
  ): Promise<void> {
    await this.vwsociosexempleadosRepository.replaceById(id, vwsociosexempleados);
  }

  @del('/vwsociosexempleados/{id}')
  @response(204, {
    description: 'Vwsociosexempleados DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vwsociosexempleadosRepository.deleteById(id);
  }
}
