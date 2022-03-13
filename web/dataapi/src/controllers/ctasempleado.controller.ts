import {
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Ctasempleado} from '../models';
import {CtasempleadoRepository} from '../repositories';

export class CtasempleadoController {
  constructor(
    @repository(CtasempleadoRepository)
    public ctasempleadoRepository: CtasempleadoRepository,
  ) { }
  /*
    @get('/ctasempleados/count', {
      responses: {
        '200': {
          description: 'Ctasempleado model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Ctasempleado) where?: Where<Ctasempleado>,
    ): Promise<Count> {
      return this.ctasempleadoRepository.count(where);
    }
  
    @get('/ctasempleados', {
      responses: {
        '200': {
          description: 'Array of Ctasempleado model instances',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: getModelSchemaRef(Ctasempleado, {includeRelations: true}),
              },
            },
          },
        },
      },
    })
    async find(
      @param.filter(Ctasempleado) filter?: Filter<Ctasempleado>,
    ): Promise<Ctasempleado[]> {
      return this.ctasempleadoRepository.find(filter);
    }
  */

  @get('/ctasempleados/{id}', {
    responses: {
      '200': {
        description: 'Ctasempleado model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Ctasempleado, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Ctasempleado, {exclude: 'where'}) filter?: FilterExcludingWhere<Ctasempleado>
  ): Promise<Ctasempleado> {
    return this.ctasempleadoRepository.findById(id, filter);
  }

}
