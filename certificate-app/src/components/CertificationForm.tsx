import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCertification } from '../store/certificationStore';

const CertificationForm: React.FC = () => {
  const [name, setName] = useState('');
  const [issuer, setIssuer] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; issuer?: string; file?: string }>({});

  const { addCertification, updateCurrentCertification } = useCertification();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { name?: string; issuer?: string; file?: string } = {};

    if (!name) newErrors.name = 'Certification name is required';
    if (!issuer) newErrors.issuer = 'Issuer is required';
    if (!file) {
      newErrors.file = 'Please upload a certificate file';
    } else if (!/\.(pdf|jpg|jpeg)$/i.test(file.name)) {
      newErrors.file = 'Only PDF and JPG files are allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      console.log("Selected File:", selectedFile.name, "Type:", selectedFile.type);
      const fileUrl = URL.createObjectURL(selectedFile);
      setFilePreview(fileUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const fileUrl = file ? URL.createObjectURL(file) : '';

      const newCertification = {
        id: Date.now().toString(),
        name,
        issuer,
        fileUrl,
        fileName: file ? file.name : '',
      };

      addCertification(newCertification);
      updateCurrentCertification(newCertification);

  
      setSuccessMessage('Certification added successfully!');

    
      setTimeout(() => {
        setSuccessMessage(null);
        navigate('/view');
      }, 1000);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Add New Certification</h3>
            </div>
            <div className="card-body">
              
             
              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="certName" className="form-label">
                    Certification Name *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="certName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="issuer" className="form-label">
                    Issuer *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.issuer ? 'is-invalid' : ''}`}
                    id="issuer"
                    value={issuer}
                    onChange={(e) => setIssuer(e.target.value)}
                  />
                  {errors.issuer && <div className="invalid-feedback">{errors.issuer}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="certFile" className="form-label">
                    Upload Certificate (PDF, JPG) *
                  </label>
                  <input
                    type="file"
                    className={`form-control ${errors.file ? 'is-invalid' : ''}`}
                    id="certFile"
                    accept=".pdf,.jpg,.jpeg"
                    onChange={handleFileChange}
                  />
                  <small className="text-muted">Only PDF and JPG formats are accepted</small>
                  {errors.file && <div className="invalid-feedback">{errors.file}</div>}
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button type="submit" className="btn btn-primary">
                    Save Certification
                  </button>
                </div>
              </form>
            </div>
          </div>

          {filePreview && (
            <div className="mt-4">
              <h5>Document Preview:</h5>
              {file?.type === "application/pdf" ? (
                <iframe src={filePreview} width="100%" height="500px" title="PDF Preview"></iframe>
              ) : (
                <img src={filePreview} alt="Uploaded File" className="img-fluid rounded shadow" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificationForm;
