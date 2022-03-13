import {
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param, response
} from '@loopback/rest';
import {Cuentassaldos} from '../models';
import {CuentassaldosRepository} from '../repositories';

export class CuentassaldosController {
  constructor(
    @repository(CuentassaldosRepository)
    public cuentassaldosRepository: CuentassaldosRepository,
  ) { }
  /*
    @post('/cuentassaldos')
    @response(200, {
      description: 'Cuentassaldos model instance',
      content: {'application/json': {schema: getModelSchemaRef(Cuentassaldos)}},
    })
    async create(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cuentassaldos, {
              title: 'NewCuentassaldos',
  
            }),
          },
        },
      })
      cuentassaldos: Cuentassaldos,
    ): Promise<Cuentassaldos> {
      return this.cuentassaldosRepository.create(cuentassaldos);
    }
  
    @get('/cuentassaldos/count')
    @response(200, {
      description: 'Cuentassaldos model count',
      content: {'application/json': {schema: CountSchema}},
    })
    async count(
      @param.where(Cuentassaldos) where?: Where<Cuentassaldos>,
    ): Promise<Count> {
      return this.cuentassaldosRepository.count(where);
    }
  
    @get('/cuentassaldos')
    @response(200, {
      description: 'Array of Cuentassaldos model instances',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(Cuentassaldos, {includeRelations: true}),
          },
        },
      },
    })
    async find(
      @param.filter(Cuentassaldos) filter?: Filter<Cuentassaldos>,
    ): Promise<Cuentassaldos[]> {
      return this.cuentassaldosRepository.find(filter);
    }
  
    @patch('/cuentassaldos')
    @response(200, {
      description: 'Cuentassaldos PATCH success count',
      content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cuentassaldos, {partial: true}),
          },
        },
      })
      cuentassaldos: Cuentassaldos,
      @param.where(Cuentassaldos) where?: Where<Cuentassaldos>,
    ): Promise<Count> {
      return this.cuentassaldosRepository.updateAll(cuentassaldos, where);
    }
  */
  @get('/cuentassaldos/{id}')
  @response(200, {
    description: 'Cuentassaldos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cuentassaldos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cuentassaldos, {exclude: 'where'}) filter?: FilterExcludingWhere<Cuentassaldos>
  ): Promise<Cuentassaldos> {
    return this.cuentassaldosRepository.findById(id, filter);
  }
  /*
    @patch('/cuentassaldos/{id}')
    @response(204, {
      description: 'Cuentassaldos PATCH success',
    })
    async updateById(
      @param.path.string('id') id: string,
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cuentassaldos, {partial: true}),
          },
        },
      })
      cuentassaldos: Cuentassaldos,
    ): Promise<void> {
      await this.cuentassaldosRepository.updateById(id, cuentassaldos);
    }
  
    @put('/cuentassaldos/{id}')
    @response(204, {
      description: 'Cuentassaldos PUT success',
    })
    async replaceById(
      @param.path.string('id') id: string,
      @requestBody() cuentassaldos: Cuentassaldos,
    ): Promise<void> {
      await this.cuentassaldosRepository.replaceById(id, cuentassaldos);
    }
  
    @del('/cuentassaldos/{id}')
    @response(204, {
      description: 'Cuentassaldos DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
      await this.cuentassaldosRepository.deleteById(id);
    }
    */
}
