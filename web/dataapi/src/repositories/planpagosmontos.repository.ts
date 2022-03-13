import {DefaultCrudRepository} from '@loopback/repository';
import {Planpagosmontos, PlanpagosmontosRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PlanpagosmontosRepository extends DefaultCrudRepository<
  Planpagosmontos,
  typeof Planpagosmontos.prototype.cuota,
  PlanpagosmontosRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Planpagosmontos, dataSource);
  }
}
