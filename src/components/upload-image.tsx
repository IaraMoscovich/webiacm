"use client"

import { createBrowser } from './supabase_client_client';
import { ChangeEvent } from 'react';
import React, { useState } from 'react';

// Componente ImageUploader
export function ImageUploader() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [result, setResult] = useState<any>(null);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Obtiene el archivo seleccionado
        if (file) {
            // Crea una URL de objeto para la imagen
            const objectUrl = URL.createObjectURL(file);
            setImageUrl(objectUrl);

            return () => {
                URL.revokeObjectURL(objectUrl);
            };
        }
    };

    return (
        <div>
             {imageUrl && <img src={imageUrl} alt="Imagen seleccionada" style={{ marginTop: '20px', maxWidth: '100%' }} />}
            <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
                <img src="/imagenes/Subir Imagen Tmñ Original.png" alt="Seleccionar archivo" style={{ width: '200px', height: 'auto' }} />
            </label>
            <input id="file-input" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
            {/* Muestra la imagen seleccionada si existe */}
        </div>
    );
}

// Exportación por defecto del componente Profile
    export default function Profile() {


    // Manejar el evento de carga de archivos
    const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const bucket = "FotosDB";

            
        // Crear FormData
        const formData = new FormData();
        formData.append('file', file as Blob); // Agregar el archivo al FormData

        // Enviar FormData al servidor, http://localhost:8000https://fastapi-example-endl.onrender.com/upload-image/
        try {
            const response = await fetch ('http://localhost:8000/upload-image/', {
                method: 'POST',
                body: formData,
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
            <ImageUploader/>
            <input type="file" onChange={uploadFile} />
        </div>
    );
}