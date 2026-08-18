import {Entity, model, property} from '@loopback/repository';
import {db2config} from '../datasources/env';

@model({
  settings: {idInjection: false, db2: {schema: db2config.schema, table: 'COOPESOCIOS'}}
})
export class Coopesocios extends Entity {
  @property({
    type: 'boolean',
    length: 1,
    // precision: ,
    scale: 0,
    db2: {columnName: 'ACTIVO', dataType: 'BOOLEAN', dataLength: 1, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  activo?: boolean;

  @property({
    type: 'string',
    required: true,
    length: 15,
    // precision: ,
    scale: 0,
    // id: 1,
    db2: {columnName: 'CODEMPLEADO', dataType: 'CHARACTER', dataLength: 15, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  codempleado: string;

  @property({
    type: 'string',
    required: true,
    length: 5,
    // precision: ,
    scale: 0,
    db2: {columnName: 'CODPAIS', dataType: 'CHARACTER', dataLength: 5, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  codpais: string;

  @property({
    type: 'string',
    length: 10,
    // precision: ,
    scale: 0,
    db2: {columnName: 'COMPANY', dataType: 'CHARACTER', dataLength: 10, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  company?: string;

  @property({
    type: 'string',
    length: 70,
    // precision: ,
    scale: 0,
    db2: {columnName: 'EMAILEMPLEADO', dataType: 'CHARACTER', dataLength: 70, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  emailempleado?: string;

  @property({
    type: 'string',
    length: 70,
    // precision: ,
    scale: 0,
    db2: {columnName: 'EMAILEMPLEADO2', dataType: 'CHARACTER', dataLength: 70, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  emailempleado2?: string;

  @property({
    type: 'date',
    length: 13,
    // precision: ,
    scale: 12,
    db2: {columnName: 'FECMODIFICACION', dataType: 'TIMESTAMP', dataLength: 13, dataPrecision: undefined, dataScale: 12, nullable: 'Y'},
  })
  fecmodificacion?: string;

  @property({
    type: 'boolean',
    length: 1,
    // precision: ,
    scale: 0,
    db2: {columnName: 'INBLUEPAGES', dataType: 'BOOLEAN', dataLength: 1, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  inbluepages?: boolean;

  @property({
    type: 'boolean',
    length: 1,
    // precision: ,
    scale: 0,
    db2: {columnName: 'ISADMIN', dataType: 'BOOLEAN', dataLength: 1, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  isadmin?: string;

  @property({
    type: 'string',
    required: true,
    length: 70,
    // precision: ,
    scale: 0,
    db2: {columnName: 'NOMBREEMPLEADO', dataType: 'CHARACTER', dataLength: 70, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  nombreempleado: string;

  // Socio-personal fields (migration V11, nullable)
  @property({
    type: 'string',
    length: 1,
    // precision: ,
    scale: 0,
    db2: {columnName: 'TIPDID', dataType: 'CHARACTER', dataLength: 1, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  tipdid?: string;

  @property({
    type: 'string',
    length: 11,
    // precision: ,
    scale: 0,
    db2: {columnName: 'DOCIDE', dataType: 'VARCHAR', dataLength: 11, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  docide?: string;

  @property({
    type: 'string',
    length: 20,
    // precision: ,
    scale: 0,
    db2: {columnName: 'APEPAT', dataType: 'VARCHAR', dataLength: 20, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  apepat?: string;

  @property({
    type: 'string',
    length: 20,
    // precision: ,
    scale: 0,
    db2: {columnName: 'APEMAT', dataType: 'VARCHAR', dataLength: 20, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  apemat?: string;

  @property({
    type: 'string',
    length: 30,
    // precision: ,
    scale: 0,
    db2: {columnName: 'NOMBRE', dataType: 'VARCHAR', dataLength: 30, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  nombre?: string;

  @property({
    type: 'string',
    length: 80,
    // precision: ,
    scale: 0,
    db2: {columnName: 'DIRECC', dataType: 'VARCHAR', dataLength: 80, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  direcc?: string;

  @property({
    type: 'string',
    length: 40,
    // precision: ,
    scale: 0,
    db2: {columnName: 'LOCALI', dataType: 'VARCHAR', dataLength: 40, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  locali?: string;

  @property({
    type: 'string',
    length: 40,
    // precision: ,
    scale: 0,
    db2: {columnName: 'PROVIN', dataType: 'VARCHAR', dataLength: 40, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  provin?: string;

  @property({
    type: 'string',
    length: 40,
    // precision: ,
    scale: 0,
    db2: {columnName: 'DEPART', dataType: 'VARCHAR', dataLength: 40, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  depart?: string;

  @property({
    type: 'string',
    length: 60,
    // precision: ,
    scale: 0,
    db2: {columnName: 'NCOMPL', dataType: 'VARCHAR', dataLength: 60, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  ncompl?: string;

  @property({
    type: 'string',
    length: 50,
    // precision: ,
    scale: 0,
    db2: {columnName: 'NOMBC2', dataType: 'VARCHAR', dataLength: 50, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  nombc2?: string;

  @property({
    type: 'string',
    length: 9,
    // precision: ,
    scale: 0,
    db2: {columnName: 'TELCEL', dataType: 'VARCHAR', dataLength: 9, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  telcel?: string;

  @property({
    type: 'string',
    length: 1,
    // precision: ,
    scale: 0,
    db2: {columnName: 'NACION', dataType: 'CHARACTER', dataLength: 1, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  nacion?: string;

  @property({
    type: 'string',
    length: 6,
    // precision: ,
    scale: 0,
    db2: {columnName: 'CCIUDA', dataType: 'VARCHAR', dataLength: 6, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  cciuda?: string;

  @property({
    type: 'string',
    length: 40,
    // precision: ,
    scale: 0,
    db2: {columnName: 'NOMCON', dataType: 'VARCHAR', dataLength: 40, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  nomcon?: string;

  @property({
    type: 'string',
    length: 8,
    // precision: ,
    scale: 0,
    db2: {columnName: 'DNICY', dataType: 'VARCHAR', dataLength: 8, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  dnicy?: string;

  @property({
    type: 'string',
    length: 1,
    // precision: ,
    scale: 0,
    db2: {columnName: 'ESTCIV', dataType: 'CHARACTER', dataLength: 1, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  estciv?: string;

  @property({
    type: 'string',
    length: 2,
    // precision: ,
    scale: 0,
    db2: {columnName: 'CARGAM', dataType: 'VARCHAR', dataLength: 2, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  cargam?: string;

  @property({
    type: 'string',
    length: 20,
    // precision: ,
    scale: 0,
    db2: {columnName: 'OFICIO', dataType: 'VARCHAR', dataLength: 20, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  oficio?: string;

  @property({
    type: 'string',
    length: 2,
    // precision: ,
    scale: 0,
    db2: {columnName: 'SECTO1', dataType: 'VARCHAR', dataLength: 2, dataPrecision: undefined, dataScale: 0, nullable: 'Y'},
  })
  secto1?: string;

  @property({
    type: 'string',
    //hidden: true,
    required: true,
    length: 40,
    // precision: ,
    scale: 0,
    id: 1,
    db2: {columnName: 'UUID', dataType: 'CHARACTER', dataLength: 40, dataPrecision: undefined, dataScale: 0, nullable: 'N'},
  })
  uuid: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Coopesocios>) {
    super(data);
  }
}

export interface CoopesociosRelations {
  // describe navigational properties here
}

export type CoopesociosWithRelations = Coopesocios & CoopesociosRelations;
