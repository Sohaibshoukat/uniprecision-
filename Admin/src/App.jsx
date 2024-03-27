import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Redirect from './Pages/Redirect';
import Login from './Pages/Login';
import Dashbaord from './Pages/Dashbaord';
import AlertState from './Context/Alert/AlertState';
import Alert from './Component/Alert';

function App() {
  return (
    <>
      <BrowserRouter>
        <AlertState>
          <Alert />
          <div className='overflow-hidden'>
            <Routes>
              <Route path="/" element={<Redirect />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin-dashboard/*" element={<Dashbaord />} /> {/* Using * for sublinks */}
            </Routes>
          </div>
        </AlertState>
      </BrowserRouter>
    </>
  );
}

export default App;
