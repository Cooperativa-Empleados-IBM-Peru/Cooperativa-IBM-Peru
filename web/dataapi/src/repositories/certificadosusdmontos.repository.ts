import {DefaultCrudRepository} from '@loopback/repository';
import {Certificadosusdmontos, CertificadosusdmontosRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CertificadosusdmontosRepository extends DefaultCrudRepository<
  Certificadosusdmontos,
  typeof Certificadosusdmontos.prototype.id,
  CertificadosusdmontosRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Certificadosusdmontos, dataSource);
  }
}
