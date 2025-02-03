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
    setIsSigned(true);
    console.log("FIRMADO: ", signatureBase64);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!isSigned) {
      setName(e.target.value);
    }
  };

  const handleClear = () => {
    setIsSigned(false);
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

      <h2 className="title">Firma de enterado</h2>
      <div className="form-container">
        <div className="input-group">
          <label htmlFor="name">Nombre y apellidos:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Ejemplo: Rene Figueroa Ramirez"
            disabled={isSigned}
          />
        </div>

        {/* Componente de firma */}
        <div className="signature-container">
          <SignaturePad 
            onSave={handleSignatureChange} 
            signer={name} 
            isSigned={isSigned} 
            onClear={handleClear} 
          />
        </div>
      </div>
    </div>
  );
};

export default PrivacyNotice;
