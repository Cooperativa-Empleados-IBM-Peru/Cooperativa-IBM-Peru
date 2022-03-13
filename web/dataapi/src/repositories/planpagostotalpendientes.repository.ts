import {DefaultCrudRepository} from '@loopback/repository';
import {Planpagostotalpendientes, PlanpagostotalpendientesRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PlanpagostotalpendientesRepository extends DefaultCrudRepository<
  Planpagostotalpendientes,
  typeof Planpagostotalpendientes.prototype.id,
  PlanpagostotalpendientesRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Planpagostotalpendientes, dataSource);
  }
}
