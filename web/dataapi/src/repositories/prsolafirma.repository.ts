import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Db2CoopeDataSource} from '../datasources';
import {Prsolafirma, PrsolafirmaRelations} from '../models';

export class PrsolafirmaRepository extends DefaultCrudRepository<
  Prsolafirma,
  typeof Prsolafirma.prototype.id,
  PrsolafirmaRelations
  > {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Prsolafirma, dataSource);
  }
}
