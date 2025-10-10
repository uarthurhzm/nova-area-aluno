import { ROUTES } from "@/shared/constants/router";
import type { PageItemsProps } from "@/shared/types/common-types";
import { CALENDAR_URL } from "./calendar-url";

export const PAGE_ITEMS: PageItemsProps[] = [
    {
        route: ROUTES.home,
        options: [
            {
                name: "Mural de Recados",
                image: "https://img.icons8.com/?size=100&id=35067&format=png&color=000000",
                route: ROUTES.noticeBoard,
                description: "Veja comunicados e avisos importantes.",
                gradient: "bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-900"
            },
            {
                name: "Marcar Presença",
                image: "https://img.icons8.com/?id=zSZ4mlKW8DSR&format=png",
                route: ROUTES.presence,
                description: "Registre sua presença nas aulas de forma rápida e segura.",
                gradient: "bg-gradient-to-br from-green-500 via-green-600 to-emerald-700"
            },
            {
                name: "Calendário Acadêmico",
                image: "https://img.icons8.com/?id=23&format=png",
                route: CALENDAR_URL,
                description: "Consulte datas importantes do semestre letivo.",
                gradient: "bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700"
            },
            {
                name: "Agenda de eventos",
                image: "https://img.icons8.com/?id=H6LtluKL4nwE&format=png",
                route: ROUTES.schedule,
                description: "Veja todos os eventos acadêmicos programados.",
                gradient: "bg-gradient-to-br from-red-500 via-red-600 to-red-700"
            }
        ]
    },
    {
        route: ROUTES.student,
        options: [
            {
                name: "Boletim / Faltas",
                image: "https://img.icons8.com/ios-filled/50/000000/report-card.png",
                route: ROUTES.grades,
                description: "Acompanhe suas notas e faltas em cada disciplina.",
                gradient: "bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-700"
            },
            {
                name: "Horários & Avaliações",
                image: "https://img.icons8.com/?id=3524&format=png",
                route: ROUTES.studentSchedule,
                description: "Consulte seus horários de aula e datas de provas.",
                gradient: "bg-gradient-to-br from-pink-500 via-pink-600 to-pink-700"
            },
            {
                name: "Ementário",
                image: "https://img.icons8.com/ios-filled/50/000000/document--v1.png",
                route: ROUTES.syllabus,
                description: "Veja os conteúdos programáticos das disciplinas.",
                gradient: "bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-700"
            },
            {
                name: "Atividades Complementares",
                image: "https://img.icons8.com/ios-filled/50/000000/task.png",
                route: ROUTES.extracurricularActivities,
                description: "Gerencie e envie suas atividades complementares.",
                gradient: "bg-gradient-to-br from-orange-500 via-orange-600 to-amber-700"
            },
            {
                name: "Certificados",
                image: "https://img.icons8.com/ios-filled/50/000000/certificate.png",
                subOptions: [
                    {
                        name: "Curso de Extensão",
                        image: "https://img.icons8.com/?size=100&id=77452&format=png&color=000000",
                        route: ROUTES.extensionCertificate,
                        description: "Acesse certificados de cursos de extensão realizados.",
                        gradient: "bg-gradient-to-br from-cyan-500 via-cyan-600 to-blue-700"
                    },
                    {
                        name: "Encontro Científico",
                        image: "https://img.icons8.com/ios-filled/50/000000/conference.png",
                        route: ROUTES.scientificMeeting,
                        description: "Veja certificados de participação em encontros científicos.",
                        gradient: "bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700"
                    },
                    {
                        name: "Semana Acadêmica",
                        image: "https://img.icons8.com/ios-filled/50/000000/education.png",
                        route: ROUTES.academicWeek,
                        description: "Consulte certificados das semanas acadêmicas.",
                        gradient: "bg-gradient-to-br from-pink-500 via-pink-600 to-red-700"
                    }
                ]
            },
            {
                name: "Materiais de Aula / Downloads",
                image: "https://img.icons8.com/ios-filled/50/000000/download.png",
                route: ROUTES.downloads,
                description: "Baixe materiais e arquivos disponibilizados pelos professores.",
                gradient: "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-900"
            },
            {
                name: "Professores da IES (diretório)",
                image: "https://img.icons8.com/ios-filled/50/000000/teacher.png",
                route: ROUTES.professors,
                description: "Consulte o diretório dos professores da instituição.",
                gradient: "bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-900"
            },
            {
                name: "Manuais & Editais (acadêmicos)",
                image: "https://img.icons8.com/ios-filled/50/000000/manual.png",
                route: ROUTES.manuals,
                description: "Acesse manuais e editais acadêmicos importantes.",
                gradient: "bg-gradient-to-br from-gray-500 via-gray-600 to-gray-900"
            },
            {
                name: "Perfil Acadêmico",
                image: "https://img.icons8.com/?id=38833&format=png",
                route: "https://docs.google.com/forms/d/1SZwCE_04Ad0IfHsRNYjaQmhaqdscw22Z_wLzZGgo6a8",
                description: "Atualize ou consulte seu perfil acadêmico.",
                gradient: "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700"
            }
        ]
    },
    {
        route: ROUTES.service,
        options: [
            {
                name: "Financeiro",
                image: "https://img.icons8.com/ios-filled/50/000000/money.png",
                description: "Gerencie pagamentos, extratos e taxas.",
                gradient: "bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-700",
                subOptions: [
                    {
                        name: "Pagar: Boleto / Cartão / Pix",
                        image: "https://img.icons8.com/ios-filled/50/000000/money-transfer.png",
                        route: ROUTES.billet,
                        description: "Realize pagamentos via boleto, cartão ou Pix.",
                        gradient: "bg-gradient-to-br from-green-500 via-green-600 to-green-900"
                    },
                    {
                        name: "Extrato Financeiro",
                        image: "https://img.icons8.com/?size=100&id=AS9mglFTvNkQ&format=png&color=000000",
                        route: ROUTES.financialStatement,
                        description: "Consulte o extrato financeiro detalhado.",
                        gradient: "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-900"
                    },
                    {
                        name: "Taxas e Emolumentos",
                        image: "https://img.icons8.com/ios-filled/50/000000/coins.png",
                        route: ROUTES.taxesAndFees,
                        description: "Veja informações sobre taxas e emolumentos.",
                        gradient: "bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-900"
                    }
                ]
            },
            {
                name: "Secretaria",
                image: "https://img.icons8.com/ios-filled/50/000000/office.png",
                description: "Solicite documentos e serviços da secretaria.",
                gradient: "bg-gradient-to-br from-gray-500 via-gray-600 to-gray-900",
                subOptions: [
                    {
                        name: "Atestado de Matrícula",
                        image: "https://img.icons8.com/ios-filled/50/000000/certificate.png",
                        route: ROUTES.enrollmentCertificate,
                        description: "Solicite seu atestado de matrícula.",
                        gradient: "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-900"
                    },
                    {
                        name: "Histórico Escolar",
                        image: "https://img.icons8.com/?size=100&id=58761&format=png&color=000000",
                        route: ROUTES.academicRecord,
                        description: "Acesse seu histórico escolar completo.",
                        gradient: "bg-gradient-to-br from-teal-500 via-teal-600 to-teal-900"
                    },
                    {
                        name: "Provas Substitutivas",
                        image: "https://img.icons8.com/ios-filled/50/000000/test-passed.png",
                        route: ROUTES.substituteExams,
                        description: "Solicite provas substitutivas.",
                        gradient: "bg-gradient-to-br from-red-500 via-red-600 to-red-900"
                    },
                    {
                        name: "Requerimento de Matrícula Online",
                        image: "https://img.icons8.com/?size=100&id=2bMQJZQif7nl&format=png&color=000000",
                        route: "https://apps.unilago.edu.br/rematricula/public/",
                        description: "Faça seu requerimento de matrícula online.",
                        gradient: "bg-gradient-to-br from-purple-500 via-purple-600 to-purple-900"
                    },
                    {
                        name: "Requerimento de DPS",
                        image: "https://img.icons8.com/ios-filled/50/000000/request-service.png",
                        route: ROUTES.remedialCourseRequest,
                        description: "Solicite disciplinas em dependência (DPS).",
                        gradient: "bg-gradient-to-br from-orange-500 via-orange-600 to-orange-900"
                    },
                    {
                        name: "Manuais & Editais (institucionais)",
                        image: "https://img.icons8.com/ios-filled/50/000000/manual.png",
                        route: ROUTES.manuals,
                        description: "Acesse manuais e editais institucionais.",
                        gradient: "bg-gradient-to-br from-gray-500 via-gray-600 to-gray-900"
                    }
                ]
            }
        ]
    },
    {
        route: ROUTES.library,
        options: [
            {
                name: "Consulta & Reserva",
                image: "https://img.icons8.com/ios-filled/50/000000/search.png",
                route: ROUTES.bookReservation,
                description: "Consulte e reserve livros da biblioteca.",
                gradient: "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-900"
            },
            {
                name: "Renovação",
                image: "https://img.icons8.com/ios-filled/50/000000/refresh.png",
                route: ROUTES.bookRenewal,
                description: "Renove seus empréstimos de livros.",
                gradient: "bg-gradient-to-br from-green-500 via-green-600 to-green-900"
            },
            {
                name: "Minhas Reservas",
                image: "https://img.icons8.com/ios-filled/50/000000/bookmark-ribbon.png",
                route: ROUTES.reserved,
                description: "Veja todos os livros reservados por você.",
                gradient: "bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-900"
            },
            {
                name: "Minha Biblioteca Virtual",
                image: "https://img.icons8.com/ios-filled/50/000000/books.png",
                route: "https://grupoau.com.br/moodle/mod/lti/launch.php?id=18328&amp;triggerview=0",
                description: "Acesse a biblioteca virtual da instituição.",
                gradient: "bg-gradient-to-br from-purple-500 via-purple-600 to-purple-900"
            },
            {
                name: "Biblioteca Pearson Virtual",
                image: "https://img.icons8.com/ios-filled/50/000000/open-book.png",
                route: "https://grupoau.com.br/moodle/mod/lti/launch.php?id=18328&amp;triggerview=0",
                description: "Acesse a biblioteca virtual Pearson.",
                gradient: "bg-gradient-to-br from-cyan-500 via-cyan-600 to-blue-900"
            }
        ]
    },
    {
        route: ROUTES.messages,
        options: [
            {
                name: "Notificações (Secretaria/Financeiro/...)",
                image: "https://img.icons8.com/ios-filled/50/000000/appointment-reminders--v1.png",
                description: "Receba notificações da secretaria e financeiro.",
                gradient: "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-900",
                subOptions: [
                    {
                        name: "Nova Mensagem",
                        image: "https://img.icons8.com/ios-filled/50/000000/new-message.png",
                        route: ROUTES.newMessage,
                        description: "Envie uma nova mensagem.",
                        gradient: "bg-gradient-to-br from-green-500 via-green-600 to-green-900"
                    }
                ]
            },
            {
                name: "Mensagens internas",
                image: "https://img.icons8.com/ios-filled/50/000000/chat-message.png",
                description: "Acesse suas mensagens internas.",
                gradient: "bg-gradient-to-br from-gray-500 via-gray-600 to-gray-900",
                subOptions: [
                    {
                        name: "Enviadas",
                        image: "https://img.icons8.com/ios-filled/50/000000/sent.png",
                        route: ROUTES.sent,
                        description: "Veja mensagens enviadas.",
                        gradient: "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-900"
                    },
                    {
                        name: "Entrada",
                        image: "https://img.icons8.com/ios-filled/50/000000/inbox.png",
                        route: ROUTES.inbox,
                        description: "Veja mensagens recebidas.",
                        gradient: "bg-gradient-to-br from-green-500 via-green-600 to-green-900"
                    }
                ]
            }
        ]
    },
    {
        route: ROUTES.profile,
        options: [
            {
                name: "Dados Cadastrais",
                image: "https://img.icons8.com/ios-filled/50/000000/user.png",
                route: ROUTES.userInfo,
                description: "Consulte e atualize seus dados pessoais.",
                gradient: "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-900"
            },
            {
                name: "Alterar Senha",
                image: "https://img.icons8.com/ios-filled/50/000000/password.png",
                route: ROUTES.changePassword,
                description: "Altere sua senha de acesso.",
                gradient: "bg-gradient-to-br from-red-500 via-red-600 to-red-900"
            },
            {
                name: "Estágios & Oportunidades",
                image: "https://img.icons8.com/ios-filled/50/000000/opportunity.png",
                route: ROUTES.opportunities,
                description: "Veja oportunidades de estágio e emprego.",
                gradient: "bg-gradient-to-br from-green-500 via-green-600 to-green-900"
            },
            {
                name: "Carteirinha",
                image: "https://img.icons8.com/ios-filled/50/000000/id-verified.png",
                route: ROUTES.studentId,
                description: "Acesse sua carteirinha digital.",
                gradient: "bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-900"
            }
        ]
    },
    {
        route: ROUTES.cpa,
        options: [
            {
                name: "Questionário",
                image: "https://img.icons8.com/?size=100&id=15764&format=png&color=000000",
                route: ROUTES.cpaInformation,
                description: "Participe do questionário de avaliação institucional.",
                gradient: "bg-gradient-to-br from-purple-500 via-purple-600 to-purple-900"
            }
        ]
    }
];