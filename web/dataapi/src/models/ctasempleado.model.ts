import {Entity, model, property} from '@loopback/repository';
import {db2config} from '../datasources/env';

@model({
  settings: {idInjection: false, db2: {schema: db2config.schema, table: 'CTASEMPLEADO'}}
})
export class Ctasempleado extends Entity {
  @property({
    type: 'string',
    hidden: true,
    required: true,
    length: 15,
    //   precision: ,
    scale: 0,
    db2: {columnName: 'CODEMPLEADO', dataType: 'CHARACTER', dataLength: 15, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  codempleado: string;

  @property({
    type: 'string',
    hidden: true,
    required: true,
    length: 40,
    id: 1,
    //   precision: ,
    scale: 0,
    db2: {columnName: 'UUID', dataType: 'CHARACTER', dataLength: 40, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  uuid: string;

  @property({
    type: 'string',
    required: true,
    length: 10,
    //   precision: ,
    scale: 0,
    db2: {columnName: 'CTASOLES', dataType: 'CHARACTER', dataLength: 10, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  ctasoles: string;

  @property({
    type: 'string',
    required: true,
    length: 10,
    //   precision: ,
    scale: 0,
    db2: {columnName: 'CTAUSD', dataType: 'CHARACTER', dataLength: 10, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  ctausd: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Ctasempleado>) {
    super(data);
  }
}

export interface CtasempleadoRelations {
  // describe navigational properties here
}

export type CtasempleadoWithRelations = Ctasempleado & CtasempleadoRelations;
