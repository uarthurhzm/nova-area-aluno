import { useToast } from "@/presentation/contexts/ToastContext";
import type { DOCUMENT_OPTIONS } from "@/shared/constants/attendance/document-options";
import { useSecretaryService } from "../use-secretary-service";
import { useUser } from "../use-user";

export const usePostAttendanceRequest = () => {
    const { data: student } = useUser();
    const { showSuccess } = useToast();
    const secretaryService = useSecretaryService();

    const postAttendanceRequest = async (option: typeof DOCUMENT_OPTIONS[number]) => {

        if (option.handler == 'postEnrollmentCertificateRequest' || option.handler == 'postAcademicRecordRequest') {
            const data = {
                cd_emp: student?.CD_EMP,
                cd_alu: student?.CD_ALU,
                cd_cso: student?.CD_CSO,
                anoval_mat: student?.ANOVAL_MAT,
                semval_mat: student?.SEMVAL_MAT,
                serie_mat: student?.SERIE,
                period_mat: student?.PER_GDE,
                phone: student?.TEL_CEL,
                email: student?.EMAIL,
                documentType: 'Simples'
            };


            try {
                await secretaryService[option.handler](data);
                showSuccess('Requerimento enviado com sucesso!');
            } catch (error) {
                console.error('Error posting attendance request:', error);
            }
        }
    };

    return {
        postAttendanceRequest
    };
};


// export interface PostAcademicRecordRequestDTO {
//     cd_emp: number;
//     cd_alu: number;
//     cd_cso: number;
//     anoval_mat: number;
//     semval_mat: number;
//     serie_mat: number;
//     period_mat: number;
//     phone: string;
//     email: string;
// }

// export interface PostEnrollmentCertificateDTO {
//     cd_emp: number;
//     cd_alu: number;
//     cd_cso: number;
//     anoval_mat: number;
//     semval_mat: number;
//     serie_mat: number;
//     period_mat: number;
//     documentType: string;
//     phone: string;
//     email: string;
// }

// cd_mat: number;
//     phone: string;
//     email: string;
//     disciplineId: string;
// }
