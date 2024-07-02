import { createServer } from '@/components/supabase_server_client';
import Profile from '@/components/upload-image';
import React from 'react';
import Header from '../components/Header';

const HomePage = async () => {
  const supabase = createServer();
  const { data, error } = await supabase.from('medico_users').select('*');

  if (error) {
    console.error(error);
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <Header />
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Profile />
    </div>
  );
};

export default HomePage;
