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

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"


const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/admin" element={<ProtectedRoute role='admin' element={<AdminPage />} />} />

          <Route path="/admin/users" element={<ProtectedRoute role='admin' element={<UsersPage />} />} />
          <Route path="/admin/users/create" element={<ProtectedRoute role='admin' element={<CreateUserPage />} />} />
          <Route path="/admin/users/edit/:id" element={<ProtectedRoute role='admin' element={<EditUserPage />} />} />

          <Route path="/admin/institutes" element={<ProtectedRoute role='admin' element={<InstitutesPage />} />} />
          <Route path="/admin/institutes/create" element={<ProtectedRoute role='admin' element={<CreateIstitutePage />} />} />
          <Route path="/admin/institutes/edit/:id" element={<ProtectedRoute role='admin' element={<EditInstitutePage />} />} />

          <Route path="/admin/courses/:id" element={<ProtectedRoute role='admin' element={<CoursesPage />} />} />
          <Route path="/admin/courses" element={<ProtectedRoute role='admin' element={<CoursesPage />} />} />
          <Route path="/admin/courses/teacher/:id" element={<ProtectedRoute role='admin' element={<CoursesTeacherPage />} />} />
          <Route path="/admin/courses/create" element={<ProtectedRoute role='' element={<CreateCoursePage />} />} /> {/*Для админа и препода */}
          <Route path="/admin/courses/edit/:id" element={<ProtectedRoute role='' element={<EditCoursePage />} />} /> {/*Для админа и препода */}

          <Route path="/admin/couples/:id" element={<ProtectedRoute role='admin' element={<CouplesPage />} />} />
          <Route path="/admin/couples/review/:id" element={<ProtectedRoute role='admin' element={<CoupleReviewPage />} />} />
          <Route path="/admin/couples/create" element={<ProtectedRoute role='' element={<CreateCouplesPage />} />} /> {/*Для админа и препода */}
          <Route path="/admin/couples/edit/:id" element={<ProtectedRoute role='' element={<EditCouplesPage />} />} /> {/*Для админа и препода */}

          <Route path="/teacher" element={<ProtectedRoute role='teacher' element={<TeacherPage />} />} />
          <Route path="/teacher/couples/:id" element={<ProtectedRoute role='teacher' element={<CouplesTeacherPage />} />} />
          <Route path="/teacher/couples/review/:id" element={<ProtectedRoute role='teacher' element={<CoupleTeacherReviewPage />} />} />
          <Route path="/teacher/qr/:id" element={<ProtectedRoute role='teacher' element={<QRPage />} />} />

        </Route>
        <Route path="/form/:id" element={<FormPage />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
