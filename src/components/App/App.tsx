import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Dashboard from '../Dashboard';
import Login from '../Login';
import './App.css';

const App: React.FC = () => {
  return (
    <main className="App">
      <div className="d-flex flex-row align-items-center justify-content-between">
        <h1 className="p-4">🎛 knobify</h1>
        <div className="p-3 float-right">
          <small className="text-muted m-1">powered by </small>
          <img src="spotify.png" style={{ height: '70px' }} />
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </main>
  );
};

export default App;
