import {DefaultCrudRepository} from '@loopback/repository';
import {Vwprestamosusd, VwprestamosusdRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class VwprestamosusdRepository extends DefaultCrudRepository<
  Vwprestamosusd,
  typeof Vwprestamosusd.prototype.id,
  VwprestamosusdRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Vwprestamosusd, dataSource);
  }
}
