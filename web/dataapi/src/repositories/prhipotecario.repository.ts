import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Db2CoopeDataSource} from '../datasources';
import {Prhipotecario, PrhipotecarioRelations} from '../models';

export class PrhipotecarioRepository extends DefaultCrudRepository<
  Prhipotecario,
  typeof Prhipotecario.prototype.id,
  PrhipotecarioRelations
  > {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Prhipotecario, dataSource);
  }
}
