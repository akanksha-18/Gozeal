import { createContext, useContext, useState, ReactNode } from 'react';
import { Certification } from '../types';

type CertificationContextType = {
  certifications: Certification[];
  currentCertification: Certification | null;
  addCertification: (cert: Certification) => void;
  updateCurrentCertification: (cert: Certification | null) => void;
};

const CertificationContext = createContext<CertificationContextType | undefined>(undefined);

export const CertificationProvider = ({ children }: { children: ReactNode }) => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [currentCertification, setCurrentCert] = useState<Certification | null>(null);

  const addCertification = (certification: Certification) => {
    setCertifications([...certifications, certification]);
  };

  const updateCurrentCertification = (certification: Certification | null) => {
    setCurrentCert(certification);
  };

  return (
    <CertificationContext.Provider
      value={{ certifications, currentCertification, addCertification, updateCurrentCertification }}>
      {children}
    </CertificationContext.Provider>
  );
};

export const useCertification = () => {
  const context = useContext(CertificationContext);
  if (!context) {
    throw new Error('useCertification must be used within a CertificationProvider');
  }
  return context;
};
