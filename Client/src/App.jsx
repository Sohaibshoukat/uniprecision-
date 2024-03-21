import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Redirect from './Pages/Redirect'
import LoginPage from './Pages/Login'
import SignupPage from './Pages/SIgnup'
import Dashboard from './Pages/Doctor/Dashboard'
import RadioDashboard from './Pages/Radiologist/Dashboard'
import ReportDetails from './Components/Doctors/ReportDetails'
import FillReport from './Components/Radiologist/FillReport'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Redirect />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/docDashboard/*" element={<Dashboard />}></Route>
          {/* <Route path="/docDashboard/ReportDetail" element={<ReportDetails />}></Route> */}
          <Route path="/radioDashboard/*" element={<RadioDashboard />}></Route>
          {/* <Route path="/radioDashboard/FillForm" element={<FillReport />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
