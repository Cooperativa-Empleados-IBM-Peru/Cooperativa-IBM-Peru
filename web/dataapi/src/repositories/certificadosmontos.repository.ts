import {DefaultCrudRepository} from '@loopback/repository';
import {Certificadosmontos, CertificadosmontosRelations} from '../models';
import {Db2CoopeDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CertificadosmontosRepository extends DefaultCrudRepository<
  Certificadosmontos,
  typeof Certificadosmontos.prototype.codempleado,
  CertificadosmontosRelations
> {
  constructor(
    @inject('datasources.db2coope') dataSource: Db2CoopeDataSource,
  ) {
    super(Certificadosmontos, dataSource);
  }
}
