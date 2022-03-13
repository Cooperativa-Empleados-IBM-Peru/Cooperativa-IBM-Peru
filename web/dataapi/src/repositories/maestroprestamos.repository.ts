import {DefaultCrudRepository} from '@loopback/repository';
import {Maestroprestamos, MaestroprestamosRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MaestroprestamosRepository extends DefaultCrudRepository<
  Maestroprestamos,
  typeof Maestroprestamos.prototype.codempresa,
  MaestroprestamosRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Maestroprestamos, dataSource);
  }
}
