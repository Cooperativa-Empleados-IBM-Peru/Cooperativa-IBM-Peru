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
  getModelSchemaRef, param,
  patch, post,
  put, requestBody
} from '@loopback/rest';
import {Coopesocios} from '../models';
import {CoopesociosRepository} from '../repositories';

export class CoopesociosController {
  constructor(
    @repository(CoopesociosRepository)
    public coopesociosRepository: CoopesociosRepository,
  ) {}

  @post('/coopesocios', {
    responses: {
      '200': {
        description: 'Coopesocios model instance',
        content: {'application/json': {schema: getModelSchemaRef(Coopesocios)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Coopesocios, {
            title: 'NewCoopesocios',

          }),
        },
      },
    })
    coopesocios: Coopesocios,
  ): Promise<Coopesocios> {
    return this.coopesociosRepository.create(coopesocios);
  }

  @get('/coopesocios/count', {
    responses: {
      '200': {
        description: 'Coopesocios model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Coopesocios) where?: Where<Coopesocios>,
  ): Promise<Count> {
    return this.coopesociosRepository.count(where);
  }

  @get('/coopesocios', {
    responses: {
      '200': {
        description: 'Array of Coopesocios model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Coopesocios, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Coopesocios) filter?: Filter<Coopesocios>,
  ): Promise<Coopesocios[]> {
    return this.coopesociosRepository.find(filter);
  }

  @patch('/coopesocios', {
    responses: {
      '200': {
        description: 'Coopesocios PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Coopesocios, {partial: true}),
        },
      },
    })
    coopesocios: Coopesocios,
    @param.where(Coopesocios) where?: Where<Coopesocios>,
  ): Promise<Count> {
    return this.coopesociosRepository.updateAll(coopesocios, where);
  }

  @get('/coopesocios/{id}', {
    responses: {
      '200': {
        description: 'Coopesocios model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Coopesocios, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Coopesocios, {exclude: 'where'}) filter?: FilterExcludingWhere<Coopesocios>
  ): Promise<Coopesocios> {
    return this.coopesociosRepository.findById(id, filter);
  }

  @patch('/coopesocios/{id}', {
    responses: {
      '204': {
        description: 'Coopesocios PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Coopesocios, {partial: true}),
        },
      },
    })
    coopesocios: Coopesocios,
  ): Promise<void> {
    await this.coopesociosRepository.updateById(id, coopesocios);
  }

  @put('/coopesocios/{id}', {
    responses: {
      '204': {
        description: 'Coopesocios PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() coopesocios: Coopesocios,
  ): Promise<void> {
    await this.coopesociosRepository.replaceById(id, coopesocios);
  }

  @del('/coopesocios/{id}', {
    responses: {
      '204': {
        description: 'Coopesocios DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.coopesociosRepository.deleteById(id);
  }

}
