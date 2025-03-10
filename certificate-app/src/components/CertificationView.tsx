import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCertification } from '../store/certificationStore';

const CertificationView: React.FC = () => {
  const { currentCertification } = useCertification();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentCertification) {
      navigate('/');
    }
  }, [currentCertification, navigate]);

  if (!currentCertification) {
    return <div className="alert alert-info m-4">No certification selected</div>;
  }

  const handleViewCertificate = () => {
    window.open(currentCertification.fileUrl, '_blank');
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-success text-white">
              <h3 className="mb-0">Certification Details</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8">
                  <h4>{currentCertification.name}</h4>
                  <p className="text-muted">
                    <strong>Issued by:</strong> {currentCertification.issuer}
                  </p>
                  <p>
                    <strong>File:</strong> {currentCertification.fileName}
                  </p>
                  
                  <div className="mt-4">
                    <button
                      className="btn btn-primary me-2"
                      onClick={handleViewCertificate}
                    >
                      View Certification
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => navigate('/')}
                    >
                      Back to Form
                    </button>
                  </div>
                </div>
                
                <div className="col-md-4 text-center">
                  {currentCertification.fileName.endsWith('.pdf') ? (
                    <div>
                      <i className="bi bi-file-earmark-pdf" style={{ fontSize: '4rem', color: '#dc3545' }}></i>
                      <p>PDF Document</p>
                    </div>
                  ) : (
                    <img
                      src={currentCertification.fileUrl}
                      alt="Certificate preview"
                      className="img-fluid rounded"
                      style={{ maxHeight: '150px' }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationView;