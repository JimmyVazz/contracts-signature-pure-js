import { useRef, useState, useEffect, MouseEvent, TouchEvent } from "react";
import "./SignaturePad.css"; // Archivo CSS separado

interface SignaturePadProps {
  signer: string;
  onSave: (signatureBase64: string) => void;
  isSigned: boolean;
  onClear: () => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ signer, onSave, isSigned, onClear }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = "black";
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const startDrawing = (event: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    if (isSigned) return; // Evita dibujar si ya se firmó
    event.preventDefault();
    setIsDrawing(true);
    const { offsetX, offsetY } = getEventCoordinates(event);
    const ctx = canvasRef.current?.getContext("2d");
    ctx?.beginPath();
    ctx?.moveTo(offsetX, offsetY);
  };

  const draw = (event: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isSigned) return;
    event.preventDefault();
    const { offsetX, offsetY } = getEventCoordinates(event);
    const ctx = canvasRef.current?.getContext("2d");
    ctx?.lineTo(offsetX, offsetY);
    ctx?.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    onClear(); // Llamamos a la función para resetear isSigned en PrivacyNotice
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const imageBase64 = canvas.toDataURL("image/png");
      onSave(imageBase64);
    }
  };

  const getEventCoordinates = (event: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    if ("touches" in event) {
      const rect = canvasRef.current!.getBoundingClientRect();
      return {
        offsetX: event.touches[0].clientX - rect.left,
        offsetY: event.touches[0].clientY - rect.top,
      };
    } else {
      return { offsetX: event.nativeEvent.offsetX, offsetY: event.nativeEvent.offsetY };
    }
  };

  return (
    <div className="signature-pad">
      <canvas
        ref={canvasRef}
        className="signature-canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        style={{
          pointerEvents: isSigned ? "none" : "auto",
        }}
      />
      <div className="button-group">
        <button onClick={clearCanvas} className="clear-button" disabled={!isSigned}>
          Corregir
        </button>
        <button onClick={saveSignature} className="save-button" disabled={isSigned || signer === ''}>
          Guardar
        </button>
      </div>

      {isSigned && <div className="signed-message">¡Firmado por {signer}!</div>}
    </div>
  );
};

export default SignaturePad;
