import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styleSkill.css';
import App from './App';
import { CropsContextProvider } from './context/CropsContext'
import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CropsContextProvider>
        <App />
      </CropsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);