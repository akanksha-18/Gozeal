
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCertification } from '../store/certificationStore';

const CertificationList: React.FC = () => {
  const { certifications, updateCurrentCertification } = useCertification();

  const navigate = useNavigate();

  useEffect(() => {
    const savedCertification = localStorage.getItem('currentCertification');
    if (savedCertification) {
      updateCurrentCertification(JSON.parse(savedCertification));
    }
  }, []);

  const handleView = (id: string) => {
    const certification = certifications.find((cert) => cert.id === id);
    if (certification) {
      updateCurrentCertification(certification);
      localStorage.setItem('currentCertification', JSON.stringify(certification)); 
      navigate('/view');
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Certifications</h2>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Add New
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="alert alert-info">No certifications found. Add your first certification!</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Certification Name</th>
                <th>Issuer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {certifications.map((cert) => (
                <tr key={cert.id}>
                  <td>{cert.name}</td>
                  <td>{cert.issuer}</td>
                  <td>
                    <button className="btn btn-info btn-sm" onClick={() => handleView(cert.id)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CertificationList;
