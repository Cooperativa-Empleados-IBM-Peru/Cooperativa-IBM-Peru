import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Siniestros} from '../models';
import {SiniestrosRepository} from '../repositories';

export class SiniestrosController {
  constructor(
    @repository(SiniestrosRepository)
    public siniestrosRepository: SiniestrosRepository,
  ) { }
  /*
    @get('/siniestros/count', {
      responses: {
        '200': {
          description: 'Siniestros model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Siniestros) where?: Where<Siniestros>,
    ): Promise<Count> {
      return this.siniestrosRepository.count(where);
    }
  */
  @get('/siniestros', {
    responses: {
      '200': {
        description: 'Array of Siniestros model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Siniestros, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Siniestros) filter?: Filter<Siniestros>,
  ): Promise<Siniestros[]> {
    return this.siniestrosRepository.find(filter);
  }

  @get('/siniestros/{id}', {
    responses: {
      '200': {
        description: 'Siniestros model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Siniestros, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Siniestros, {exclude: 'where'}) filter?: FilterExcludingWhere<Siniestros>
  ): Promise<Siniestros> {
    return this.siniestrosRepository.findById(id, filter);
  }

}
