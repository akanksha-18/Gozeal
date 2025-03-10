import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CertificationForm from './components/CertificationForm';
import CertificationView from './components/CertificationView';
import CertificationList from './components/CertificationList';
import { CertificationProvider } from './store/certificationStore';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <CertificationProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<CertificationForm />} />
          <Route path="/view" element={<CertificationView />} />
          <Route path="/list" element={<CertificationList />} />
        </Routes>
      </BrowserRouter>
    </CertificationProvider>
  );
};

export default App;
