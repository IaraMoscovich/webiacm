import { createBrowser } from './supabase_client_client';
import { ChangeEvent } from 'react';
import React, { useState } from 'react';


// Componente ImageUploader
export function ImageUploader() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Obtiene el archivo seleccionado
        if (file) {
            // Crea una URL de objeto para la imagen
            const objectUrl = URL.createObjectURL(file);
            setImageUrl(objectUrl);

            // Limpia la URL del objeto cuando el componente se desmonte
            return () => {
                URL.revokeObjectURL(objectUrl);
            };
        }
    };

    return (
        <div>
            <input id="file-input" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
            <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
                <img src="/imagenes/Subir Imagen Tmñ Original.png" alt="Seleccionar archivo" style={{ width: '200px', height: 'auto' }} />
            </label>
            {/* Muestra la imagen seleccionada si existe */}
            {imageUrl && <img src={imageUrl} alt="Imagen seleccionada" style={{ marginTop: '20px', maxWidth: '100%' }} />}
        </div>
    );
}

// Exportación por defecto del componente Profile
export default function Profile() {
    const supabase = createBrowser();

    // Manejar el evento de carga de archivos
    const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const bucket = "FotosDB";
            
        // Crear FormData
        const formData = new FormData();
        formData.append('file', file as Blob); // Agregar el archivo al FormData

        // Enviar FormData al servidor
        try {
            const response = await fetch('https://fastapi-example-endl.onrender.com/upload-image/', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to upload file.');
            }

            alert('File uploaded successfully!');
        } catch (error) {
            alert('Error uploading file.');
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <h1>Profile Page</h1>
            <ImageUploader />
        </div>
    );
}

/*async function uploadFile(file: File): Promise<string> {
    if (!file) {
      return 'Please select a file!';
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch('https://fastapi-example-endl.onrender.com/upload-image/', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        return 'Upload successful: ' + JSON.stringify(data);
      } else {
        return 'Upload failed: ' + response.statusText;
      }
    } catch (error) {
      if (error instanceof Error) {
        return 'Error: ' + error.message;
      } else {
        return 'Unexpected error occurred';
      }
    }
}*/
