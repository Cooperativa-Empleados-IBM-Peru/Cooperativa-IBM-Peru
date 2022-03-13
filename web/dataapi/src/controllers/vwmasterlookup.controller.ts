import {
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param, response
} from '@loopback/rest';
import {Vwmasterlookup} from '../models';
import {VwmasterlookupRepository} from '../repositories';

export class VwmasterlookupController {
  constructor(
    @repository(VwmasterlookupRepository)
    public vwmasterlookupRepository: VwmasterlookupRepository,
  ) { }
  /*
    @post('/vwmasterlookups')
    @response(200, {
      description: 'Vwmasterlookup model instance',
      content: {'application/json': {schema: getModelSchemaRef(Vwmasterlookup)}},
    })
    async create(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Vwmasterlookup, {
              title: 'NewVwmasterlookup',
              exclude: ['uuid'],
            }),
          },
        },
      })
      vwmasterlookup: Omit<Vwmasterlookup, 'uuid'>,
    ): Promise<Vwmasterlookup> {
      return this.vwmasterlookupRepository.create(vwmasterlookup);
    }

    @get('/vwmasterlookups/count')
    @response(200, {
      description: 'Vwmasterlookup model count',
      content: {'application/json': {schema: CountSchema}},
    })
    async count(
      @param.where(Vwmasterlookup) where?: Where<Vwmasterlookup>,
    ): Promise<Count> {
      return this.vwmasterlookupRepository.count(where);
    }

    @get('/vwmasterlookups')
    @response(200, {
      description: 'Array of Vwmasterlookup model instances',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(Vwmasterlookup, {includeRelations: true}),
          },
        },
      },
    })
    async find(
      @param.filter(Vwmasterlookup) filter?: Filter<Vwmasterlookup>,
    ): Promise<Vwmasterlookup[]> {
      return this.vwmasterlookupRepository.find(filter);
    }

    @patch('/vwmasterlookups')
    @response(200, {
      description: 'Vwmasterlookup PATCH success count',
      content: {'application/json': {schema: CountSchema}},
    })
    async updateAll(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Vwmasterlookup, {partial: true}),
          },
        },
      })
      vwmasterlookup: Vwmasterlookup,
      @param.where(Vwmasterlookup) where?: Where<Vwmasterlookup>,
    ): Promise<Count> {
      return this.vwmasterlookupRepository.updateAll(vwmasterlookup, where);
    }
  */
  @get('/vwmasterlookups/{id}')
  @response(200, {
    description: 'Vwmasterlookup model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Vwmasterlookup, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Vwmasterlookup, {exclude: 'where'}) filter?: FilterExcludingWhere<Vwmasterlookup>
  ): Promise<Vwmasterlookup> {
    return this.vwmasterlookupRepository.findById(id, filter);
  }
  /*
    @patch('/vwmasterlookups/{id}')
    @response(204, {
      description: 'Vwmasterlookup PATCH success',
    })
    async updateById(
      @param.path.string('id') id: string,
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Vwmasterlookup, {partial: true}),
          },
        },
      })
      vwmasterlookup: Vwmasterlookup,
    ): Promise<void> {
      await this.vwmasterlookupRepository.updateById(id, vwmasterlookup);
    }

    @put('/vwmasterlookups/{id}')
    @response(204, {
      description: 'Vwmasterlookup PUT success',
    })
    async replaceById(
      @param.path.string('id') id: string,
      @requestBody() vwmasterlookup: Vwmasterlookup,
    ): Promise<void> {
      await this.vwmasterlookupRepository.replaceById(id, vwmasterlookup);
    }

    @del('/vwmasterlookups/{id}')
    @response(204, {
      description: 'Vwmasterlookup DELETE success',
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
      await this.vwmasterlookupRepository.deleteById(id);
    }
   */
}
