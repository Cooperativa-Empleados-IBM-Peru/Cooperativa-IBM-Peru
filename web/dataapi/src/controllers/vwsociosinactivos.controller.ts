import {
  Filter,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Vwsociosinactivos} from '../models';
import {VwsociosinactivosRepository} from '../repositories';

export class VwsociosinactivosController {
  constructor(
    @repository(VwsociosinactivosRepository)
    public vwsociosinactivosRepository: VwsociosinactivosRepository,
  ) { }

  /*
  @get('/vwsociosinactivos/count', {
    responses: {
      '200': {
        description: 'Vwsociosinactivos model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Vwsociosinactivos) where?: Where<Vwsociosinactivos>,
  ): Promise<Count> {
    return this.vwsociosinactivosRepository.count(where);
  }
*/

  @get('/vwsociosinactivos', {
    responses: {
      '200': {
        description: 'Array of Vwsociosinactivos model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Vwsociosinactivos, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Vwsociosinactivos) filter?: Filter<Vwsociosinactivos>,
  ): Promise<Vwsociosinactivos[]> {
    return this.vwsociosinactivosRepository.find(filter);
  }
  /*
  @get('/vwsociosinactivos/{id}', {
    responses: {
      '200': {
        description: 'Vwsociosinactivos model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Vwsociosinactivos, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Vwsociosinactivos, {exclude: 'where'}) filter?: FilterExcludingWhere<Vwsociosinactivos>
  ): Promise<Vwsociosinactivos> {
    return this.vwsociosinactivosRepository.findById(id, filter);
  }
*/
}
