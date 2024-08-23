"use client"

import { createBrowser } from './supabase_client_client';
import { ChangeEvent, useState } from 'react';
import React from 'react';

// Componente ImageUploader
export function ImageUploader() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [result, setResult] = useState<any>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Obtiene el archivo seleccionado
        if (file) {
            // Crea una URL de objeto para la imagen
            const objectUrl = URL.createObjectURL(file);
            setImageUrl(objectUrl);

            // Subir el archivo y procesar los resultados
            uploadFile(file);
        }
    };

    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file); // Agregar el archivo al FormData

        try {
            const response = await fetch('https://fastapi-example-endl.onrender.com/upload-image/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload file.');
            }

            const data = await response.json();
            setResult(data); // Establecer los resultados

        } catch (error) {
            alert('Error uploading file.');
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            {imageUrl && <img src={imageUrl} alt="Imagen seleccionada" style={{ marginTop: '20px', maxWidth: '100%' }} />}
            <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
                <img src="/imagenes/Subir Imagen Tmñ Original.png" alt="Seleccionar archivo" style={{ width: '200px', height: 'auto' }} />
            </label>
            <input id="file-input" type="file" onChange={handleFileChange} style={{ display: 'none' }} />

            {result && (
                <div>
                    <h3>Resultados:</h3>
                    <p>Ki67 Positivos: {result.ki67_positivos}</p>
                    <p>Ki67 Negativos: {result.ki67_negativos}</p>
                </div>
            )}
        </div>
    );
}

// Exportación por defecto del componente Profile
export default function Profile() {
    return (
        <div>
            <ImageUploader />
            <input type="file" onChange={uploadFile} />
        </div>
    );
}
