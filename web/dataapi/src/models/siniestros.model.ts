import {Entity, model, property} from '@loopback/repository';
import {db2config} from '../datasources/env';

@model({settings: {idInjection: false, db2: {schema: db2config.schema, table: 'SINIESTROS'}}})
export class Siniestros extends Entity {
  @property({
    type: 'string',
    required: true,
    length: 15,
    // precision: ,
    scale: 0,
    id: 1,
    db2: {columnName: 'CODEMPLEADO', dataType: 'CHARACTER', dataLength: 15, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  codempleado: string;

  @property({
    type: 'string',
    length: 5,
    // precision: ,
    scale: 0,
    db2: {columnName: 'CODIGO', dataType: 'CHARACTER', dataLength: 5, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  codigo?: string;

  @property({
    type: 'string',
    length: 25,
    // precision: ,
    scale: 0,
    db2: {columnName: 'COMISARIA', dataType: 'CHARACTER', dataLength: 25, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  comisaria?: string;

  @property({
    type: 'string',
    length: 40,
    // precision: ,
    scale: 0,
    db2: {columnName: 'DESCRIPCION', dataType: 'CHARACTER', dataLength: 40, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  descripcion?: string;

  @property({
    type: 'string',
    length: 25,
    // precision: ,
    scale: 0,
    db2: {columnName: 'ESTADO', dataType: 'CHARACTER', dataLength: 25, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  estado?: string;

  @property({
    type: 'date',
    length: 13,
    // precision: ,
    scale: 12,
    db2: {columnName: 'FECMODIFICACION', dataType: 'TIMESTAMP', dataLength: 13, dataPrecision: undefined, dataScale: 12, nullable: 'Y'},
  })
  fecmodificacion?: string;

  @property({
    type: 'date',
    length: 4,
    // precision: ,
    scale: 0,
    db2: {columnName: 'FECSINIESTRO', dataType: 'DATE', dataLength: 4, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  fecsiniestro?: string;

  @property({
    type: 'string',
    length: 15,
    // precision: ,
    scale: 0,
    db2: {columnName: 'FRANQUICIA', dataType: 'CHARACTER', dataLength: 15, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  franquicia?: string;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'IMPORTE', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  importe?: number;

  @property({
    type: 'string',
    length: 40,
    // precision: ,
    scale: 0,
    db2: {columnName: 'LUGAR', dataType: 'CHARACTER', dataLength: 40, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  lugar?: string;

  @property({
    type: 'string',
    length: 10,
    // precision: ,
    scale: 0,
    db2: {columnName: 'NUMCONFORMIDAD', dataType: 'CHARACTER', dataLength: 10, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  numconformidad?: string;

  @property({
    type: 'string',
    length: 10,
    // precision: ,
    scale: 0,
    db2: {columnName: 'NUMDENUNCIA', dataType: 'CHARACTER', dataLength: 10, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  numdenuncia?: string;

  @property({
    type: 'string',
    required: true,
    length: 10,
    // precision: ,
    scale: 0,
    id: 3,
    db2: {columnName: 'NUMERO', dataType: 'CHARACTER', dataLength: 10, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  numero: string;

  @property({
    type: 'string',
    required: true,
    length: 10,
    // precision: ,
    scale: 0,
    id: 2,
    db2: {columnName: 'PLACA', dataType: 'CHARACTER', dataLength: 10, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  placa: string;

  @property({
    type: 'string',
    required: true,
    length: 3,
    // precision: ,
    scale: 0,
    db2: {columnName: 'TIPODOC', dataType: 'CHARACTER', dataLength: 3, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  tipodoc: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Siniestros>) {
    super(data);
  }
}

export interface SiniestrosRelations {
  // describe navigational properties here
}

export type SiniestrosWithRelations = Siniestros & SiniestrosRelations;
