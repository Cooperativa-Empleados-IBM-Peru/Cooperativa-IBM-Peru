import {DefaultCrudRepository} from '@loopback/repository';
import {Ctssolesmontostotales, CtssolesmontostotalesRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CtssolesmontostotalesRepository extends DefaultCrudRepository<
  Ctssolesmontostotales,
  typeof Ctssolesmontostotales.prototype.id,
  CtssolesmontostotalesRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Ctssolesmontostotales, dataSource);
  }
}
