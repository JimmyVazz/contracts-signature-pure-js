import React, { useState } from 'react';
import SignaturePad from '../SignaturePad/SignaturePad';
import './PrivacyNotice.css'; // Archivo de estilos

type PrivacyNoticeProps = unknown;

const PrivacyNotice: React.FC<PrivacyNoticeProps> = () => {
  const [name, setName] = useState<string>('');
  const [isSigned, setIsSigned] = useState<boolean>(false);

  const handleSignatureChange = (signatureBase64: string): void => {
    if (name === '') {
      alert('Por favor, ingrese su nombre antes de firmar.');
      return;
    }
    console.log("FIRMADO: ", signatureBase64);
    setIsSigned(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!isSigned) {
      setName(e.target.value);
    }
  };

  return (
    <div className="privacy-notice">
      <div className="logo-container">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9i_Y4uDgonl3FgcBoH9vQvuiPer1iAGk-3g&s"
          alt="Título"
          className="logo"
        />
      </div>

      <h2 className="title">Contrato de confidencialidad de la información, reglamento y lineamientos para el alumno</h2>
      <p className="description">Aquí va el contenido del contrato...</p>

      <div className="form-container">
        <p className="form-title">Por favor, ingrese su nombre y firme:</p>

        <div className="input-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Ingrese su nombre"
            disabled={isSigned}
          />
        </div>

        {/* Componente de firma */}
        <div className="signature-container">
          <SignaturePad onSave={handleSignatureChange} signer={name} />
        </div>

        <button
          onClick={() => {}}
          className="submit-button"
          disabled={isSigned || name === ''}
        >
          Guardar Firma
        </button>
      </div>
    </div>
  );
};

export default PrivacyNotice;
