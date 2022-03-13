import {Entity, model, property} from '@loopback/repository';
import {db2config} from '../datasources/env';

@model({
  settings: {idInjection: false, db2: {schema: db2config.schema, table: 'GARANTIZADOS'}}
})
export class Garantizados extends Entity {
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
    required: true,
    length: 15,
    // precision: ,
    scale: 0,
    id: 2,
    db2: {columnName: 'DOCIDGARANTIZADO', dataType: 'CHARACTER', dataLength: 15, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  docidgarantizado: string;

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
    db2: {columnName: 'FECPRESTAMO', dataType: 'DATE', dataLength: 4, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  fecprestamo?: string;

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
    length: 5,
    // precision: ,
    scale: 0,
    db2: {columnName: 'MONEDA', dataType: 'CHARACTER', dataLength: 5, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  moneda?: string;

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
    length: 40,
    // precision: ,
    scale: 0,
    db2: {columnName: 'NOMBREPRODUCTO', dataType: 'CHARACTER', dataLength: 40, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  nombreproducto?: string;

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
    length: 50,
    // precision: ,
    scale: 0,
    db2: {columnName: 'NOMBRESOCIOGARANTIZADO', dataType: 'CHARACTER', dataLength: 50, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  nombresociogarantizado?: string;

  @property({
    type: 'string',
    required: true,
    length: 15,
    // precision: ,
    scale: 0,
    id: 3,
    db2: {columnName: 'NUMOPERACION', dataType: 'CHARACTER', dataLength: 15, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  numoperacion: string;

  @property({
    type: 'number',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'SALDO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  saldo?: number;

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
    type: 'string',
    required: true,
    length: 3,
    // precision: ,
    scale: 0,
    db2: {columnName: 'TIPODOCGARANTIZADO', dataType: 'CHARACTER', dataLength: 3, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  tipodocgarantizado: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Garantizados>) {
    super(data);
  }
}

export interface GarantizadosRelations {
  // describe navigational properties here
}

export type GarantizadosWithRelations = Garantizados & GarantizadosRelations;
