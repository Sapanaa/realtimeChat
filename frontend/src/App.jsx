import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import SignupPage from './pages/Signup/SignupPage'
import LoginPage from './pages/login/LoginPage'
import LogoutPage from './pages/logout/LogoutPage'
import { useAuthStore } from './store/useAuthStore'
function App() {
  const {authuser} = useAuthStore
  return (
    <>
    <Navbar/>
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/logout" element={<LogoutPage/>} />
    </Routes>
    </>
  )
}

export default App
