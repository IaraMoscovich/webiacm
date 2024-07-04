
import { createServer } from '@/components/supabase_server_client';
import Profile from '@/components/upload-image';
import Image from "next/image"
import { useState } from 'react';
import "./globals.css"

import { postReq } from '@/app/IA_connection/IA'

export default async function Home() {

  const supabase = createServer();
  const { data, error } = await supabase.from("medico_users").select("*")
  const menuToggle = () => {
  //   document.getElementById('menu-toggle').addEventListener('click', function () {
  //     this.classList.toggle('open');
  // });
    
  }

  return (
    <pre>
      {JSON.stringify(data, null, 2)}
        <body>
          <header className="header">
              <div className="welcome-message">¡Bienvenida, María Fernanda!</div>
              <div className="menu-toggle" id="menu-toggle">
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
              </div>
          </header>
          <section className='imagenes'>
            <Image
              src={"/imagenes/Celulas.png"}
              alt=''
              width={800}
              height={150}
            />
            <Image
              src={"/imagenes/Dashboard.png"}
              alt=''
              width={800}
              height={150}
            />
          </section>
          <div className="container">
              <Profile/>
              <a href="img2" className="img2">
                <Image
                    src="/imagenes/Eliminar Img Tmñ Originaliacm.png"
                    alt="button"
                    width={200}
                    height={100}
                  />
              </a>
          </div>
      </body>
    </pre>
  );
}
