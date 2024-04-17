import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import LoginPage from './components/pages/LoginPage'

import './App.css';
import Dashboard from './components/pages/Dashboard';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

const Footer = () => {
  return (
    <p className="text-center" style={FooterStyle}>Designed & coded by Harrison Zhou</p>
  )
}

const FooterStyle = {
  background: "#222",
  fontSize: ".8rem",
  color: "#fff",
  position: "absolute",
  bottom: 0,
  padding: "1rem",
  margin: 0,
  width: "100%",
  opacity: ".5"
}

export default App;
