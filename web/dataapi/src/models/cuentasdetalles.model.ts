import {Entity, model, property} from '@loopback/repository';
import {db2config} from '../datasources/env';

@model({
  settings: {idInjection: false, db2: {schema: db2config.schema, table: 'CUENTASDETALLES'}}
})
export class Cuentasdetalles extends Entity {
  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'INTAHORROMESSOL', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  intahorromessol?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'INTAHORROMESUSD', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  intahorromesusd?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'INTMISCELANEOMESSOL', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  intmiscelaneomessol?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'INTMISCELANEOMESUSD', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  intmiscelaneomesusd?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'SALDOAPORTACIONSOL', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldoaportacionsol?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'SALDOAPORTACIONUSD', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldoaportacionusd?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'SALDOBLOQUEOAHORROSOL', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldobloqueoahorrosol?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'SALDOBLOQUEOAHORROUSD', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldobloqueoahorrousd?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'SALDOCONTABLESOL', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldocontablesol?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'SALDOCONTABLEUSD', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldocontableusd?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'SALDODISPAHORROSOL', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldodispahorrosol?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'SALDOMISCELANEOSOL', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldomiscelaneosol?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'SALDOMISCELANEOUSD', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldomiscelaneousd?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'SALDODISPAHORROUSD', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldodispahorrousd?: number;

  @property({
    type: 'string',
    hidden: true,
    required: true,
    length: 40,
    //  precision: ,
    id: 1,
    scale: 0,
    db2: {columnName: 'UUID', dataType: 'CHARACTER', dataLength: 40, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  uuid: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Cuentasdetalles>) {
    super(data);
  }
}

export interface CuentasdetallesRelations {
  // describe navigational properties here
}

export type CuentasdetallesWithRelations = Cuentasdetalles & CuentasdetallesRelations;
