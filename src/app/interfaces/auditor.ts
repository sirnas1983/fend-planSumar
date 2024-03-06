export interface AuditorDTO {
    id: string;
    fechaCreacion: string; // Puedes usar 'string' o definir un tipo específico para LocalDate si lo necesitas
    fechaModificacion: string; // Puedes usar 'string' o definir un tipo específico para LocalDate si lo necesitas
    creadoPor: string;
    modificadoPor: string;
}
