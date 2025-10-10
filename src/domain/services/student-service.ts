
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
import { StudentRepository } from "../repositories/student-repository";
import type { PostPresenceDTO } from "@/application/dto/post-presence-dto";

export class StudentService {
    private studentRepository: StudentRepository;

    constructor(api: AxiosInstance) {
        this.studentRepository = new StudentRepository(api);
    }

    async getStudent(cd_mat: string): Promise<UserInfoResponseDTO> {
        return await this.studentRepository.getStudent(cd_mat);
    }

    async getStudentCard(cd_mat: string): Promise<StudentCardResponseDTO> {
        return await this.studentRepository.getStudentCard(cd_mat);
    }

    async getStudentDisciplines(userData: UserEntity): Promise<StudentDisciplinesResponseDTO[]> {
        return await this.studentRepository.getStudentDisciplines(userData);
    }

    async getStudentSubstituteDisciplines(cd_mat: number): Promise<StudentSubstituteDisciplinesResponseDTO[]> {
        return await this.studentRepository.getStudentSubstituteDisciplines(cd_mat);
    }

    async getStudentByPassword(cd_mat: number, password: string): Promise<boolean> {
        return await this.studentRepository.getStudentByPassword(cd_mat, password);
    }

    async postPresence(data: PostPresenceDTO): Promise<{ message: string }> {
        return await this.studentRepository.postPresence(data);
    }

    async getStudentGrades(cd_mat: number): Promise<StudentGradesResponseDTO[]> {
        return await this.studentRepository.getStudentGrades(cd_mat);
    }

    async getStudentAbsences(cd_mat: number): Promise<StudentAbsencesResponseDTO[]> {
        return await this.studentRepository.getStudentAbsences(cd_mat);
    }

    async getStudentDocuments(cd_mat: number): Promise<StudentDocumentsResponseDTO> {
        return await this.studentRepository.getStudentDocuments(cd_mat);
    }

    async getStudentDisciplinesSyllabus(cd_mat: number): Promise<StudentSyllabusResponseDTO[]> {
        return await this.studentRepository.getStudentDisciplinesSyllabus(cd_mat);
    }

    async getStudentProfessors(userData: UserEntity): Promise<StudentProfessorsResponseDTO[]> {
        return await this.studentRepository.getStudentProfessors(userData);
    }

    async patchStudentPassword(cd_mat: number, newPassword: string): Promise<void> {
        await this.studentRepository.patchStudentPassword(cd_mat, newPassword);
    }

    async getDisciplineContent(login: number, cd_disc: number): Promise<StudentDisciplinesContentResponseDTO[]> {
        return await this.studentRepository.getDisciplineContent(login, cd_disc);
    }

    async getExtensionCertificates(login: number): Promise<StudentExtensionCertificateResponseDTO[]> {
        return await this.studentRepository.getExtensionCertificates(login);
    }

    async getScientificMeetingCertificates(cd_mat: number): Promise<StudentScientificMeetingResponseDTO[]> {
        return await this.studentRepository.getScientificMeetingCertificates(cd_mat);
    }

    async getStudentListenerMeetingCertificates(cd_mat: number): Promise<StudentListenerMeetingResponseDTO[]> {
        return await this.studentRepository.getStudentListenerMeetingCertificates(cd_mat);
    }

    async getStudentAcademicWeekCertificates(cd_mat: number): Promise<StudentAcademicWeekResponseDTO[]> {
        return await this.studentRepository.getStudentAcademicWeekCertificates(cd_mat);
    }

    async getTicket(cd_mat: string): Promise<TicketResponseDTO> {
        return await this.studentRepository.getTicket(cd_mat);
    }

    async getStudentDocumentsPermission(cd_mat: number): Promise<StudentDocumentsPermissionResponseDTO> {
        return await this.studentRepository.getStudentDocumentsPermission(cd_mat);
    }
}