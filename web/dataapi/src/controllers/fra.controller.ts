import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Fra} from '../models';
import {FraRepository} from '../repositories';

export class FraController {
  constructor(
    @repository(FraRepository)
    public fraRepository: FraRepository,
  ) { }
  /*
    @get('/fra/count', {
      responses: {
        '200': {
          description: 'Fra model count',
          content: {'application/json': {schema: CountSchema}},
        },
      },
    })
    async count(
      @param.where(Fra) where?: Where<Fra>,
    ): Promise<Count> {
      return this.fraRepository.count(where);
    }
  */
  @get('/fra', {
    responses: {
      '200': {
        description: 'Array of Fra model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Fra, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Fra) filter?: Filter<Fra>,
  ): Promise<Fra[]> {
    return this.fraRepository.find(filter);
  }

  @get('/fra/{id}', {
    responses: {
      '200': {
        description: 'Fra model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Fra, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Fra, {exclude: 'where'}) filter?: FilterExcludingWhere<Fra>
  ): Promise<Fra> {
    return this.fraRepository.findById(id, filter);
  }

}
