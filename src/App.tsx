import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import HomePage from "./pages/HomePage"
import AdminPage from "./pages/AdminPage"
import UsersPage from "./pages/Users/UsersPage"
import CreateUserPage from "./pages/Users/CreateUserPage"
import InstitutesPage from "./pages/Institutes/InstitutesPage"
import CreateIstitutePage from "./pages/Institutes/CreateIstitutePage"
import EditUserPage from "./pages/Users/EditUserPage"
import EditInstitutePage from "./pages/Institutes/EditInstitutePage"
import CoursesPage from "./pages/Courses/CoursesPage"
import CreateCoursePage from "./pages/Courses/CreateCoursePage"
import EditCoursePage from "./pages/Courses/EditCoursePage"
import TeacherPage from "./pages/TeacherPage"
import CouplesPage from "./pages/Couples/CouplesPage"
import CreateCouplesPage from "./pages/Couples/CreateCouplesPage"
import EditCouplesPage from "./pages/Couples/EditCouplesPage"
import CoursesTeacherPage from "./pages/Courses/CoursesTeacherPage"
import CoupleReviewPage from "./pages/Couples/CoupleReviewPage"
import FormPage from "./pages/FormPage"
import QRPage from "./pages/Couples/QRPage"
import CouplesTeacherPage from "./pages/Couples/CouplesTeacherPage"
import CoupleTeacherReviewPage from "./pages/Couples/CoupleTeacherReviewPage"


const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />

          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/users/create" element={<CreateUserPage />} />
          <Route path="/admin/users/edit/:id" element={<EditUserPage />} />

          <Route path="/admin/institutes" element={<InstitutesPage />} />
          <Route path="/admin/institutes/create" element={<CreateIstitutePage />} />
          <Route path="/admin/institutes/edit/:id" element={<EditInstitutePage />} />

          <Route path="/admin/courses/:id" element={<CoursesPage />} />
          <Route path="/admin/courses/teacher/:id" element={<CoursesTeacherPage />} />
          <Route path="/admin/courses/create" element={<CreateCoursePage />} />
          <Route path="/admin/courses/edit/:id" element={<EditCoursePage />} />

          <Route path="/admin/couples/:id" element={<CouplesPage />} />
          <Route path="/admin/couples/review/:id" element={<CoupleReviewPage />} />
          <Route path="/admin/couples/create" element={<CreateCouplesPage />} />
          <Route path="/admin/couples/edit/:id" element={<EditCouplesPage />} />

          <Route path="/teacher" element={<TeacherPage />} />
          <Route path="/teacher/couples/:id" element={<CouplesTeacherPage />} />
          <Route path="/teacher/couples/review/:id" element={<CoupleTeacherReviewPage />} />
          <Route path="/teacher/qr/:id" element={<QRPage />} />

        </Route>
        <Route path="/form/:id" element={<FormPage />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
