import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Db2CoopeDataSource} from '../datasources';
import {Prconsumo, PrconsumoRelations} from '../models';

export class PrconsumoRepository extends DefaultCrudRepository<
  Prconsumo,
  typeof Prconsumo.prototype.id,
  PrconsumoRelations
  > {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Prconsumo, dataSource);
  }
}
