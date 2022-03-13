import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Db2CoopeDataSource} from '../datasources';
import {Prcortoplazo, PrcortoplazoRelations} from '../models';

export class PrcortoplazoRepository extends DefaultCrudRepository<
  Prcortoplazo,
  typeof Prcortoplazo.prototype.id,
  PrcortoplazoRelations
  > {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Prcortoplazo, dataSource);
  }
}
