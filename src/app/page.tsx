"use client"

import { createServer } from '@/components/supabase_server_client';
import Profile from '@/components/upload-image';
import React from 'react';
import Header from '../components/Header';
import { useState } from 'react';
import "./globals.css"

const HomePage = () => {
/*   const supabase = createServer();
  const { data, error } = await supabase.from('medico_users').select('*'); */

/*   if (error) {
    console.error(error);
    return <div>Error fetching data</div>;
  }
 */
  
  const [open, setOpen] = useState(false);

  const handleToogle = () => {
    setOpen(!open)
  }

  console.log(open)

  return (
    <>
      <div>
        <Header />
  {/*       <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <Profile />
        <div className={open ? "open" : "menu-toggle"} id="menu-toggle" onClick={handleToogle}>
            <div className="bar">HOLA</div>
            <div className="bar">HELLO</div>
            <div className="bar">CHAU</div>
        </div>
      </div>
    </>
    
  );
};

export default HomePage;


