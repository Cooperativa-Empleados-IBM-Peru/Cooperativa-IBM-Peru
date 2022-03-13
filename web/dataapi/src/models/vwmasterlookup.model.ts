import {Entity, model, property} from '@loopback/repository';
import {db2config} from '../datasources/env';

@model({
  settings: {idInjection: false, db2: {schema: db2config.schema, table: 'VWMASTERLOOKUP'}}
})
export class Vwmasterlookup extends Entity {
  @property({
    type: 'boolean',
    length: 1,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'ACTIVO', dataType: 'BOOLEAN', dataLength: 1, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  activo?: boolean;

  @property({
    type: 'number',
    length: 8,
    //   precision: ,
    scale: 0,
    db2: {columnName: 'CERTSOLMONTOS', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  certsolmontos?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'CERTSOLVALOR', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  certsolvalor?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'CERTUSDMONTOS', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  certusdmontos?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'CERTUSDVALOR', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  certusdvalor?: number;

  @property({
    type: 'string',
    required: true,
    length: 15,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'CODEMPLEADO', dataType: 'CHARACTER', dataLength: 15, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  codempleado: string;

  @property({
    type: 'string',
    required: true,
    length: 5,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'CODPAIS', dataType: 'CHARACTER', dataLength: 5, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  codpais: string;

  @property({
    type: 'string',
    length: 10,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'COMPANY', dataType: 'CHARACTER', dataLength: 10, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  company?: string;

  @property({
    type: 'string',
    length: 10,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'CTASOLES', dataType: 'CHARACTER', dataLength: 10, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  ctasoles?: string;

  @property({
    type: 'string',
    length: 10,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'CTAUSD', dataType: 'CHARACTER', dataLength: 10, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  ctausd?: string;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'CTSSOLMONTOS', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  ctssolmontos?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'CTSSOLVALOR', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  ctssolvalor?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'CTSUSDMONTOS', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  ctsusdmontos?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'CTSUSDVALOR', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  ctsusdvalor?: number;

  @property({
    type: 'string',
    length: 50,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'DIRECCIONEMPLEADO', dataType: 'CHARACTER', dataLength: 50, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  direccionempleado?: string;

  @property({
    type: 'string',
    length: 70,
    //   precision: ,
    scale: 0,
    db2: {columnName: 'EMAILEMPLEADO', dataType: 'CHARACTER', dataLength: 70, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  emailempleado?: string;

  @property({
    type: 'boolean',
    length: 1,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'INBLUEPAGES', dataType: 'BOOLEAN', dataLength: 1, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  inbluepages?: boolean;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'INTAHORROMESSOL', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  intahorromessol?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'INTAHORROMESUSD', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  intahorromesusd?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'INTMISCELANEOMESSOL', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  intmiscelaneomessol?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'INTMISCELANEOMESUSD', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  intmiscelaneomesusd?: number;

  @property({
    type: 'boolean',
    length: 1,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'ISADMIN', dataType: 'BOOLEAN', dataLength: 1, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  isadmin?: boolean;

  @property({
    type: 'string',
    required: true,
    length: 70,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'NOMBREEMPLEADO', dataType: 'CHARACTER', dataLength: 70, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  nombreempleado: string;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'SALDOAPORTACIONSOL', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldoaportacionsol?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'SALDOAPORTACIONUSD', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldoaportacionusd?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'SALDOBLOQUEOAHORROSOL', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldobloqueoahorrosol?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'SALDOBLOQUEOAHORROUSD', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldobloqueoahorrousd?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'SALDOCONTABLESOL', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldocontablesol?: number;

  @property({
    type: 'number',
    length: 8,
    //   precision: ,
    scale: 0,
    db2: {columnName: 'SALDOCONTABLEUSD', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldocontableusd?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'SALDODISPAHORROSOL', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldodispahorrosol?: number;

  @property({
    type: 'number',
    length: 8,
    //   precision: ,
    scale: 0,
    db2: {columnName: 'SALDOMISCELANEOSOL', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldomiscelaneosol?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'SALDOMISCELANEOUSD', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldomiscelaneousd?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'SALDODISPAHORROUSD', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldodispahorrousd?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'SOLSALDOPRESAUTO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  solsaldopresauto?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'SOLSALDOPRESCONSUMO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  solsaldopresconsumo?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'SOLSALDOPRESCORTOPLAZO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  solsaldoprescortoplazo?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'SOLSALDOPRESESP1', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  solsaldopresesp1?: number;

  @property({
    type: 'number',
    length: 8,
    //   precision: ,
    scale: 0,
    db2: {columnName: 'SOLSALDOPRESESP2', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  solsaldopresesp2?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'SOLSALDOPRESHIPOTECARIO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  solsaldopreshipotecario?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'SOLSALDOPRESLARGOPLAZO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  solsaldopreslargoplazo?: number;

  @property({
    type: 'number',
    length: 8,
    //   precision: ,
    scale: 0,
    db2: {columnName: 'SOLSALDOPRESMEDIANOPLAZO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  solsaldopresmedianoplazo?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'SOLSALDOPRESPS1', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  solsaldopresps1?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'SOLSALDOPRESSOLAFIRMA', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  solsaldopressolafirma?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'USDSALDOPRESAUTO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  usdsaldopresauto?: number;

  @property({
    type: 'number',
    length: 8,
    //   precision: ,
    scale: 0,
    db2: {columnName: 'USDSALDOPRESCONSUMO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  usdsaldopresconsumo?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'USDSALDOPRESCORTOPLAZO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  usdsaldoprescortoplazo?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'USDSALDOPRESESP1', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  usdsaldopresesp1?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'USDSALDOPRESESP2', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  usdsaldopresesp2?: number;

  @property({
    type: 'number',
    length: 8,
    //   precision: ,
    scale: 0,
    db2: {columnName: 'USDSALDOPRESHIPOTECARIO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  usdsaldopreshipotecario?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'USDSALDOPRESLARGOPLAZO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  usdsaldopreslargoplazo?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'USDSALDOPRESMEDIANOPLAZO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  usdsaldopresmedianoplazo?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'USDSALDOPRESPS1', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  usdsaldopresps1?: number;

  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'USDSALDOPRESSOLAFIRMA', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  usdsaldopressolafirma?: number;

  @property({
    type: 'string',
    required: true,
    id: 1,
    length: 40,
    //   precision: ,
    scale: 0,
    db2: {columnName: 'UUID', dataType: 'CHARACTER', dataLength: 40, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  uuid: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Vwmasterlookup>) {
    super(data);
  }
}

export interface VwmasterlookupRelations {
  // describe navigational properties here
}

export type VwmasterlookupWithRelations = Vwmasterlookup & VwmasterlookupRelations;
