import {DefaultCrudRepository} from '@loopback/repository';
import {Certificados, CertificadosRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CertificadosRepository extends DefaultCrudRepository<
  Certificados,
  typeof Certificados.prototype.codempleado,
  CertificadosRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Certificados, dataSource);
  }
}
