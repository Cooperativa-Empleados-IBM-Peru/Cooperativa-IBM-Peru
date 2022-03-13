import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Prconsumo} from '../models';
import {PrconsumoRepository} from '../repositories';

export class PrconsumoController {
  constructor(
    @repository(PrconsumoRepository)
    public prconsumoRepository: PrconsumoRepository,
  ) { }

  /*
    @get('/prconsumo/count', {
      responses: {
        '200': {
          description: 'Prconsumo model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Prconsumo) where?: Where<Prconsumo>,
    ): Promise<Count> {
      return this.prconsumoRepository.count(where);
    }
  */
  @get('/prconsumo', {
    responses: {
      '200': {
        description: 'Array of Prconsumo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Prconsumo, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Prconsumo) filter?: Filter<Prconsumo>,
  ): Promise<Prconsumo[]> {
    return this.prconsumoRepository.find(filter);
  }


  @get('/prconsumo/{id}', {
    responses: {
      '200': {
        description: 'Prconsumo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Prconsumo, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Prconsumo, {exclude: 'where'}) filter?: FilterExcludingWhere<Prconsumo>
  ): Promise<Prconsumo> {
    return this.prconsumoRepository.findById(id, filter);
  }


}
