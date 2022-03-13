import {Entity, model, property} from '@loopback/repository';
import {db2config} from '../datasources/env';

@model({
  settings: {idInjection: false, db2: {schema: db2config.schema, table: 'CERTIFICADOS'}}
})
export class Certificados extends Entity {
  @property({
    type: 'string',
    required: true,
    length: 15,
    //   precision: ,
    scale: 0,
    id: 2,
    db2: {columnName: 'CODEMPLEADO', dataType: 'CHARACTER', dataLength: 15, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  codempleado: string;

  @property({
    type: 'string',
    required: true,
    length: 10,
    //    precision: ,
    scale: 0,
    id: 3,
    db2: {columnName: 'CTACLIENTE', dataType: 'CHARACTER', dataLength: 10, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  ctacliente: string;

  @property({
    type: 'string',
    required: true,
    length: 5,
    //   precision: ,
    scale: 0,
    db2: {columnName: 'DOCID', dataType: 'CHARACTER', dataLength: 5, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  docid: string;

  @property({
    type: 'date',
    length: 4,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'FECEMISION', dataType: 'DATE', dataLength: 4, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  fecemision?: string;

  @property({
    type: 'date',
    length: 13,
    //    precision: ,
    scale: 12,
    db2: {columnName: 'FECMODIFICACION', dataType: 'TIMESTAMP', dataLength: 13, dataPrecision: undefined, dataScale: 12, nullable: 'Y'},
  })
  fecmodificacion?: string;

  @property({
    type: 'date',
    length: 4,
    //   precision: ,
    scale: 0,
    db2: {columnName: 'FECVENCIMIENTO', dataType: 'DATE', dataLength: 4, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  fecvencimiento?: string;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'INTERES', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  interes?: number;

  @property({
    type: 'number',
    length: 8,
    //   precision: ,
    scale: 0,
    db2: {columnName: 'INTERESC', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  interesc?: number;

  @property({
    type: 'number',
    length: 8,
    //   precision: ,
    scale: 0,
    db2: {columnName: 'INTERESP', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  interesp?: number;

  @property({
    type: 'number',
    length: 8,
    //   precision: ,
    scale: 0,
    db2: {columnName: 'MONTO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  monto?: number;

  @property({
    type: 'string',
    required: true,
    length: 10,
    //   precision: ,
    scale: 0,
    id: 4,
    db2: {columnName: 'NUMDOC', dataType: 'CHARACTER', dataLength: 10, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  numdoc: string;

  @property({
    type: 'number',
    required: true,
    length: 2,
    //   precision: ,
    scale: 0,
    db2: {columnName: 'PLAZO', dataType: 'SMALLINT', dataLength: 2, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  plazo: number;

  @property({
    type: 'string',
    required: true,
    length: 5,
    //   precision: ,
    scale: 0,
    id: 1,
    db2: {columnName: 'TIPOCERT', dataType: 'CHARACTER', dataLength: 5, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  tipocert: string;

  @property({
    type: 'string',
    required: true,
    length: 5,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'TIPOID', dataType: 'CHARACTER', dataLength: 5, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  tipoid: string;

  @property({
    type: 'string',
    required: true,
    length: 5,
    //   precision: ,
    scale: 0,
    id: 5,
    db2: {columnName: 'TIPOPAGO', dataType: 'CHARACTER', dataLength: 5, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  tipopago: string;

  @property({
    type: 'string',
    length: 5,
    //   precision: ,
    scale: 0,
    db2: {columnName: 'VERS', dataType: 'CHARACTER', dataLength: 5, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  vers?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Certificados>) {
    super(data);
  }
}

export interface CertificadosRelations {
  // describe navigational properties here
}

export type CertificadosWithRelations = Certificados & CertificadosRelations;
