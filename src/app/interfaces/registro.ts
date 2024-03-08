export interface Registro {
    id: string;
    fecha: string; // La fecha puede ser de tipo string o puedes utilizar un tipo específico para LocalDate si lo necesitas
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
  