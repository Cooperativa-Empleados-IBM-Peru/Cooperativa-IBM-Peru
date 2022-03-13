import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Db2CoopeDataSource} from '../datasources';
import {Vwmasterlookup, VwmasterlookupRelations} from '../models';

export class VwmasterlookupRepository extends DefaultCrudRepository<
  Vwmasterlookup,
  typeof Vwmasterlookup.prototype.uuid,
  VwmasterlookupRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Vwmasterlookup, dataSource);
  }
}
