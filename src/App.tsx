import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { GuestRoute } from './components/GuestRoute'
import { Home } from './pages/Home'
import { Projects } from './pages/Projects'
import { ProjectDetail } from './pages/ProjectDetail'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { AccountHelp } from './pages/AccountHelp'
import { Profile } from './pages/Profile'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="proyectos"
              element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              }
            />
            <Route
              path="proyectos/:slug"
              element={
                <ProtectedRoute>
                  <ProjectDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="perfil"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="login"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />
            <Route
              path="registro"
              element={
                <GuestRoute>
                  <Register />
                </GuestRoute>
              }
            />
            <Route
              path="cuenta"
              element={
                <GuestRoute>
                  <AccountHelp />
                </GuestRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
