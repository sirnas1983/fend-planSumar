import { Auditor } from "./auditor";
import { Efector } from "./efector";

export interface Expediente {
    id: string;
    nombre: string;
    numero: string;
    efectorDTO: Efector;
    montoSolicitado: number;
    fechaExpediente: string;
    auditorDTO: Auditor;
    descripcion: string;
}
