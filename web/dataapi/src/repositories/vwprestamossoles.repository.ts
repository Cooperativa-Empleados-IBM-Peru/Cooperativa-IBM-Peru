import {DefaultCrudRepository} from '@loopback/repository';
import {Vwprestamossoles, VwprestamossolesRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class VwprestamossolesRepository extends DefaultCrudRepository<
  Vwprestamossoles,
  typeof Vwprestamossoles.prototype.id,
  VwprestamossolesRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Vwprestamossoles, dataSource);
  }
}
