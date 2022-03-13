import {DefaultCrudRepository} from '@loopback/repository';
import {Maestroclientessaldos, MaestroclientessaldosRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MaestroclientessaldosRepository extends DefaultCrudRepository<
  Maestroclientessaldos,
  typeof Maestroclientessaldos.prototype.ctacliente,
  MaestroclientessaldosRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Maestroclientessaldos, dataSource);
  }
}
