"use client"

import { createBrowser } from './supabase_client_client';
import { ChangeEvent } from 'react';

export default function Profile() {

    const supabase = createBrowser();

    // Handle file upload event
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
                body: formData
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
            <input id="file-input" type="file" onChange={uploadFile} style={{ display: 'none' }} />
            <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
                <img src="/imagenes/Subir Imagen Tmñ Original.png" alt="Seleccionar archivo" style={{ width: '200px', height: 'auto' }} />
            </label>
        </div>
    );
}
