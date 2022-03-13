import {DefaultCrudRepository} from '@loopback/repository';
import {Planpagostotales, PlanpagostotalesRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PlanpagostotalesRepository extends DefaultCrudRepository<
  Planpagostotales,
  typeof Planpagostotales.prototype.idmovimiento,
  PlanpagostotalesRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Planpagostotales, dataSource);
  }
}
