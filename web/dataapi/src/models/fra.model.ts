import {Entity, model, property} from '@loopback/repository';
import {db2config} from '../datasources/env';

@model({settings: {idInjection: false, db2: {schema: db2config.schema, table: 'FRA'}}})
export class Fra extends Entity {
  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'ACCESORIOS', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  accesorios?: number;

  @property({
    type: 'number',
    length: 2,
    // precision: ,
    scale: 0,
    db2: {columnName: 'ANNOFABRICACION', dataType: 'SMALLINT', dataLength: 2, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  annofabricacion?: number;

  @property({
    type: 'string',
    length: 20,
    // precision: ,
    scale: 0,
    db2: {columnName: 'CLASE', dataType: 'CHARACTER', dataLength: 20, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  clase?: string;

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
    length: 20,
    // precision: ,
    scale: 0,
    db2: {columnName: 'COLOR', dataType: 'CHARACTER', dataLength: 20, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  color?: string;

  @property({
    type: 'date',
    length: 4,
    // precision: ,
    scale: 0,
    db2: {columnName: 'FECINSCRIPCION', dataType: 'DATE', dataLength: 4, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  fecinscripcion?: string;

  @property({
    type: 'date',
    length: 13,
    // precision: ,
    scale: 12,
    db2: {columnName: 'FECMODIFICACION', dataType: 'TIMESTAMP', dataLength: 13, dataPrecision: undefined, dataScale: 12, nullable: 'Y'},
  })
  fecmodificacion?: string;

  @property({
    type: 'string',
    length: 20,
    // precision: ,
    scale: 0,
    db2: {columnName: 'MARCA', dataType: 'CHARACTER', dataLength: 20, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  marca?: string;

  @property({
    type: 'string',
    length: 20,
    // precision: ,
    scale: 0,
    db2: {columnName: 'MODELO', dataType: 'CHARACTER', dataLength: 20, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  modelo?: string;

  @property({
    type: 'string',
    length: 25,
    // precision: ,
    scale: 0,
    db2: {columnName: 'MOTOR', dataType: 'CHARACTER', dataLength: 25, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  motor?: string;

  @property({
    type: 'string',
    length: 50,
    // precision: ,
    scale: 0,
    db2: {columnName: 'NOMBRESOCIO', dataType: 'CHARACTER', dataLength: 50, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  nombresocio?: string;

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
    length: 40,
    // precision: ,
    scale: 0,
    db2: {columnName: 'PROPIETARIO', dataType: 'CHARACTER', dataLength: 40, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  propietario?: string;

  @property({
    type: 'string',
    length: 25,
    // precision: ,
    scale: 0,
    db2: {columnName: 'SERIE', dataType: 'CHARACTER', dataLength: 25, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  serie?: string;

  @property({
    type: 'string',
    length: 15,
    // precision: ,
    scale: 0,
    db2: {columnName: 'TARJETA', dataType: 'CHARACTER', dataLength: 15, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  tarjeta?: string;

  @property({
    type: 'string',
    required: true,
    length: 3,
    // precision: ,
    scale: 0,
    db2: {columnName: 'TIPODOC', dataType: 'CHARACTER', dataLength: 3, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  tipodoc: string;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'VALOR', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  valor?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Fra>) {
    super(data);
  }
}

export interface FraRelations {
  // describe navigational properties here
}

export type FraWithRelations = Fra & FraRelations;
