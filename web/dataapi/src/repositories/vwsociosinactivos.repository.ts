import {DefaultCrudRepository} from '@loopback/repository';
import {Vwsociosinactivos, VwsociosinactivosRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class VwsociosinactivosRepository extends DefaultCrudRepository<
  Vwsociosinactivos,
  typeof Vwsociosinactivos.prototype.codempleado,
  VwsociosinactivosRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Vwsociosinactivos, dataSource);
  }
}
