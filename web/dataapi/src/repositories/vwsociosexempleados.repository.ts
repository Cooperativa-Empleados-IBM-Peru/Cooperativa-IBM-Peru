import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Db2CoopeDataSource} from '../datasources';
import {Vwsociosexempleados, VwsociosexempleadosRelations} from '../models';

export class VwsociosexempleadosRepository extends DefaultCrudRepository<
  Vwsociosexempleados,
  typeof Vwsociosexempleados.prototype.uuid,
  VwsociosexempleadosRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Vwsociosexempleados, dataSource);
  }
}
