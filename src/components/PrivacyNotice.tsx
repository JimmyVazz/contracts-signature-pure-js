import React, { useState } from 'react';
import SignaturePad from './SignaturePad';

type PrivacyNoticeProps = unknown

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
    if (!isSigned) { // Si no está firmado, se puede cambiar el nombre
      setName(e.target.value);
    }
  };

  return (
    <div className="font-sans p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="flex justify-center mb-8">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9i_Y4uDgonl3FgcBoH9vQvuiPer1iAGk-3g&s"
          alt="Título"
          className="w-16 h-16 object-contain"
        />
      </div>

      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Contrato de confidencialidad de la información, reglamento y lineamientos para el alumno</h2>
      <p className="text-gray-600">Aquí va el contenido del contrato...</p>

      <div className="mt-8 p-6 border border-gray-300 bg-gray-50 rounded-lg shadow-md">
        <p className="text-lg font-medium text-gray-700 mb-4">Por favor, ingrese su nombre y firme:</p>
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Ingrese su nombre"
            disabled={isSigned}
          />
        </div>

        {/* Componente de firma */}
        <div className="w-full max-w-md mx-auto mb-4">
          <SignaturePad onSave={handleSignatureChange} signer={name} />
        </div>

        <button
          onClick={() => {}}
          className="w-full py-3 mt-6 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-300"
          disabled={isSigned || name === ''}
        >
          Guardar Firma
        </button>
      </div>
    </div>
  );
};

export default PrivacyNotice;
