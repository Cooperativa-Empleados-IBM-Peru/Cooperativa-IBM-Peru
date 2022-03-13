import {DefaultCrudRepository} from '@loopback/repository';
import {Vwcoopeadmins, VwcoopeadminsRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class VwcoopeadminsRepository extends DefaultCrudRepository<
  Vwcoopeadmins,
  typeof Vwcoopeadmins.prototype.codempleado,
  VwcoopeadminsRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Vwcoopeadmins, dataSource);
  }
}
