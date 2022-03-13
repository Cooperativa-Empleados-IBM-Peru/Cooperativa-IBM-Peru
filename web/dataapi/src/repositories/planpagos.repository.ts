import {DefaultCrudRepository} from '@loopback/repository';
import {Planpagos, PlanpagosRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PlanpagosRepository extends DefaultCrudRepository<
  Planpagos,
  typeof Planpagos.prototype.cuota,
  PlanpagosRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Planpagos, dataSource);
  }
}
