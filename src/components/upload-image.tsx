"use client"

import { createBrowser } from './supabase_client_client';
import { ChangeEvent } from 'react';

export default function Profile() {
    const supabase = createBrowser();
  
    // Handle file upload event
    const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      const bucket = "FotosDB"
  
      // Call Storage API to upload file
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(file!.name, file as File);
  
      // Handle error if upload failed
      if(error) {
        alert('Error uploading file.');
        return;
      }
  
      alert('File uploaded successfully!');
    };
  
    return (
      <div>
        <h1>Upload Profile Photo</h1>
        <input type="file" onChange={uploadFile} />
      </div>
    );
  }