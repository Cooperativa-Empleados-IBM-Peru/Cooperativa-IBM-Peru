import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Movmiscelaneos} from '../models';
import {MovmiscelaneosRepository} from '../repositories';

export class MovmiscelaneosController {
  constructor(
    @repository(MovmiscelaneosRepository)
    public movmiscelaneosRepository: MovmiscelaneosRepository,
  ) { }

  /*
    @get('/movmiscelaneos/count', {
      responses: {
        '200': {
          description: 'Movmiscelaneos model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Movmiscelaneos) where?: Where<Movmiscelaneos>,
    ): Promise<Count> {
      return this.movmiscelaneosRepository.count(where);
    }
  */
  @get('/movmiscelaneos', {
    responses: {
      '200': {
        description: 'Array of Movmiscelaneos model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Movmiscelaneos, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Movmiscelaneos) filter?: Filter<Movmiscelaneos>,
  ): Promise<Movmiscelaneos[]> {
    return this.movmiscelaneosRepository.find(filter);
  }


  @get('/movmiscelaneos/{id}', {
    responses: {
      '200': {
        description: 'Movmiscelaneos model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Movmiscelaneos, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Movmiscelaneos, {exclude: 'where'}) filter?: FilterExcludingWhere<Movmiscelaneos>
  ): Promise<Movmiscelaneos> {
    return this.movmiscelaneosRepository.findById(id, filter);
  }


}
