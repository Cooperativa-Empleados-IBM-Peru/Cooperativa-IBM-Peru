import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Prhipotecario} from '../models';
import {PrhipotecarioRepository} from '../repositories';

export class PrhipotecarioController {
  constructor(
    @repository(PrhipotecarioRepository)
    public prhipotecarioRepository: PrhipotecarioRepository,
  ) { }
  /*
    @get('/prhipotecario/count', {
      responses: {
        '200': {
          description: 'Prhipotecario model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Prhipotecario) where?: Where<Prhipotecario>,
    ): Promise<Count> {
      return this.prhipotecarioRepository.count(where);
    }
  */
  @get('/prhipotecario', {
    responses: {
      '200': {
        description: 'Array of Prhipotecario model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Prhipotecario, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Prhipotecario) filter?: Filter<Prhipotecario>,
  ): Promise<Prhipotecario[]> {
    return this.prhipotecarioRepository.find(filter);
  }


  @get('/prhipotecario/{id}', {
    responses: {
      '200': {
        description: 'Prhipotecario model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Prhipotecario, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Prhipotecario, {exclude: 'where'}) filter?: FilterExcludingWhere<Prhipotecario>
  ): Promise<Prhipotecario> {
    return this.prhipotecarioRepository.findById(id, filter);
  }

}
