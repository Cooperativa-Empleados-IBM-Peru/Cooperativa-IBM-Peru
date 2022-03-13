import {Entity, model, property} from '@loopback/repository';
import {db2config} from '../datasources/env';

@model({settings: {idInjection: false, db2: {schema: db2config.schema, table: 'VIDEOS'}}})
export class Videos extends Entity {
  @property({
    type: 'number',
    length: 2,
    // precision: ,
    scale: 0,
    db2: {columnName: 'ANNO', dataType: 'SMALLINT', dataLength: 2, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  anno?: number;

  @property({
    type: 'string',
    required: true,
    length: 5,
    // precision: ,
    scale: 0,
    id: 1,
    db2: {columnName: 'CODGENERO', dataType: 'CHARACTER', dataLength: 5, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  codgenero: string;

  @property({
    type: 'string',
    required: true,
    length: 5,
    // precision: ,
    scale: 0,
    id: 2,
    db2: {columnName: 'CODIGO', dataType: 'CHARACTER', dataLength: 5, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  codigo: string;

  @property({
    type: 'string',
    length: 50,
    // precision: ,
    scale: 0,
    db2: {columnName: 'DIRECTOR', dataType: 'CHARACTER', dataLength: 50, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  director?: string;

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
    length: 30,
    // precision: ,
    scale: 0,
    db2: {columnName: 'GENERO', dataType: 'CHARACTER', dataLength: 30, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  genero: string;

  @property({
    type: 'string',
    length: 15,
    // precision: ,
    scale: 0,
    db2: {columnName: 'IDIOMA', dataType: 'CHARACTER', dataLength: 15, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  idioma?: string;

  @property({
    type: 'string',
    length: 15,
    // precision: ,
    scale: 0,
    db2: {columnName: 'PAIS', dataType: 'CHARACTER', dataLength: 15, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  pais?: string;

  @property({
    type: 'string',
    length: 50,
    // precision: ,
    scale: 0,
    db2: {columnName: 'PROTAGONISTA1', dataType: 'CHARACTER', dataLength: 50, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  protagonista1?: string;

  @property({
    type: 'string',
    length: 50,
    // precision: ,
    scale: 0,
    db2: {columnName: 'PROTAGONISTA2', dataType: 'CHARACTER', dataLength: 50, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  protagonista2?: string;

  @property({
    type: 'string',
    length: 50,
    // precision: ,
    scale: 0,
    db2: {columnName: 'PROTAGONISTA3', dataType: 'CHARACTER', dataLength: 50, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  protagonista3?: string;

  @property({
    type: 'string',
    length: 50,
    // precision: ,
    scale: 0,
    db2: {columnName: 'PROTAGONISTA4', dataType: 'CHARACTER', dataLength: 50, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  protagonista4?: string;

  @property({
    type: 'string',
    length: 50,
    // precision: ,
    scale: 0,
    db2: {columnName: 'TITULO', dataType: 'CHARACTER', dataLength: 50, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  titulo?: string;

  @property({
    type: 'string',
    length: 50,
    // precision: ,
    scale: 0,
    db2: {columnName: 'TITULOCASTELLANO', dataType: 'CHARACTER', dataLength: 50, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  titulocastellano?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Videos>) {
    super(data);
  }
}

export interface VideosRelations {
  // describe navigational properties here
}

export type VideosWithRelations = Videos & VideosRelations;
