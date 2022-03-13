import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Db2CoopeDataSource} from '../datasources';
import {Pracademico, PracademicoRelations} from '../models';

export class PracademicoRepository extends DefaultCrudRepository<
  Pracademico,
  typeof Pracademico.prototype.id,
  PracademicoRelations
  > {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Pracademico, dataSource);
  }
}
