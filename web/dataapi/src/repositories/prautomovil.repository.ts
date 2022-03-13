import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Db2CoopeDataSource} from '../datasources';
import {Prautomovil, PrautomovilRelations} from '../models';

export class PrautomovilRepository extends DefaultCrudRepository<
  Prautomovil,
  typeof Prautomovil.prototype.id,
  PrautomovilRelations
  > {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Prautomovil, dataSource);
  }
}
