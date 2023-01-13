import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage  from './components/LandingPage/LandingPage'
import Home from './components/Home/Home'
import Form from './components/Form/Form'
import CountriDetail from './components/CountriDetail/CountriDetail'
import Error from './components/Error/Error'
import Update from './components/UpdateCountri/Update'
import GetActivities from './components/GetAct/GetAct';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/create" element={<Form />} />
          <Route exact path="/countries/:id" element={<CountriDetail />} />
          <Route exact path="/update/:id" element={<Update />} />
          <Route exact path="/activities" element={<GetActivities />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
