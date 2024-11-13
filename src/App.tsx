import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import HomePage from "./pages/HomePage"
import AdminPage from "./pages/AdminPage"
import UsersPage from "./pages/UsersPage"
import CreateUserPage from "./pages/CreateUserPage"
import InstitutesPage from "./pages/InstitutesPage"
import CreateIstitutePage from "./pages/CreateIstitutePage"
import EditUserPage from "./pages/EditUserPage"
import EditInstitutePage from "./pages/EditInstitutePage"


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
          <Route path="/admin/users/:id" element={<EditUserPage />} />

          <Route path="/admin/institutes" element={<InstitutesPage />} />
          <Route path="/admin/institutes/create" element={<CreateIstitutePage />} />
          <Route path="/admin/institutes/:id" element={<EditInstitutePage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
