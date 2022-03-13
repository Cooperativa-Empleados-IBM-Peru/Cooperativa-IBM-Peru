import {DefaultCrudRepository} from '@loopback/repository';
import {Movahorros, MovahorrosRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MovahorrosRepository extends DefaultCrudRepository<
  Movahorros,
  typeof Movahorros.prototype.codempresa,
  MovahorrosRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Movahorros, dataSource);
  }
}
