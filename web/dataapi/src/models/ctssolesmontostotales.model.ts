import {Entity, model, property} from '@loopback/repository';
import {db2config} from '../datasources/env';

@model({
  settings: {idInjection: false, db2: {schema: db2config.schema, table: 'CTSSOLESMONTOSTOTALES'}}
})
export class Ctssolesmontostotales extends Entity {
  @property({
    type: 'string',
    required: true,
    length: 15,
    // precision: ,
    scale: 0,
    db2: {columnName: 'CODEMPLEADO', dataType: 'CHARACTER', dataLength: 15, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  codempleado: string;

  @property({
    type: 'string',
    required: true,
    length: 10,
    // precision: ,
    scale: 0,
    db2: {columnName: 'CTACLIENTE', dataType: 'CHARACTER', dataLength: 10, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  ctacliente: string;

  @property({
    type: 'string',
    required: true,
    length: 5,
    // precision: ,
    scale: 0,
    db2: {columnName: 'TIPOCERT', dataType: 'CHARACTER', dataLength: 5, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  tipocert: string;

  @property({
    type: 'string',
    required: true,
    length: 5,
    // precision: ,
    scale: 0,
    db2: {columnName: 'TIPOPAGO', dataType: 'CHARACTER', dataLength: 5, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  tipopago: string;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'TOTALINTERES', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  totalinteres?: number;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'TOTALINTERESC', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  totalinteresc?: number;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'TOTALINTERESP', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  totalinteresp?: number;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'TOTALMONTOS', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  totalmontos?: number;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'TOTALVALOR', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  totalvalor?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Ctssolesmontostotales>) {
    super(data);
  }
}

export interface CtssolesmontostotalesRelations {
  // describe navigational properties here
}

export type CtssolesmontostotalesWithRelations = Ctssolesmontostotales & CtssolesmontostotalesRelations;
