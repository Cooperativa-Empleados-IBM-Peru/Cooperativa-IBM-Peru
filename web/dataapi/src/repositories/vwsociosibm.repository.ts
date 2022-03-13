import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Db2CoopeDataSource} from '../datasources';
import {Vwsociosibm, VwsociosibmRelations} from '../models';

export class VwsociosibmRepository extends DefaultCrudRepository<
  Vwsociosibm,
  typeof Vwsociosibm.prototype.uuid,
  VwsociosibmRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Vwsociosibm, dataSource);
  }
}
