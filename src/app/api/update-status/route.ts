import { createClient } from "@/components/supabaseClient";
const nodemailer = require('nodemailer');

// Endpoint para actualizar el estado de la solicitud
export async function POST (req: Request) {
    const supabase = createClient()
    const { id, status } = await req.json();
    console.log(status)
  
    // Actualiza el estado de la solicitud en Supabase
    const { data, error } = await supabase
      .from('solicitudes')
      .update({ status })
      .eq('id', id)
      .single();
  
    if (error) {
      return Response.json({error: 'Error al actualizar el estado:'}, {status: 500})
    }
}

  