
import type { StudentAbsencesResponseDTO } from "@/application/dto/student-absences-response-dto";
import type { StudentAcademicWeekResponseDTO } from "@/application/dto/student-academic-week-response-dto";
import type { StudentCardResponseDTO } from "@/application/dto/student-card-response-dto";
import type { StudentDisciplinesContentResponseDTO } from "@/application/dto/student-disciplines-content-response";
import type { StudentDisciplinesResponseDTO } from "@/application/dto/student-disciplines-response-dto";
import type { StudentDocumentsPermissionResponseDTO } from "@/application/dto/student-documents-permission-response-dto";
import type { StudentDocumentsResponseDTO } from "@/application/dto/student-documents-response-dto";
import type { StudentSubstituteDisciplinesResponseDTO } from "@/application/dto/student-dp-disciplines-response-dto";
import type { StudentExtensionCertificateResponseDTO } from "@/application/dto/student-extension-certificate-response-dto";
import type { StudentGradesResponseDTO } from "@/application/dto/student-grades-response-dto";
import type { StudentListenerMeetingResponseDTO } from "@/application/dto/student-listener-meeting-response-dto";
import type { StudentProfessorsResponseDTO } from "@/application/dto/student-professors-response-dto";
import type { StudentScientificMeetingResponseDTO } from "@/application/dto/student-scientific-meeting-response-dto";
import type { StudentSyllabusResponseDTO } from "@/application/dto/student-syllabus-response-dto";
import type { TicketResponseDTO } from "@/application/dto/ticket-response-dto";
import type { UserInfoResponseDTO } from "@/application/dto/user-info-response-dto";
import type { AxiosInstance } from "axios";
import type { UserEntity } from "../entities/user-entity";
import type { PostPresenceDTO } from "@/application/dto/post-presence-dto";

export class StudentRepository {
    private api: AxiosInstance;

    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async getStudent(cd_mat: string): Promise<UserInfoResponseDTO> {
        const response = await this.api.get(`/student/${cd_mat.toString().trim()}`);
        return response.data
    }

    async getStudentCard(cd_mat: string): Promise<StudentCardResponseDTO> {
        const response = await this.api.get(`/student/${cd_mat.toString().trim()}/card-info`);
        return response.data
    }

    async getStudentDisciplines(userData: UserEntity): Promise<StudentDisciplinesResponseDTO[]> {
        const response = await this.api.get<StudentDisciplinesResponseDTO[]>(`/student/${userData.CD_MAT.toString().trim()}/disciplines`, {
            params: {
                ano: userData.ANOVAL_MAT,
                sem: userData.SEMVAL_MAT
            }
        });
        return response.data;
    }

    async getStudentSubstituteDisciplines(cd_mat: number): Promise<StudentSubstituteDisciplinesResponseDTO[]> {
        const response = await this.api.get<StudentSubstituteDisciplinesResponseDTO[]>(`/student/${cd_mat.toString().trim()}/sub-disciplines`);
        return response.data;
    }


    async getStudentByPassword(cd_mat: number, password: string): Promise<boolean> {
        const response = await this.api.get<boolean>(`/student/${cd_mat.toString().trim()}/by-password`, {
            params: {
                password: password
            }
        });
        return response.data;
    }

    async postPresence(data: PostPresenceDTO): Promise<{ message: string }> {
        return await this.api.post(`/student/${data.cd_mat.toString().trim()}/presence`, data);
    }

    async getStudentGrades(cd_mat: number): Promise<StudentGradesResponseDTO[]> {
        const response = await this.api.get<StudentGradesResponseDTO[]>(`/student/${cd_mat.toString().trim()}/grades`);
        return response.data;
    }

    async getStudentAbsences(cd_mat: number): Promise<StudentAbsencesResponseDTO[]> {
        const response = await this.api.get<StudentAbsencesResponseDTO[]>(`/student/${cd_mat.toString().trim()}/absences`);
        return response.data;
    }

    async getStudentDocuments(cd_mat: number): Promise<StudentDocumentsResponseDTO> {
        const response = await this.api.get<StudentDocumentsResponseDTO>(`/student/${cd_mat.toString().trim()}/documents`);
        return response.data;
    }

    async getStudentDisciplinesSyllabus(cd_mat: number): Promise<StudentSyllabusResponseDTO[]> {
        const response = await this.api.get<StudentSyllabusResponseDTO[]>(`/student/${cd_mat.toString().trim()}/disciplines-syllabus`);
        return response.data;
    }

    async getStudentProfessors(userData: UserEntity): Promise<StudentProfessorsResponseDTO[]> {
        const response = await this.api.get<StudentProfessorsResponseDTO[]>(`/student/${userData.CD_MAT.toString().trim()}/professors`);
        return response.data;
    }

    async patchStudentPassword(cd_mat: number, newPassword: string): Promise<void> {
        await this.api.patch(`/student/${cd_mat.toString().trim()}/password`, {
            newPassword: newPassword
        });
    }

    async getDisciplineContent(login: number, cd_disc: number): Promise<StudentDisciplinesContentResponseDTO[]> {
        const response = await this.api.get<StudentDisciplinesContentResponseDTO[]>(`/student/${login}/disciplines/${cd_disc}/content`);
        return response.data;
    }

    async getExtensionCertificates(login: number): Promise<StudentExtensionCertificateResponseDTO[]> {
        const response = await this.api.get<StudentExtensionCertificateResponseDTO[]>(`/student/${login}/extension-certificates`);
        return response.data;
    }

    async getScientificMeetingCertificates(cd_mat: number): Promise<StudentScientificMeetingResponseDTO[]> {
        const response = await this.api.get<StudentScientificMeetingResponseDTO[]>(`/student/${cd_mat.toString().trim()}/scientific-meeting`);
        return response.data;
    }

    async getStudentListenerMeetingCertificates(cd_mat: number): Promise<StudentListenerMeetingResponseDTO[]> {
        const response = await this.api.get<StudentListenerMeetingResponseDTO[]>(`/student/${cd_mat.toString().trim()}/listener-meeting`);
        return response.data;
    }

    async getStudentAcademicWeekCertificates(cd_mat: number): Promise<StudentAcademicWeekResponseDTO[]> {
        const response = await this.api.get<StudentAcademicWeekResponseDTO[]>(`/student/${cd_mat.toString().trim()}/academic-week`);
        return response.data;
    }

    async getTicket(cd_mat: string): Promise<TicketResponseDTO> {
        const response = await this.api.get<TicketResponseDTO>(`/student/${cd_mat.toString().trim()}/ticket`);
        return response.data;
    }

    async getStudentDocumentsPermission(cd_mat: number): Promise<StudentDocumentsPermissionResponseDTO> {
        const response = await this.api.get<StudentDocumentsPermissionResponseDTO>(`/secretary/student/${cd_mat.toString().trim()}/documents/permission`);
        return response.data;
    }


}