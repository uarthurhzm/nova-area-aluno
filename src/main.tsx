import { StrictMode, type JSX } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import AppRouter from './presentation/components/app-router'
import { AuthProvider } from './presentation/contexts/AuthContext'
import { ToastProvider } from './presentation/contexts/ToastContext'
import { useTheme } from './presentation/hooks/use-theme'
import AcademicRecordPage from './presentation/pages/academic-record-page'
import AcademicWeekPage from './presentation/pages/academic-week-page'
import BilletPage from './presentation/pages/billet-page'
import BookRenewalPage from './presentation/pages/book-renewal-page'
import BookReservationPage from './presentation/pages/book-reservation-page'
import CareerOpportunitiesPage from './presentation/pages/career-opportunities-page'
import ChangePasswordPage from './presentation/pages/change-password-page'
import CPAFormPage from './presentation/pages/cpa-form-page'
import CPAInformationPage from './presentation/pages/cpa-information-page'
import CpaPage from './presentation/pages/cpa-page'
import DownloadsPage from './presentation/pages/downloads-page'
import EnrollmentCertificatePage from './presentation/pages/enrollment-certificate-page'
import ExtensionCertificatePage from './presentation/pages/extension-certificate-page'
import ExtracurricularPage from './presentation/pages/extracurricular-page'
import FinancialStatementPage from './presentation/pages/financial-statement-page'
import GradesPage from './presentation/pages/grades-page'
import HomePage from './presentation/pages/home-page'
import IESProfessorsPage from './presentation/pages/ies-professors-page'
import LibraryPage from './presentation/pages/library-page'
import LoginPage from './presentation/pages/login-page'
import ManualsPage from './presentation/pages/manuals-page'
import MessagesPage from './presentation/pages/messages-page'
import NewMessagePage from './presentation/pages/new-message-page'
import NoticeBoardPage from './presentation/pages/notice-board-page'
import PresencePage from './presentation/pages/presence-page'
import ProfilePage from './presentation/pages/profile-page'
import RemedialCourseRequestPage from './presentation/pages/remedial-course-request-page'
import ReservedBooksPage from './presentation/pages/reserved-books-page'
import SchedulePage from './presentation/pages/schedule-page'
import ScientificMeetingPage from './presentation/pages/scientific-meeting-page'
import SentReceivedMessagesPage from './presentation/pages/sent-received-messages-page'
import ServicePage from './presentation/pages/service-page'
import StudentCardPage from './presentation/pages/student-card-page'
import StudentPage from './presentation/pages/student-page'
import StudentSchedulePage from './presentation/pages/student-schedule-page'
import SubstituteExamsPage from './presentation/pages/substitute-exams-page'
import SyllabusPage from './presentation/pages/syllabus-page'
import TaxesPage from './presentation/pages/taxes-page'
import UserInfoPage from './presentation/pages/user-info-page'
import { ROUTES } from './shared/constants/router'
import AttendanceRequestPage from './presentation/pages/attendance-request-page'

function Main(): JSX.Element {
  useTheme();

  return (
    <StrictMode>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>

              <Route path={ROUTES.login} element={<LoginPage />} />


              <Route element={<AppRouter isPrivate={true} />}>
                <Route path={ROUTES.home} element={<HomePage />} />
                <Route path={ROUTES.student} element={<StudentPage />} />
                <Route path={ROUTES.service} element={<ServicePage />} />
                <Route path={ROUTES.library} element={<LibraryPage />} />
                <Route path={ROUTES.bookReservation} element={<BookReservationPage />} />
                <Route path={ROUTES.bookRenewal} element={<BookRenewalPage />} />
                <Route path={ROUTES.reserved} element={<ReservedBooksPage />} />
                <Route path={ROUTES.messages} element={<MessagesPage />} />
                <Route path={ROUTES.profile} element={<ProfilePage />} />
                <Route path={ROUTES.studentId} element={<StudentCardPage />} />
                <Route path={ROUTES.userInfo} element={<UserInfoPage />} />
                <Route path={ROUTES.changePassword} element={<ChangePasswordPage />} />
                <Route path={ROUTES.opportunities} element={<CareerOpportunitiesPage />} />
                <Route path={ROUTES.cpa} element={<CpaPage />} />
                <Route path={ROUTES.cpaInformation} element={<CPAInformationPage />} />
                <Route path={ROUTES.cpaForm} element={<CPAFormPage />} />
                <Route path={ROUTES.newMessage} element={<NewMessagePage />} />
                <Route path={ROUTES.sent} element={<SentReceivedMessagesPage context="sent" />} />
                <Route path={ROUTES.inbox} element={<SentReceivedMessagesPage context="received" />} />
                <Route path={ROUTES.noticeBoard} element={<NoticeBoardPage />} />
                <Route path={ROUTES.presence} element={<PresencePage />} />
                <Route path={ROUTES.schedule} element={<SchedulePage />} />
                <Route path={ROUTES.grades} element={<GradesPage />} />
                <Route path={ROUTES.studentSchedule} element={<StudentSchedulePage />} />
                <Route path={ROUTES.syllabus} element={<SyllabusPage />} />
                <Route path={ROUTES.extracurricularActivities} element={<ExtracurricularPage />} />
                <Route path={ROUTES.attendanceRequest} element={<AttendanceRequestPage />} />
                <Route path={ROUTES.enrollmentCertificate} element={<EnrollmentCertificatePage />} />
                <Route path={ROUTES.manuals} element={<ManualsPage />} />
                <Route path={ROUTES.downloads} element={<DownloadsPage />} />
                <Route path={ROUTES.professors} element={<IESProfessorsPage />} />
                <Route path={ROUTES.extensionCertificate} element={<ExtensionCertificatePage />} />
                <Route path={ROUTES.scientificMeeting} element={<ScientificMeetingPage />} />
                <Route path={ROUTES.academicWeek} element={<AcademicWeekPage />} />
                <Route path={ROUTES.billet} element={<BilletPage />} />
                <Route path={ROUTES.financialStatement} element={<FinancialStatementPage />} />
                <Route path={ROUTES.taxesAndFees} element={<TaxesPage />} />
                <Route path={ROUTES.academicRecord} element={<AcademicRecordPage />} />
                <Route path={ROUTES.substituteExams} element={<SubstituteExamsPage />} />
                <Route path={ROUTES.remedialCourseRequest} element={<RemedialCourseRequestPage />} />
              </Route>

              <Route index element={<LoginPage />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')!).render(<Main />)
