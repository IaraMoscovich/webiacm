// pages/index.js
import Head from 'next/head';
import '../public/styles.css'; // Importar el archivo CSS
import { useEffect } from 'react'; // Importar useEffect para manejar el evento click

export default function Home() {
    // Usar useEffect para agregar el evento click al menú
    useEffect(() => {
        const menuToggle = document.getElementById('menu-toggle');
        menuToggle.addEventListener('click', function () {
            this.classList.toggle('open');
        });

        // Cleanup function para eliminar el event listener
        return () => {
            menuToggle.removeEventListener('click', function () {
                this.classList.toggle('open');
            });
        };
    }, []);

    return (
        <>
            <Head>
                <title> IACM Detection </title>
                <link rel="stylesheet" href="/styles.css" />
            </Head>
            <header className="header">
                <div className="welcome-message">¡Bienvenida, María Fernanda!</div>
                <div className="menu-toggle" id="menu-toggle">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </header>

            <div className="container">
                <a href="#" className="img1">
                    <img src="/Imagenes/Subir%20Imagen%20Tmñ%20Original.png" alt="button" width="280px" height="111px" />
                </a>
                <a href="#" className="img2">
                    <img src="/Imagenes/Eliminar%20Img%20Tmñ%20Originaliacm.png" alt="button" width="280px" height="111px" />
                </a>
            </div>
        </>
    );
}
