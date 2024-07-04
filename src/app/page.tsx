
import { createServer } from '@/components/supabase_server_client';
import Profile from '@/components/upload-image';
import { useState } from 'react';
import "./globals.css"

import { postReq } from '@/app/IA_connection/IA'

export default async function Home() {

  const supabase = createServer();
  const { data, error } = await supabase.from("medico_users").select("*")

  return (
    <pre>
      {JSON.stringify(data, null, 2)}
        <Profile />
    </pre>
  );
}
