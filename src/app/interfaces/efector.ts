import { AuditorDTO } from "./auditor";

export interface EfectorDTO {
    id: string;
    nombre: string;
    cuie: string;
    region: string;
    auditorDTO: AuditorDTO;
    totalHaber: number;
    totalDebe: number;
    saldo: number;
    descripcion: string;
}
