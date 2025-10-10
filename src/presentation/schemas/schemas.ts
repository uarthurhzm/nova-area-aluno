import { MAX_FILE_SIZE } from "@/shared/constants/max-file-size";
import z from "zod";

//SECTION - Requerimento de Histórico Escolar
export const ACADEMIC_RECORD_SCHEMA = z.object({
    phone: z.string().min(15, { message: "Informe um telefone válido" }),
    email: z.email({ message: "Informe um email válido" }),
})
//!SECTION

//SECTION - Consulta e Reserva de Livros
export const BOOK_SEARCH_SCHEMA = z.object({
    searchOption: z.string().min(1, { message: "Informe um tipo de pesquisa" }),
    mediaOption: z.string().min(1, { message: "Informe um formato de mídia" }),
    searchQuery: z.string().min(3, { message: "Informe um termo de pesquisa com pelo menos 3 caracteres" }),
})
//!SECTION

//SECTION - Troca de senha
export const CHANGE_PASSWORD_SCHEMA = z.object({
    newPassword: z.string().min(5, { message: "A senha deve ter no mínimo 5 caracteres" }).max(10, { message: "A senha deve ter no máximo 10 caracteres" }),
    confirmPassword: z.string().min(5, { message: "A senha deve ter no mínimo 5 caracteres" }).max(10, { message: "A senha deve ter no máximo 10 caracteres" }),
}).refine((data) => data.newPassword === data.confirmPassword, { message: "As senhas não coincidem", path: ["confirmPassword"] });
//!SECTION

//SECTION - Requerimento de Atestado de Matrícula
export const ENROLLMENT_CERTIFICATE_SCHEMA = z.object({
    phone: z.string().min(15, { message: "Informe um telefone válido" }),
    email: z.email({ message: "Informe um email válido" }),
    documentType: z.string().min(1, { message: "Informe um tipo de atestado" }),
})
//!SECTION

//SECTION - Atividades Extracurriculares
export const EXTRACURRICULAR_ACTIVITY_SCHEMA = z.object({
    activityId: z.string().min(1, { message: "Informe uma atividade" }),
    description: z.string().min(3, { message: "Informe uma descrição com pelo menos 3 caracteres" }),
    startDate: z.string().min(1, { message: "Informe uma data válida" }),
    endDate: z.string().min(1, { message: "Informe uma data válida" }),
    hours: z.string().min(1, { message: "Informe a carga horária" }),
    pdf: z
        .any()
        .refine((file) => file instanceof File, { message: "Selecione um arquivo" })
        .refine(
            (file) => file?.type === "application/pdf",
            { message: "Apenas arquivos PDF são permitidos" }
        )
        .refine(
            (file) => file?.size <= MAX_FILE_SIZE,
            { message: "Arquivo deve ter no máximo 10MB" }
        )
}).refine(
    (data) => {
        if (!data.startDate || !data.endDate) return true;
        return new Date(data.startDate) <= new Date(data.endDate);
    },
    {
        message: "Data de início deve ser anterior ou igual à data de término",
        path: ["startDate"]
    }
)
//!SECTION

//SECTION - Login
export const LOGIN_SCHEMA = z.object({
    login: z.string().min(1, { message: "Informe o seu login" }),
    password: z.string().min(1, { message: "Informe a sua senha" }),
})
//!SECTION

//SECTION - Enviar uma mensagem
export const NEW_MESSAGE_SCHEMA = z.object({
    professorId: z.string().min(1, { message: "Informe um professor" }),
    subject: z.string().min(3, { message: "Informe um assunto com pelo menos 3 caracteres" }),
    message: z.string().min(6, { message: "Informe uma mensagem com pelo menos 6 caracteres" }),
})
//!SECTION

//SECTION - Presença via local
export const PRESENCE_SCHEMA = z.object({
    unitId: z.string().min(1, { message: "Informe uma unidade" }),
    disciplineId: z.string().min(1, { message: "Informe uma disciplina" }),
    date: z.string().min(1, { message: "Informe uma data válida" }).refine(
        (date) => {
            const today = new Date().toISOString().split('T')[0];
            const inputDate = new Date(date).toISOString().split('T')[0];
            return inputDate === today;
        },
        { message: "A data não pode ser diferente do dia atual" }
    ),
});
//!SECTION

//SECTION - Requerimento de Provas Substitutivas
export const SUBSTITUTE_EXAM_SCHEMA = z.object({
    disciplineId: z.string().min(1, { message: "Selecione uma disciplina" }),
    phone: z.string().min(15, { message: "Informe um telefone válido" }),
    email: z.email({ message: "Informe um email válido" }),
})
//!SECTION

//SECTION - Dados Cadastrais do Aluno
export const USER_INFO_SCHEMA = z.object({
    code: z.string().min(1, { message: "Informe o código" }),
    name: z.string().min(3, { message: "Informe o nome com pelo menos 3 caracteres" }),
    email: z.email({ message: "Informe um e-mail válido" }),
    address: z.string().min(3, { message: "Informe o endereço com pelo menos 3 caracteres" }),
    number: z.string().min(1, { message: "Informe o número, caso não possua informe S/N" }),
    complement: z.string().optional(),
    neighborhood: z.string().min(3, { message: "Informe o bairro com pelo menos 3 caracteres" }),
    city: z.string().min(3, { message: "Informe a cidade com pelo menos 3 caracteres" }),
    rg: z.string().min(9, { message: "Informe um RG válido" }),
    cpf: z.string().min(11, { message: "Informe um CPF válido" }),
    birthdate: z.string().min(10, { message: "Informe uma data de nascimento válida" }),
    comercialPhone: z.string().min(10, { message: "Informe um telefone comercial válido" }).optional(),
    residentialPhone: z.string().min(10, { message: "Informe um telefone residencial válido" }).optional(),
    phone: z.string().min(10, { message: "Informe um telefone de celular válido" }),
})
//!SECTION

//SECTION - Solicitação de recuperação de senha
export const PASSWORD_RECOVERY_SCHEMA = z.object({
    cpf: z.string().min(14, { message: "Informe um CPF válido" }),
})
//!SECTION

//SECTION - Comentários em Mensagens enviadas
export const COMMENTS_MESSAGE_SCHEMA = z.object({
    comment: z.string().min(1, { message: "O comentário não pode ser vazio" }),
})
//!SECTION