import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Db2CoopeDataSource} from '../datasources';
import {Cuentassaldos, CuentassaldosRelations} from '../models';

export class CuentassaldosRepository extends DefaultCrudRepository<
  Cuentassaldos,
  typeof Cuentassaldos.prototype.uuid,
  CuentassaldosRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Cuentassaldos, dataSource);
  }
}
