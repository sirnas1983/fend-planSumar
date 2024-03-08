import { Auditor } from "./auditor";

export interface Efector {
    id: string;
    nombre: string;
    cuie: string;
    region: string;
    auditorDTO: Auditor;
    totalHaber: number;
    totalDebe: number;
    saldo: number;
    descripcion: string;
}
