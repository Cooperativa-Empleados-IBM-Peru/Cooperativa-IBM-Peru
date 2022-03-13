import {Entity, model, property} from '@loopback/repository';
import {db2config} from '../datasources/env';

@model({
  settings: {idInjection: false, db2: {schema: db2config.schema, table: 'PLANPAGOSMONTOS'}}
})
export class Planpagosmontos extends Entity {
  @property({
    type: 'number',
    required: true,
    length: 2,
    // precision: ,
    id: 1,
    scale: 0,
    db2: {columnName: 'CUOTA', dataType: 'SMALLINT', dataLength: 2, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  cuota: number;

  @property({
    type: 'string',
    required: true,
    length: 5,
    // precision: ,
    id: 2,
    scale: 0,
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
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'MONTOCUOTA', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  montocuota?: number;

  @property({
    type: 'string',
    required: true,
    length: 15,
    // precision: ,
    id: 3,
    scale: 0,
    db2: {columnName: 'NUMOPERACION', dataType: 'CHARACTER', dataLength: 15, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  numoperacion: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Planpagosmontos>) {
    super(data);
  }
}

export interface PlanpagosmontosRelations {
  // describe navigational properties here
}

export type PlanpagosmontosWithRelations = Planpagosmontos & PlanpagosmontosRelations;
