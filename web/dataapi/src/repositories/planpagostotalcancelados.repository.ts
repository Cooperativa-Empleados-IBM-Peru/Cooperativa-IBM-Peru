import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Db2CoopeDataSource} from '../datasources';
import {Planpagostotalcancelados, PlanpagostotalcanceladosRelations} from '../models';

export class PlanpagostotalcanceladosRepository extends DefaultCrudRepository<
  Planpagostotalcancelados,
  typeof Planpagostotalcancelados.prototype.id,
  PlanpagostotalcanceladosRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Planpagostotalcancelados, dataSource);
  }
}
