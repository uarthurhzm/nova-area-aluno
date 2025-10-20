import type { DeleteExamRequestDTO } from "@/application/dto/delete-exam-request-dto";
import type { PostAcademicRecordRequestDTO } from "@/application/dto/post-academic-record-request-dto";
import type { PostEnrollmentCertificateDTO } from "@/application/dto/post-enrollment-certificate-dto";
import type { StudentAcademicRecordResponseDTO } from "@/application/dto/student-academic-record-response-dto";
import type { StudentAttestsResponseDTO } from "@/application/dto/student-attests-response-dto";
import type { StudentSubstituteExamResponseDTO } from "@/application/dto/student-substitute-exam-response-dto";
import type { AxiosInstance } from "axios";
import { SecretaryRepository } from "../repositories/secretary-repository";
import type { StudentDpsResponseDTO } from "@/application/dto/student-dps-response-dto";
import type { PostSubstituteExamRequestDTO } from "@/application/dto/post-substitute-exam-request-dto";
import type { GetAllSectorsResponseDTO } from "@/application/dto/get-all-sectors-response-dto";
import type { GetProtocolTypesBySectorResponseDTO } from "@/application/dto/get-protocol-types-by-sector-response-dto";
import type { PostAttendanceRequestDTO } from "@/application/dto/post-attendance-resquest-dto";


export class SecretaryService {
    private secretarysRepository: SecretaryRepository;

    constructor(api: AxiosInstance) {
        this.secretarysRepository = new SecretaryRepository(api);
    }

    async getStudentEnrollmentCertificates(cd_mat: number) {
        return this.secretarysRepository.getStudentEnrollmentCertificates(cd_mat);
    }

    async postEnrollmentCertificateRequest(data: PostEnrollmentCertificateDTO): Promise<void> {
        return this.secretarysRepository.postEnrollmentCertificateRequest(data);
    }

    async getStudentAttests(cd_mat: number): Promise<StudentAttestsResponseDTO[]> {
        return this.secretarysRepository.getStudentAttests(cd_mat);
    }

    async getStudentAcademicRecords(cd_mat: number): Promise<StudentAcademicRecordResponseDTO[]> {
        return this.secretarysRepository.getStudentAcademicRecords(cd_mat);
    }

    async postAcademicRecordRequest(data: PostAcademicRecordRequestDTO): Promise<void> {
        return this.secretarysRepository.postAcademicRecordRequest(data);
    }

    async getStudentSubstituteExams(cd_mat: number): Promise<StudentSubstituteExamResponseDTO[]> {
        return this.secretarysRepository.getStudentSubstituteExams(cd_mat);
    }

    async postSubstituteExamRequest(data: PostSubstituteExamRequestDTO): Promise<void> {
        return this.secretarysRepository.postSubstituteExamRequest(data);
    }

    async deleteSubstituteExamRequest(data: DeleteExamRequestDTO): Promise<void> {
        return this.secretarysRepository.deleteSubstituteExamRequest(data);
    }

    async getStudentDependencies(cd_mat: number): Promise<StudentDpsResponseDTO[]> {
        return this.secretarysRepository.getStudentDependencies(cd_mat);
    }

    async getAllSectors(): Promise<GetAllSectorsResponseDTO[]> {
        return this.secretarysRepository.getAllSectors();
    }

    async getProtocolTypesBySector(cd_set: number): Promise<GetProtocolTypesBySectorResponseDTO[]> {
        if (cd_set <= 0) {
            return [];
        }
        return this.secretarysRepository.getProtocolTypesBySector(cd_set);
    }

    async postAttendanceRequest(data: PostAttendanceRequestDTO): Promise<void> {
        const formData = new FormData();
        formData.append('cd_alu', data.cd_alu.toString());
        formData.append('cd_cso', data.cd_cso.toString());
        formData.append('anoval_mat', data.anoval_mat.toString());
        formData.append('semval_mat', data.semval_mat.toString());
        formData.append('serie_mat', data.serie_mat.toString());
        formData.append('periodo_mat', data.periodo_mat.toString());
        formData.append('sector', data.sector.toString());
        formData.append('subject', data.subject.toString());
        formData.append('requestType', data.requestType?.toString() ?? '');
        formData.append('disciplineIds', JSON.stringify(data.disciplineIds));
        formData.append('documentId', data.documentId?.toString() ?? '');
        formData.append('description', data.description);
        if (data.attachments && Array.isArray(data.attachments)) {
            data.attachments.forEach((file) => {
                formData.append('attachments', file);
            });
        }

        return this.secretarysRepository.postAttendanceRequest(formData as unknown as PostAttendanceRequestDTO);
    }
}