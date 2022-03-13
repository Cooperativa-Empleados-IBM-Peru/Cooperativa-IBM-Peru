import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Maestroclientessaldos} from '../models';
import {MaestroclientessaldosRepository} from '../repositories';

export class MaestroclientessaldosController {
  constructor(
    @repository(MaestroclientessaldosRepository)
    public maestroclientessaldosRepository: MaestroclientessaldosRepository,
  ) { }

  /*
    @get('/maestroclientessaldos/count', {
      responses: {
        '200': {
          description: 'Maestroclientessaldos model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Maestroclientessaldos) where?: Where<Maestroclientessaldos>,
    ): Promise<Count> {
      return this.maestroclientessaldosRepository.count(where);
    }
  */
  @get('/maestroclientessaldos', {
    responses: {
      '200': {
        description: 'Array of Maestroclientessaldos model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Maestroclientessaldos, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Maestroclientessaldos) filter?: Filter<Maestroclientessaldos>,
  ): Promise<Maestroclientessaldos[]> {
    return this.maestroclientessaldosRepository.find(filter);
  }


  @get('/maestroclientessaldos/{id}', {
    responses: {
      '200': {
        description: 'Maestroclientessaldos model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Maestroclientessaldos, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Maestroclientessaldos, {exclude: 'where'}) filter?: FilterExcludingWhere<Maestroclientessaldos>
  ): Promise<Maestroclientessaldos> {
    return this.maestroclientessaldosRepository.findById(id, filter);
  }


}
