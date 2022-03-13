import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Db2CoopeDataSource} from '../datasources';
import {Prps, PrpsRelations} from '../models';

export class PrpsRepository extends DefaultCrudRepository<
  Prps,
  typeof Prps.prototype.id,
  PrpsRelations
  > {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Prps, dataSource);
  }
}
