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
          <Route path="/admin/courses/create" element={<CreateCoursePage />} />
          <Route path="/admin/courses/edit/:id" element={<EditCoursePage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
