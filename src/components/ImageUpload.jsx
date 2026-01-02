import React, { useState, useRef } from 'react';
import { Camera } from 'lucide-react'; // Instale com: npm install lucide-react

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  return (
    <div className="w-full">
      <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase">
        Imagem do Produto
      </label>
      
      <div
        onClick={() => fileInputRef.current.click()}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className="relative group cursor-pointer border-2 border-dashed border-gray-700 rounded-lg bg-[#1e2124] hover:bg-[#25282c] hover:border-blue-500 transition-all duration-300 min-h-[140px] flex flex-col items-center justify-center p-4"
      >
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={(e) => handleFile(e.target.files[0])}
          accept="image/*"
        />

        {image ? (
          <img 
            src={image} 
            alt="Preview" 
            className="h-32 w-full object-contain rounded-md"
          />
        ) : (
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <Camera className="text-gray-500 group-hover:text-blue-500 transition-colors" size={32} />
            </div>
            <p className="text-gray-400 text-sm">
              Arraste e solte ou <span className="text-blue-500 font-medium">clique para enviar</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;