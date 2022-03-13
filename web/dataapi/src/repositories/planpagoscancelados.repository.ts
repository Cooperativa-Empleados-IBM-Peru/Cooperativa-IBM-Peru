import {DefaultCrudRepository} from '@loopback/repository';
import {Planpagoscancelados, PlanpagoscanceladosRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PlanpagoscanceladosRepository extends DefaultCrudRepository<
  Planpagoscancelados,
  typeof Planpagoscancelados.prototype.cuota,
  PlanpagoscanceladosRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Planpagoscancelados, dataSource);
  }
}
