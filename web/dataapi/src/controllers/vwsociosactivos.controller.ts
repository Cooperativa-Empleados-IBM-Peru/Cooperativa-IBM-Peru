import {
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Vwsociosactivos} from '../models';
import {VwsociosactivosRepository} from '../repositories';

export class VwsociosactivosController {
  constructor(
    @repository(VwsociosactivosRepository)
    public vwsociosactivosRepository: VwsociosactivosRepository,
  ) { }

  /*
    @get('/vwsociosactivos/count', {
      responses: {
        '200': {
          description: 'Vwsociosactivos model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Vwsociosactivos) where?: Where<Vwsociosactivos>,
    ): Promise<Count> {
      return this.vwsociosactivosRepository.count(where);
    }
  */
  /*
    @get('/vwsociosactivos', {
      responses: {
        '200': {
          description: 'Array of Vwsociosactivos model instances',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: getModelSchemaRef(Vwsociosactivos, {includeRelations: true}),
              },
            },
          },
        },
      },
    })
    async find(
      @param.filter(Vwsociosactivos) filter?: Filter<Vwsociosactivos>,
    ): Promise<Vwsociosactivos[]> {
      return this.vwsociosactivosRepository.find(filter);
    }
  */

  @get('/vwsociosactivos/{id}', {
    responses: {
      '200': {
        description: 'Vwsociosactivos model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Vwsociosactivos, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Vwsociosactivos, {exclude: 'where'}) filter?: FilterExcludingWhere<Vwsociosactivos>
  ): Promise<Vwsociosactivos> {
    return this.vwsociosactivosRepository.findById(id, filter);
  }


}
