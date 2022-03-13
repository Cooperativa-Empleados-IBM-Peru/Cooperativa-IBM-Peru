import {Entity, model, property} from '@loopback/repository';
import {db2config} from '../datasources/env';

@model({
  settings: {idInjection: false, db2: {schema: db2config.schema, table: 'CUENTASSALDOS'}}
})
export class Cuentassaldos extends Entity {
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
    //    precision: ,
    scale: 0,
    db2: {columnName: 'SOLSALDOPRESESP2', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  solsaldopresesp2?: number;

  @property({
    type: 'number',
    length: 8,
    //   precision: ,
    scale: 0,
    db2: {columnName: 'SOLSALDOPRESHIPOTECARIO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  solsaldopreshipotecario?: number;

  @property({
    type: 'number',
    length: 8,
    //   precision: ,
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
    //   precision: ,
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
    //    precision: ,
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
    //   precision: ,
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
    //    precision: ,
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
    //   precision: ,
    scale: 0,
    db2: {columnName: 'USDSALDOPRESPS1', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  usdsaldopresps1?: number;

  @property({
    type: 'number',
    length: 8,
    //   precision: ,
    scale: 0,
    db2: {columnName: 'USDSALDOPRESSOLAFIRMA', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  usdsaldopressolafirma?: number;

  @property({
    type: 'string',
    required: true,
    length: 40,
    hidden: true,
    id: 1,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'UUID', dataType: 'CHARACTER', dataLength: 40, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  uuid: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Cuentassaldos>) {
    super(data);
  }
}

export interface CuentassaldosRelations {
  // describe navigational properties here
}

export type CuentassaldosWithRelations = Cuentassaldos & CuentassaldosRelations;
