import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Db2CoopeDataSource} from '../datasources';
import {Vwsocioskyndryl, VwsocioskyndrylRelations} from '../models';

export class VwsocioskyndrylRepository extends DefaultCrudRepository<
  Vwsocioskyndryl,
  typeof Vwsocioskyndryl.prototype.uuid,
  VwsocioskyndrylRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Vwsocioskyndryl, dataSource);
  }
}
