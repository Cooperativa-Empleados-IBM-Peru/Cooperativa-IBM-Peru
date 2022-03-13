import {DefaultCrudRepository} from '@loopback/repository';
import {Garantesdetalle, GarantesdetalleRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class GarantesdetalleRepository extends DefaultCrudRepository<
  Garantesdetalle,
  typeof Garantesdetalle.prototype.codempleado,
  GarantesdetalleRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Garantesdetalle, dataSource);
  }
}
