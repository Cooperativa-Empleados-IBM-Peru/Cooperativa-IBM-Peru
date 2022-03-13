import {DefaultCrudRepository} from '@loopback/repository';
import {Ctsusdmontostotales, CtsusdmontostotalesRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CtsusdmontostotalesRepository extends DefaultCrudRepository<
  Ctsusdmontostotales,
  typeof Ctsusdmontostotales.prototype.id,
  CtsusdmontostotalesRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Ctsusdmontostotales, dataSource);
  }
}
