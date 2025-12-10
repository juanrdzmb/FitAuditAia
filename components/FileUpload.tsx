import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, Image as ImageIcon, AlertCircle } from 'lucide-react';
import Button from './Button.tsx';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateAndSelectFile = (file: File) => {
    setError(null);
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    
    if (!validTypes.includes(file.type)) {
      setError("Formato no soportado. Por favor sube una imagen (JPG, PNG) o PDF.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError("El archivo es demasiado grande. Máximo 5MB.");
      return;
    }

    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSelectFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSelectFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-xl mx-auto w-full animate-fade-in text-center">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Sube tu Rutina</h2>
        <p className="text-zinc-400">
          Sube una captura de pantalla, foto o PDF de tu plan actual.
          <br/>El entrenador AI la analizará píxel por píxel.
        </p>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative border-3 border-dashed rounded-3xl p-12 cursor-pointer transition-all duration-300
          flex flex-col items-center justify-center gap-4 group min-h-[300px]
          ${isDragging 
            ? 'border-lime-400 bg-lime-400/10 scale-102' 
            : 'border-zinc-700 bg-zinc-900/30 hover:bg-zinc-800 hover:border-zinc-500'
          }
          ${error ? 'border-red-500 bg-red-500/5' : ''}
        `}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          className="hidden"
          accept=".jpg,.jpeg,.png,.webp,.pdf"
        />

        <div className={`
          p-5 rounded-full bg-zinc-800 group-hover:bg-zinc-700 transition-colors
          ${isDragging ? 'bg-lime-400/20 text-lime-400' : 'text-zinc-400'}
        `}>
          <UploadCloud size={48} />
        </div>

        <div className="space-y-1">
          <p className="text-lg font-medium text-white">
            Arrastra tu archivo aquí o <span className="text-lime-400 underline decoration-2 underline-offset-4">haz clic para buscar</span>
          </p>
          <p className="text-sm text-zinc-500">
            Soporta JPG, PNG, PDF (Max 5MB)
          </p>
        </div>

        {error && (
          <div className="absolute bottom-4 left-0 right-0 mx-4 bg-red-500/10 border border-red-500/50 text-red-200 p-3 rounded-lg flex items-center justify-center gap-2 text-sm animate-shake">
            <AlertCircle size={16} />
            {error}
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 text-zinc-500 text-sm">
        <div className="flex items-center gap-2 justify-center p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
          <ImageIcon size={16} />
          <span>Capturas de Pantalla</span>
        </div>
        <div className="flex items-center gap-2 justify-center p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
          <FileText size={16} />
          <span>Documentos PDF</span>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;