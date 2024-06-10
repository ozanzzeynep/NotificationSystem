import React, { ReactElement } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

import Dashboard from './pages/homepage/Homepage';
import { Details } from '@mui/icons-material';
import SendNotif from './pages/homepage/SendNotification';




function App() :ReactElement{

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path = "/" element = {<Login/>}/>
        <Route path = "/system" element = {<Dashboard/>}/>
        <Route path = "/details" element = {<Details/>}/>
        <Route path = "/modal" element = {<SendNotif/>}/>
      </Routes>
    </Router>
  );
}

export default App;
