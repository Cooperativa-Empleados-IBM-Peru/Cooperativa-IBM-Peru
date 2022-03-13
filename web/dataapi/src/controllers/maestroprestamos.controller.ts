import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Maestroprestamos} from '../models';
import {MaestroprestamosRepository} from '../repositories';

export class MaestroprestamosController {
  constructor(
    @repository(MaestroprestamosRepository)
    public maestroprestamosRepository: MaestroprestamosRepository,
  ) { }

  /*
    @get('/maestroprestamos/count', {
      responses: {
        '200': {
          description: 'Maestroprestamos model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Maestroprestamos) where?: Where<Maestroprestamos>,
    ): Promise<Count> {
      return this.maestroprestamosRepository.count(where);
    }
  */
  @get('/maestroprestamos', {
    responses: {
      '200': {
        description: 'Array of Maestroprestamos model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Maestroprestamos, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Maestroprestamos) filter?: Filter<Maestroprestamos>,
  ): Promise<Maestroprestamos[]> {
    return this.maestroprestamosRepository.find(filter);
  }


  @get('/maestroprestamos/{id}', {
    responses: {
      '200': {
        description: 'Maestroprestamos model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Maestroprestamos, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Maestroprestamos, {exclude: 'where'}) filter?: FilterExcludingWhere<Maestroprestamos>
  ): Promise<Maestroprestamos> {
    return this.maestroprestamosRepository.findById(id, filter);
  }

}
