import {Entity, model, property} from '@loopback/repository';
import {db2config} from '../datasources/env';

@model({settings: {idInjection: false, db2: {schema: db2config.schema, table: 'GARANTES'}}})
export class Garantes extends Entity {
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
    type: 'date',
    length: 13,
    // precision: ,
    scale: 12,
    db2: {columnName: 'FECMODIFICACION', dataType: 'TIMESTAMP', dataLength: 13, dataPrecision: undefined, dataScale: 12, nullable: 'Y'},
  })
  fecmodificacion?: string;

  @property({
    type: 'string',
    required: true,
    length: 5,
    // precision: ,
    scale: 0,
    db2: {columnName: 'IDMOVIMIENTO', dataType: 'CHARACTER', dataLength: 5, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  idmovimiento: string;

  @property({
    type: 'string',
    required: true,
    length: 15,
    // precision: ,
    scale: 0,
    id: 2,
    db2: {columnName: 'NUMOPERACION', dataType: 'CHARACTER', dataLength: 15, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  numoperacion: string;

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

  constructor(data?: Partial<Garantes>) {
    super(data);
  }
}

export interface GarantesRelations {
  // describe navigational properties here
}

export type GarantesWithRelations = Garantes & GarantesRelations;
