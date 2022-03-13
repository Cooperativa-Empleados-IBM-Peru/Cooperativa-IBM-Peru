import {DefaultCrudRepository} from '@loopback/repository';
import {Certificadossolesmontostotales, CertificadossolesmontostotalesRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CertificadossolesmontostotalesRepository extends DefaultCrudRepository<
  Certificadossolesmontostotales,
  typeof Certificadossolesmontostotales.prototype.id,
  CertificadossolesmontostotalesRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Certificadossolesmontostotales, dataSource);
  }
}
