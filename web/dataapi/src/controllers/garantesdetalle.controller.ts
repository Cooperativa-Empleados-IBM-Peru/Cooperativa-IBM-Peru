import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Garantesdetalle} from '../models';
import {GarantesdetalleRepository} from '../repositories';

export class GarantesdetalleController {
  constructor(
    @repository(GarantesdetalleRepository)
    public garantesdetalleRepository: GarantesdetalleRepository,
  ) { }
  /*
    @get('/garantesdetalle/count', {
      responses: {
        '200': {
          description: 'Garantesdetalle model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Garantesdetalle) where?: Where<Garantesdetalle>,
    ): Promise<Count> {
      return this.garantesdetalleRepository.count(where);
    }
  */
  @get('/garantesdetalle', {
    responses: {
      '200': {
        description: 'Array of Garantesdetalle model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Garantesdetalle, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Garantesdetalle) filter?: Filter<Garantesdetalle>,
  ): Promise<Garantesdetalle[]> {
    return this.garantesdetalleRepository.find(filter);
  }

  @get('/garantesdetalle/{id}', {
    responses: {
      '200': {
        description: 'Garantesdetalle model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Garantesdetalle, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Garantesdetalle, {exclude: 'where'}) filter?: FilterExcludingWhere<Garantesdetalle>
  ): Promise<Garantesdetalle> {
    return this.garantesdetalleRepository.findById(id, filter);
  }

}
