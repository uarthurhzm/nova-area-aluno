import type { StudentDisciplinesResponseDTO } from "@/application/dto/student-disciplines-response-dto";
import { DOCUMENT_OPTIONS } from "./document-options";

export const ATTENDANCE_DOCUMENT_SUBOPTION_ID = 30;
export const ATTENDANCE_DISCIPLINES_SUBOPTION_ID = 31;

export const getSubjectsWithSuboptions = (disciplines: StudentDisciplinesResponseDTO[]) => [
    {
        subject: ATTENDANCE_DOCUMENT_SUBOPTION_ID,
        options: DOCUMENT_OPTIONS
    },
    {
        subject: ATTENDANCE_DISCIPLINES_SUBOPTION_ID,
        options: disciplines.map((discipline) => ({
            id: discipline.ID_DISC,
            name: discipline.NM_DISC
        }))
    }
];