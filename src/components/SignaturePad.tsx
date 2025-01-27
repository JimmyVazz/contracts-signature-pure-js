import { useRef, useState, useEffect, MouseEvent, TouchEvent } from "react";

interface SignaturePadProps {
  signer: string;
  onSave: (signatureBase64: string) => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ signer, onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isSigned, setIsSigned] = useState<boolean>(false); 

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
    event.preventDefault();
    setIsDrawing(true);
    const { offsetX, offsetY } = getEventCoordinates(event);
    const ctx = canvasRef.current?.getContext("2d");
    ctx?.beginPath();
    ctx?.moveTo(offsetX, offsetY);
  };

  const draw = (event: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
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
    ctx?.clearRect(0, 0, canvas!.width, canvas!.height);
    if (ctx) {
      ctx.fillStyle = "white";
    }
    ctx?.fillRect(0, 0, canvas!.width, canvas!.height);
    setIsSigned(false);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const imageBase64 = canvas.toDataURL("image/png");
      onSave(imageBase64);
      setIsSigned(true);
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
    <div className="flex flex-col items-center p-6 space-y-4">
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        className="border-2 border-gray-400 bg-white"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        style={{
          pointerEvents: isSigned || signer === '' ? "none" : "auto",
        }}
      />
      <div className="space-x-4">
        <button
          onClick={clearCanvas}
          className="px-6 py-3 bg-red-500 text-white rounded-md w-full"
          disabled={isSigned || signer === ''}
        >
          Corregir
        </button>
        <button
          onClick={saveSignature}
          className="px-6 py-3 bg-green-500 text-white rounded-md w-full"
          disabled={isSigned || signer === ''}
        >
          Guardar
        </button>
      </div>

      {isSigned && (
        <div className="mt-4 text-green-500 font-bold">¡Firmado por {signer}!</div>
      )}
    </div>
  );
};

export default SignaturePad;
