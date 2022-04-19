import {Entity, model, property} from '@loopback/repository';
import {db2config} from '../datasources/env';

@model({
  settings: {idInjection: false, db2: {schema: db2config.schema, table: 'VWSOCIOSINACTIVOS'}}
})
export class Vwsociosinactivos extends Entity {

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
    // hidden: true,
    required: true,
    length: 40,
    // precision: ,
    scale: 0,
    id: 1,
    db2: {columnName: 'UUID', dataType: 'CHARACTER', dataLength: 40, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  uuid: string;

  @property({
    type: 'string',
    length: 50,
    // precision: ,
    scale: 0,
    db2: {columnName: 'EMAILEMPLEADO', dataType: 'CHARACTER', dataLength: 50, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  emailempleado?: string;

  @property({
    type: 'string',
    length: 50,
    // precision: ,
    scale: 0,
    db2: {columnName: 'EMAILEMPLEADO2', dataType: 'CHARACTER', dataLength: 50, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  emailempleado2?: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    // precision: ,
    scale: 0,
    db2: {columnName: 'NOMBREEMPLEADO', dataType: 'CHARACTER', dataLength: 50, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  nombreempleado: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Vwsociosinactivos>) {
    super(data);
  }
}

export interface VwsociosinactivosRelations {
  // describe navigational properties here
}

export type VwsociosinactivosWithRelations = Vwsociosinactivos & VwsociosinactivosRelations;
