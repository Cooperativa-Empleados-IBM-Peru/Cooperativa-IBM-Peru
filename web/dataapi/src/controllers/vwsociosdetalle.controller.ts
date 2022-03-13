import {
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Vwsociosdetalle} from '../models';
import {VwsociosdetalleRepository} from '../repositories';

export class VwsociosdetalleController {
  constructor(
    @repository(VwsociosdetalleRepository)
    public vwsociosdetalleRepository: VwsociosdetalleRepository,
  ) { }

  /*
    @get('/vwsociosdetalles/count', {
      responses: {
        '200': {
          description: 'Vwsociosdetalle model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Vwsociosdetalle) where?: Where<Vwsociosdetalle>,
    ): Promise<Count> {
      return this.vwsociosdetalleRepository.count(where);
    }
  */
  /*
   @get('/vwsociosdetalles', {
     responses: {
       '200': {
         description: 'Array of Vwsociosdetalle model instances',
         content: {
           'application/json': {
             schema: {
               type: 'array',
               items: getModelSchemaRef(Vwsociosdetalle, {includeRelations: true}),
             },
           },
         },
       },
     },
   })
   async find(
     @param.filter(Vwsociosdetalle) filter?: Filter<Vwsociosdetalle>,
   ): Promise<Vwsociosdetalle[]> {
     return this.vwsociosdetalleRepository.find(filter);
   }
 */

  @get('/vwsociosdetalles/{id}', {
    responses: {
      '200': {
        description: 'Vwsociosdetalle model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Vwsociosdetalle, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Vwsociosdetalle, {exclude: 'where'}) filter?: FilterExcludingWhere<Vwsociosdetalle>
  ): Promise<Vwsociosdetalle> {
    return this.vwsociosdetalleRepository.findById(id, filter);
  }

}
