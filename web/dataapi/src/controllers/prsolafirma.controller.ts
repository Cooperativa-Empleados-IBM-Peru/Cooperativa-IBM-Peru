import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Prsolafirma} from '../models';
import {PrsolafirmaRepository} from '../repositories';

export class PrsolafirmaController {
  constructor(
    @repository(PrsolafirmaRepository)
    public prsolafirmaRepository: PrsolafirmaRepository,
  ) { }
  /*
    @get('/prsolafirma/count', {
      responses: {
        '200': {
          description: 'Prsolafirma model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Prsolafirma) where?: Where<Prsolafirma>,
    ): Promise<Count> {
      return this.prsolafirmaRepository.count(where);
    }
  */
  @get('/prsolafirma', {
    responses: {
      '200': {
        description: 'Array of Prsolafirma model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Prsolafirma, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Prsolafirma) filter?: Filter<Prsolafirma>,
  ): Promise<Prsolafirma[]> {
    return this.prsolafirmaRepository.find(filter);
  }


  @get('/prsolafirma/{id}', {
    responses: {
      '200': {
        description: 'Prsolafirma model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Prsolafirma, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Prsolafirma, {exclude: 'where'}) filter?: FilterExcludingWhere<Prsolafirma>
  ): Promise<Prsolafirma> {
    return this.prsolafirmaRepository.findById(id, filter);
  }

}
