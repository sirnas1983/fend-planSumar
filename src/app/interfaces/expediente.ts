import { Auditor } from "./auditor";
import { Efector } from "./efector";

export interface Expediente {
    id: string;
    nombre: string;
    numero: string;
    efector: Efector;
    montoSolicitado: number;
    fechaExpediente: string; // Cambia el tipo si es necesario
    auditorDTO: Auditor;
    descripcion: string;
}
