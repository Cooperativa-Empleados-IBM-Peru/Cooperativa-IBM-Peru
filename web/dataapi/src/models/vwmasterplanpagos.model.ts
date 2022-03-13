import {Entity, model, property} from '@loopback/repository';
import {db2config} from '../datasources/env';

@model({
  settings: {idInjection: false, db2: {schema: db2config.schema, table: 'VWMASTERPLANPAGOS'}}
})
export class Vwmasterplanpagos extends Entity {
  @property({
    type: 'number',
    length: 8,
    //    precision: ,
    scale: 0,
    db2: {columnName: 'CANTOTALMONTOS', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  cantotalmontos?: number;

  @property({
    type: 'number',
    length: 8,
    //   precision: ,
    scale: 0,
    db2: {columnName: 'CANTOTALCUOTAS', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  cantotalcuotas?: number;

  @property({
    type: 'number',
    length: 8,
    //   precision: ,
    scale: 0,
    db2: {columnName: 'CANTOTALINTERES', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  cantotalinteres?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'CANTOTALINTERESMORATORIO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  cantotalinteresmoratorio?: number;

  @property({
    type: 'string',
    required: true,
    length: 5,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'IDMOVIMIENTO', dataType: 'CHARACTER', dataLength: 5, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  idmovimiento: string;

  @property({
    type: 'string',
    required: true,
    length: 15,
    id: 1,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'NUMOPERACION', dataType: 'CHARACTER', dataLength: 15, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  numoperacion: string;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'PENDTOTALCUOTAS', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  pendtotalcuotas?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'PENDTOTALINTERES', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  pendtotalinteres?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'PENDTOTALINTERESMORATORIO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  pendtotalinteresmoratorio?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'PENDTOTALMONTOS', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  pendtotalmontos?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'TOTALCUOTAS', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  totalcuotas?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'TOTALINTERES', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  totalinteres?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'TOTALINTERESMORATORIO', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  totalinteresmoratorio?: number;

  @property({
    type: 'number',
    length: 8,
    //  precision: ,
    scale: 0,
    db2: {columnName: 'TOTALMONTOS', dataType: 'DOUBLE', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  totalmontos?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Vwmasterplanpagos>) {
    super(data);
  }
}

export interface VwmasterplanpagosRelations {
  // describe navigational properties here
}

export type VwmasterplanpagosWithRelations = Vwmasterplanpagos & VwmasterplanpagosRelations;
