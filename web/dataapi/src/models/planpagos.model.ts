import {Entity, model, property} from '@loopback/repository';
import {db2config} from '../datasources/env';

@model({settings: {idInjection: false, db2: {schema: db2config.schema, table: 'PLANPAGOS'}}})
export class Planpagos extends Entity {
  @property({
    type: 'number',
    required: true,
    length: 2,
    // precision: ,
    scale: 0,
    id: 3,
    db2: {columnName: 'CUOTA', dataType: 'SMALLINT', dataLength: 2, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  cuota: number;

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
    db2: {columnName: 'FECPAGO', dataType: 'DATE', dataLength: 4, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  fecpago?: string;

  @property({
    type: 'date',
    length: 4,
    // precision: ,
    scale: 0,
    db2: {columnName: 'FECVENCIMIENTO', dataType: 'DATE', dataLength: 4, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  fecvencimiento?: string;

  @property({
    type: 'string',
    required: true,
    length: 5,
    // precision: ,
    scale: 0,
    id: 2,
    db2: {columnName: 'IDMOVIMIENTO', dataType: 'CHARACTER', dataLength: 5, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  idmovimiento: string;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'INTERES', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  interes?: number;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'INTERESMORATORIO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  interesmoratorio?: number;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'MONTO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  monto?: number;

  @property({
    type: 'string',
    required: true,
    length: 15,
    // precision: ,
    scale: 0,
    id: 1,
    db2: {columnName: 'NUMOPERACION', dataType: 'CHARACTER', dataLength: 15, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  numoperacion: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Planpagos>) {
    super(data);
  }
}

export interface PlanpagosRelations {
  // describe navigational properties here
}

export type PlanpagosWithRelations = Planpagos & PlanpagosRelations;
