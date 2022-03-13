import {DefaultCrudRepository} from '@loopback/repository';
import {Planpagospendientes, PlanpagospendientesRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PlanpagospendientesRepository extends DefaultCrudRepository<
  Planpagospendientes,
  typeof Planpagospendientes.prototype.cuota,
  PlanpagospendientesRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Planpagospendientes, dataSource);
  }
}
