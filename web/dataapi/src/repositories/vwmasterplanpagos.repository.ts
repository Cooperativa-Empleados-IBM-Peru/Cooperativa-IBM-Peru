import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Db2CoopeDataSource} from '../datasources';
import {Vwmasterplanpagos, VwmasterplanpagosRelations} from '../models';

export class VwmasterplanpagosRepository extends DefaultCrudRepository<
  Vwmasterplanpagos,
  typeof Vwmasterplanpagos.prototype.uuid,
  VwmasterplanpagosRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Vwmasterplanpagos, dataSource);
  }
}
