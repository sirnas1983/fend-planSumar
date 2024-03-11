export interface Registro {
    id: string;
    fecha: string;
    monto: number;
    detalle: string;
    tipoRegistro: TipoRegistro;
    efectorCuie: string;
    descripcion: string;
  }
  
  export enum TipoRegistro {
    DEBE = 'DEBE',
    HABER = 'HABER'
  }
  