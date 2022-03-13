import {DefaultCrudRepository} from '@loopback/repository';
import {Ctsusdmontos, CtsusdmontosRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CtsusdmontosRepository extends DefaultCrudRepository<
  Ctsusdmontos,
  typeof Ctsusdmontos.prototype.id,
  CtsusdmontosRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Ctsusdmontos, dataSource);
  }
}
