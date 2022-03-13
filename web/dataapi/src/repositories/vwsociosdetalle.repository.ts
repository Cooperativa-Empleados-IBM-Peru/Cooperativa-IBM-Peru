import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Db2CoopeDataSource} from '../datasources';
import {Vwsociosdetalle, VwsociosdetalleRelations} from '../models';

export class VwsociosdetalleRepository extends DefaultCrudRepository<
  Vwsociosdetalle,
  typeof Vwsociosdetalle.prototype.codempleado,
  VwsociosdetalleRelations
  > {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Vwsociosdetalle, dataSource);
  }
}
