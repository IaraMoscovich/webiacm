
import { createServer } from '@/components/supabase_server_client';
import Profile from '@/components/upload-image';
import Image from "next/image"
import { useState } from 'react';
import "./globals.css"


export default async function Home () {

  const supabase = createServer();
  const { data, error } = await supabase.from("medico_users").select("*")
  const menuToggle = () => {
  //   document.getElementById('menu-toggle').addEventListener('click', function () {
  //     this.classList.toggle('open');
  // });
    
  }

  return (
    <body>
        <main>
          <header className="header">
              <div className="welcome-message">¡Bienvenida, María Fernanda!</div>
              <div className="menu-toggle" id="menu-toggle">
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
              </div>
          </header>
          <section className='imagenes'>
            <div>
              <h1>Dashboard</h1>
              <div>
                <div>
                  <h2>0</h2>
                  <h3>Ki-67 Positivos</h3>
                </div>
                <div>
                  <h2>0%</h2>
                  <h3>Células Positivas</h3>
                </div>
                <div>
                  <h2>0</h2>
                  <h3>Ki-67 Negativos</h3>
                </div>
                <div>
                  <Image
                    src={""}
                    alt=''
                  />
                  <h3>Gráfico</h3>
                </div>
              </div>
            </div>
          </section>
          <div className="container">
              <a href="img2" className="img2">
                <Image
                    src="/imagenes/Eliminar Img Tmñ Originaliacm.png"
                    alt="button"
                    width={200}
                    height={400}
                  />
              </a>
              <Profile/>
          </div>
      </main>
    </body>
  );
}