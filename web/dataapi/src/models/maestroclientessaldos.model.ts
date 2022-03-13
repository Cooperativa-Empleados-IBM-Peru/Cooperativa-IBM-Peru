import {Entity, model, property} from '@loopback/repository';
import {db2config} from '../datasources/env';

@model({
  settings: {idInjection: false, db2: {schema: db2config.schema, table: 'MAESTROCLIENTESSALDOS'}}
})
export class Maestroclientessaldos extends Entity {
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
    length: 5,
    // precision: ,
    scale: 0,
    db2: {columnName: 'CODEMPRESA', dataType: 'CHARACTER', dataLength: 5, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  codempresa?: string;

  @property({
    type: 'string',
    required: true,
    length: 10,
    // precision: ,
    scale: 0,
    id: 1,
    db2: {columnName: 'CTACLIENTE', dataType: 'CHARACTER', dataLength: 10, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  ctacliente: string;

  @property({
    type: 'string',
    length: 50,
    // precision: ,
    scale: 0,
    db2: {columnName: 'DIRECCIONEMPLEADO', dataType: 'CHARACTER', dataLength: 50, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  direccionempleado?: string;

  @property({
    type: 'date',
    length: 4,
    // precision: ,
    scale: 0,
    db2: {columnName: 'FECAPORTACION', dataType: 'DATE', dataLength: 4, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  fecaportacion?: string;

  @property({
    type: 'date',
    length: 4,
    // precision: ,
    scale: 0,
    db2: {columnName: 'FECBLOQUEOAHORRO', dataType: 'DATE', dataLength: 4, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  fecbloqueoahorro?: string;

  @property({
    type: 'date',
    length: 4,
    // precision: ,
    scale: 0,
    db2: {columnName: 'FECCERTIFICADO1', dataType: 'DATE', dataLength: 4, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  feccertificado1?: string;

  @property({
    type: 'date',
    length: 4,
    // precision: ,
    scale: 0,
    db2: {columnName: 'FECCERTIFICADO2', dataType: 'DATE', dataLength: 4, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  feccertificado2?: string;

  @property({
    type: 'date',
    length: 4,
    // precision: ,
    scale: 0,
    db2: {columnName: 'FECDISPAHORRO', dataType: 'DATE', dataLength: 4, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  fecdispahorro?: string;

  @property({
    type: 'date',
    length: 4,
    // precision: ,
    scale: 0,
    db2: {columnName: 'FECMISCELANEO', dataType: 'DATE', dataLength: 4, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  fecmiscelaneo?: string;

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
    db2: {columnName: 'FECPRESAUTO', dataType: 'DATE', dataLength: 4, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  fecpresauto?: string;

  @property({
    type: 'date',
    length: 4,
    // precision: ,
    scale: 0,
    db2: {columnName: 'FECPRESCONSUMO', dataType: 'DATE', dataLength: 4, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  fecpresconsumo?: string;

  @property({
    type: 'date',
    length: 4,
    // precision: ,
    scale: 0,
    db2: {columnName: 'FECPRESCORTOPLAZO', dataType: 'DATE', dataLength: 4, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  fecprescortoplazo?: string;

  @property({
    type: 'date',
    length: 4,
    // precision: ,
    scale: 0,
    db2: {columnName: 'FECPRESESP1', dataType: 'DATE', dataLength: 4, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  fecpresesp1?: string;

  @property({
    type: 'date',
    length: 4,
    // precision: ,
    scale: 0,
    db2: {columnName: 'FECPRESESP2', dataType: 'DATE', dataLength: 4, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  fecpresesp2?: string;

  @property({
    type: 'date',
    length: 4,
    // precision: ,
    scale: 0,
    db2: {columnName: 'FECPRESHIPOTECARIO', dataType: 'DATE', dataLength: 4, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  fecpreshipotecario?: string;

  @property({
    type: 'date',
    length: 4,
    // precision: ,
    scale: 0,
    db2: {columnName: 'FECPRESLARGOPLAZO', dataType: 'DATE', dataLength: 4, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  fecpreslargoplazo?: string;

  @property({
    type: 'date',
    length: 4,
    // precision: ,
    scale: 0,
    db2: {columnName: 'FECPRESMEDIANOPLAZO', dataType: 'DATE', dataLength: 4, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  fecpresmedianoplazo?: string;

  @property({
    type: 'date',
    length: 4,
    // precision: ,
    scale: 0,
    db2: {columnName: 'FECPRESPS1', dataType: 'DATE', dataLength: 4, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  fecpresps1?: string;

  @property({
    type: 'date',
    length: 4,
    // precision: ,
    scale: 0,
    db2: {columnName: 'FECPRESSOLAFIRMA', dataType: 'DATE', dataLength: 4, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  fecpressolafirma?: string;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'INTAHORROMES', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  intahorromes?: number;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'INTMISCELANEOMES', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  intmiscelaneomes?: number;

  @property({
    type: 'string',
    required: true,
    length: 50,
    // precision: ,
    scale: 0,
    db2: {columnName: 'NOMBREEMPLEADO', dataType: 'CHARACTER', dataLength: 50, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  nombreempleado: string;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'SALDOAPORTACION', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldoaportacion?: number;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'SALDOBLOQUEOAHORRO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldobloqueoahorro?: number;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'SALDOCERTIFICADO1', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldocertificado1?: number;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'SALDOCERTIFICADO2', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldocertificado2?: number;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'SALDODISPAHORRO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldodispahorro?: number;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'SALDOMISCELANEO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldomiscelaneo?: number;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'SALDOPRESAUTO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldopresauto?: number;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'SALDOPRESCONSUMO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldopresconsumo?: number;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'SALDOPRESCORTOPLAZO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldoprescortoplazo?: number;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'SALDOPRESESP1', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldopresesp1?: number;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'SALDOPRESESP2', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldopresesp2?: number;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'SALDOPRESHIPOTECARIO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldopreshipotecario?: number;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'SALDOPRESLARGOPLAZO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldopreslargoplazo?: number;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'SALDOPRESMEDIANOPLAZO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldopresmedianoplazo?: number;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'SALDOPRESPS1', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldopresps1?: number;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'SALDOPRESSOLAFIRMA', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldopressolafirma?: number;

  @property({
    type: 'string',
    required: true,
    length: 2,
    // precision: ,
    scale: 0,
    db2: {columnName: 'TIPOID', dataType: 'CHARACTER', dataLength: 2, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  tipoid: string;

  @property({
    type: 'string',
    length: 5,
    // precision: ,
    scale: 0,
    db2: {columnName: 'TIPOMONEDA', dataType: 'CHARACTER', dataLength: 5, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  tipomoneda?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Maestroclientessaldos>) {
    super(data);
  }
}

export interface MaestroclientessaldosRelations {
  // describe navigational properties here
}

export type MaestroclientessaldosWithRelations = Maestroclientessaldos & MaestroclientessaldosRelations;
