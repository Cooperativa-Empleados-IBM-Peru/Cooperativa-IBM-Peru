import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Db2CoopeDataSource} from '../datasources';
import {Cuentasdetalles, CuentasdetallesRelations} from '../models';

export class CuentasdetallesRepository extends DefaultCrudRepository<
  Cuentasdetalles,
  typeof Cuentasdetalles.prototype.uuid,
  CuentasdetallesRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Cuentasdetalles, dataSource);
  }
}
