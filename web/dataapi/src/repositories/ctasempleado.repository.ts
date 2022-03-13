import {DefaultCrudRepository} from '@loopback/repository';
import {Ctasempleado, CtasempleadoRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CtasempleadoRepository extends DefaultCrudRepository<
  Ctasempleado,
  typeof Ctasempleado.prototype.codempleado,
  CtasempleadoRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Ctasempleado, dataSource);
  }
}
