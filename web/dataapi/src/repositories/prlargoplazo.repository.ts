import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Db2CoopeDataSource} from '../datasources';
import {Prlargoplazo, PrlargoplazoRelations} from '../models';

export class PrlargoplazoRepository extends DefaultCrudRepository<
  Prlargoplazo,
  typeof Prlargoplazo.prototype.id,
  PrlargoplazoRelations
  > {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Prlargoplazo, dataSource);
  }
}
