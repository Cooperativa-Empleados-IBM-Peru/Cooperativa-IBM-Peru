import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Pracademico} from '../models';
import {PracademicoRepository} from '../repositories';

export class PracademicoController {
  constructor(
    @repository(PracademicoRepository)
    public pracademicoRepository: PracademicoRepository,
  ) { }

  /*
    @get('/pracademico/count', {
      responses: {
        '200': {
          description: 'Pracademico model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Pracademico) where?: Where<Pracademico>,
    ): Promise<Count> {
      return this.pracademicoRepository.count(where);
    }
  */
  @get('/pracademico', {
    responses: {
      '200': {
        description: 'Array of Pracademico model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Pracademico, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Pracademico) filter?: Filter<Pracademico>,
  ): Promise<Pracademico[]> {
    return this.pracademicoRepository.find(filter);
  }


  @get('/pracademico/{id}', {
    responses: {
      '200': {
        description: 'Pracademico model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pracademico, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Pracademico, {exclude: 'where'}) filter?: FilterExcludingWhere<Pracademico>
  ): Promise<Pracademico> {
    return this.pracademicoRepository.findById(id, filter);
  }

}
