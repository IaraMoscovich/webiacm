"use client"

import { createBrowser } from './supabase_client_client';
import { ChangeEvent } from 'react';
import React, { useState } from 'react';

// Exportación por defecto del componente Profile
    export default function Profile() {
        const [result, setResult] = useState<{ positivos: number; negativos: number }>({ positivos: 0, negativos: 0 });

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

            const json_res = await response.json();

            // Guardar resultados en localStorage
            localStorage.setItem('resultados', JSON.stringify({
                positivos: json_res.positivos,
                negativos: json_res.negativos
            }));
            

            alert('File uploaded successfully!');
            window.location.reload();
        } catch (error) {
            alert('Error uploading file.');
            console.error('Error uploading file:', error);
        }
    };
    

    return (
        <div>
            <input type="file" onChange={uploadFile} />
        </div>
    );
}