import {DefaultCrudRepository} from '@loopback/repository';
import {Garantes, GarantesRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class GarantesRepository extends DefaultCrudRepository<
  Garantes,
  typeof Garantes.prototype.codempleado,
  GarantesRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Garantes, dataSource);
  }
}
