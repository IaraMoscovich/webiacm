// pages/api/sendEmail.ts
import nodemailer from 'nodemailer';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { fullName, email } = req.body;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Cambia esto por tu proveedor de SMTP
      port: 587, // O el puerto que uses
      secure: false, // Cambia a true si usas SSL
      auth: {
        user: 'imosco2007@gmail.com', // Tu correo electrónico
        pass: 'hola123', // Tu contraseña
      },
    });

    const mailOptions = {
      from: 'your_email@example.com',
      to: 'imosco2007@gmail.com', // Tu correo donde recibirás las solicitudes
      subject: 'Nueva Solicitud de Registro',
      text: `Nombre: ${fullName}\nEmail: ${email}\n\nRevisa la solicitud.`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Email enviado' });
    } catch (error) {
      return res.status(500).json({ error: 'Error enviando el correo' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
