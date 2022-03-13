import {FilterExcludingWhere, repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param, response
} from '@loopback/rest';
import {Vwmasterplanpagos} from '../models';
import {VwmasterplanpagosRepository} from '../repositories';

export class VwmasterplanpagosController {
  constructor(
    @repository(VwmasterplanpagosRepository)
    public vwmasterplanpagosRepository: VwmasterplanpagosRepository,
  ) { }
  /*
    @post('/vwmasterplanpagos')
    @response(200, {
      description: 'Vwmasterplanpagos model instance',
      content: {'application/json': {schema: getModelSchemaRef(Vwmasterplanpagos)}},
    })
    async create(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Vwmasterplanpagos, {
              title: 'NewVwmasterplanpagos',
              exclude: ['id'],
            }),
          },
        },
      })
      vwmasterplanpagos: Omit<Vwmasterplanpagos, 'id'>,
    ): Promise<Vwmasterplanpagos> {
      return this.vwmasterplanpagosRepository.create(vwmasterplanpagos);
    }

    @get('/vwmasterplanpagos/count')
    @response(200, {
      description: 'Vwmasterplanpagos model count',
      content: {'application/json': {schema: CountSchema}},
    })
    async count(
      @param.where(Vwmasterplanpagos) where?: Where<Vwmasterplanpagos>,
    ): Promise<Count> {
      return this.vwmasterplanpagosRepository.count(where);
    }

  @get('/vwmasterplanpagos')
  @response(200, {
    description: 'Array of Vwmasterplanpagos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Vwmasterplanpagos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Vwmasterplanpagos) filter?: Filter<Vwmasterplanpagos>,
  ): Promise<Vwmasterplanpagos[]> {
    return this.vwmasterplanpagosRepository.find(filter);
  }

    @patch('/vwmasterplanpagos')
    @response(200, {
      description: 'Vwmasterplanpagos PATCH success count',
      content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Vwmasterplanpagos, {partial: true}),
          },
        },
      })
      vwmasterplanpagos: Vwmasterplanpagos,
      @param.where(Vwmasterplanpagos) where?: Where<Vwmasterplanpagos>,
    ): Promise<Count> {
      return this.vwmasterplanpagosRepository.updateAll(vwmasterplanpagos, where);
    }
  */
  @get('/vwmasterplanpagos/{id}')
  @response(200, {
    description: 'Vwmasterplanpagos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Vwmasterplanpagos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Vwmasterplanpagos, {exclude: 'where'}) filter?: FilterExcludingWhere<Vwmasterplanpagos>
  ): Promise<Vwmasterplanpagos> {
    return this.vwmasterplanpagosRepository.findById(id, filter);
  }
  /*
    @patch('/vwmasterplanpagos/{id}')
    @response(204, {
      description: 'Vwmasterplanpagos PATCH success',
    })
    async updateById(
      @param.path.string('id') id: string,
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Vwmasterplanpagos, {partial: true}),
          },
        },
      })
      vwmasterplanpagos: Vwmasterplanpagos,
    ): Promise<void> {
      await this.vwmasterplanpagosRepository.updateById(id, vwmasterplanpagos);
    }

    @put('/vwmasterplanpagos/{id}')
    @response(204, {
      description: 'Vwmasterplanpagos PUT success',
    })
    async replaceById(
      @param.path.string('id') id: string,
      @requestBody() vwmasterplanpagos: Vwmasterplanpagos,
    ): Promise<void> {
      await this.vwmasterplanpagosRepository.replaceById(id, vwmasterplanpagos);
    }

    @del('/vwmasterplanpagos/{id}')
    @response(204, {
      description: 'Vwmasterplanpagos DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
      await this.vwmasterplanpagosRepository.deleteById(id);
    }
    */
}
