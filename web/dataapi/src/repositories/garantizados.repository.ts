import {DefaultCrudRepository} from '@loopback/repository';
import {Garantizados, GarantizadosRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class GarantizadosRepository extends DefaultCrudRepository<
  Garantizados,
  typeof Garantizados.prototype.codempleado,
  GarantizadosRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Garantizados, dataSource);
  }
}
