import {Entity, model, property} from '@loopback/repository';
import {db2config} from '../datasources/env';

@model({
  settings: {
    idInjection: false,
    db2: {schema: db2config.schema, table: 'CERTIFICADOSMONTOSTOTALESID'}
  }
})
export class Certificadosmontostotalesid extends Entity {
  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'CERTSOLMONTOS', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  certsolmontos?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'CERTSOLVALOR', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  certsolvalor?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'CERTUSDMONTOS', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  certusdmontos?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'CERTUSDVALOR', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  certusdvalor?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'CTSSOLMONTOS', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  ctssolmontos?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'CTSSOLVALOR', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  ctssolvalor?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'CTSUSDMONTOS', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  ctsusdmontos?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'CTSUSDVALOR', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  ctsusdvalor?: number;

  @property({
    type: 'string',
    required: true,
    hidden: true,
    length: 40,
    id: 1,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'UUID', dataType: 'CHARACTER', dataLength: 40, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  uuid: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Certificadosmontostotalesid>) {
    super(data);
  }
}

export interface CertificadosmontostotalesidRelations {
  // describe navigational properties here
}

export type CertificadosmontostotalesidWithRelations = Certificadosmontostotalesid & CertificadosmontostotalesidRelations;
