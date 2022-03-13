import {DefaultCrudRepository} from '@loopback/repository';
import {Vwsociosactivos, VwsociosactivosRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class VwsociosactivosRepository extends DefaultCrudRepository<
  Vwsociosactivos,
  typeof Vwsociosactivos.prototype.codempleado,
  VwsociosactivosRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Vwsociosactivos, dataSource);
  }
}
