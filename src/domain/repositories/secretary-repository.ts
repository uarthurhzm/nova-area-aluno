import type { DeleteExamRequestDTO } from "@/application/dto/delete-exam-request-dto";
import type { GetAllSectorsResponseDTO } from "@/application/dto/get-all-sectors-response-dto";
import type { PostAcademicRecordRequestDTO } from "@/application/dto/post-academic-record-request-dto";
import type { PostEnrollmentCertificateDTO } from "@/application/dto/post-enrollment-certificate-dto";
import type { PostSubstituteExamRequestDTO } from "@/application/dto/post-substitute-exam-request-dto";
import type { StudentAcademicRecordResponseDTO } from "@/application/dto/student-academic-record-response-dto";
import type { StudentAttestsResponseDTO } from "@/application/dto/student-attests-response-dto";
import type { StudentDpsResponseDTO } from "@/application/dto/student-dps-response-dto";
import type { StudentEnrollmentCertificatesResponseDTO } from "@/application/dto/student-enrollment-certificates-response-dto";
import type { StudentSubstituteExamResponseDTO } from "@/application/dto/student-substitute-exam-response-dto";
import type { AxiosInstance } from "axios";

export class SecretaryRepository {
    private api: AxiosInstance;

    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async getStudentEnrollmentCertificates(cd_mat: number): Promise<StudentEnrollmentCertificatesResponseDTO[]> {
        const response = await this.api.get<StudentEnrollmentCertificatesResponseDTO[]>(`/secretary/student/${cd_mat.toString().trim()}/enrollment-certificates`);
        return response.data;
    }

    async postEnrollmentCertificateRequest(data: PostEnrollmentCertificateDTO): Promise<void> {
        await this.api.post("/secretary/enrollment-certificate/request", data);
    }

    async getStudentAttests(cd_mat: number): Promise<StudentAttestsResponseDTO[]> {
        const response = await this.api.get<StudentAttestsResponseDTO[]>(`/secretary/student-attests/${cd_mat.toString().trim()}`);
        return response.data;
    }

    async getStudentAcademicRecords(cd_mat: number): Promise<StudentAcademicRecordResponseDTO[]> {
        const response = await this.api.get<StudentAcademicRecordResponseDTO[]>(`/secretary/student/${cd_mat.toString().trim()}/academic-record`);
        return response.data;
    }

    async postAcademicRecordRequest(data: PostAcademicRecordRequestDTO): Promise<void> {
        await this.api.post("/secretary/academic-record/request", data);
    }

    async getStudentSubstituteExams(cd_mat: number): Promise<StudentSubstituteExamResponseDTO[]> {
        const response = await this.api.get<StudentSubstituteExamResponseDTO[]>(`/secretary/student/${cd_mat.toString().trim()}/substitute-exams`);
        return response.data;
    }

    async postSubstituteExamRequest(data: PostSubstituteExamRequestDTO): Promise<void> {
        await this.api.post("/secretary/substitute-exam/request", data);
    }

    async deleteSubstituteExamRequest(data: DeleteExamRequestDTO): Promise<void> {
        await this.api.delete(`/secretary/substitute-exam/request/${data.num_prot.toString().trim()}`, {
            params: { cd_mat: data.cd_mat.toString().trim() }
        });
    }

    async getStudentDependencies(cd_mat: number): Promise<StudentDpsResponseDTO[]> {
        const response = await this.api.get<StudentDpsResponseDTO[]>(`/secretary/student/${cd_mat.toString().trim()}/dp`);
        return response.data;
    }

    async getAllSectors(): Promise<GetAllSectorsResponseDTO[]> {
        const response = await this.api.get<GetAllSectorsResponseDTO[]>("/secretary/sectors");
        return response.data;
    }
}