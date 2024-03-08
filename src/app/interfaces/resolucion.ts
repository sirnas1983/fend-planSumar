import { Auditor } from "./auditor";
import { Expediente } from "./expediente";


export interface Resolucion {
  id: string;
  nombre: string;
  numero: string;
  expedienteDTO: Expediente;
  montoOtorgado: number;
  fechaResolucion: string;
  auditorDTO: Auditor;
  descripcion: string;
}
