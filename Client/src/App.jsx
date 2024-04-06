import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Redirect from './Pages/Redirect'
import LoginPage from './Pages/Login'
import SignupPage from './Pages/SIgnup'
import Dashboard from './Pages/Doctor/Dashboard'
import RadioDashboard from './Pages/Radiologist/Dashboard'
import AlertState from './Context/Alert/AlertState'
import Alert from './Components/Alert'
import Forgetpassword from './Pages/ForgetPassword'

function App() {

  return (
    <>
      <BrowserRouter>
        <AlertState>
          <Alert/>
          <Routes>
            <Route path="/" element={<Redirect />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/forgetpassword" element={<Forgetpassword />}></Route>
            <Route path="/docDashboard/*" element={<Dashboard />}></Route>
            <Route path="/radioDashboard/*" element={<RadioDashboard />}></Route>
          </Routes>
        </AlertState>
      </BrowserRouter>
    </>
  )
}

export default App
