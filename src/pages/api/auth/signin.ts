import type { APIRoute, APIContext } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }: APIContext) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const provider = formData.get("provider")?.toString();

  const validProviders = ["google"];

  if (provider && validProviders.includes(provider)) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:4321/api/auth/callback"
      },
    });

    if (error) {
      return new Response(error.message, { status: 500 });
    }
    
    // Se debe devolver una respuesta o redirección aquí si la autenticación con OAuth es exitosa
    // Por ejemplo:
    // return redirect(data.url);
  }

  if (!email || !password) {
    return new Response("Correo electrónico y contraseña obligatorios", { status: 400 });
  }

  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    return new Response(signInError.message, { status: 500 });
  }

  const { access_token, refresh_token } = signInData.session;
  cookies.set("sb-access-token", access_token, {
    path: "/",
  });
  cookies.set("sb-refresh-token", refresh_token, {
    path: "/",
  });
  return redirect("/dashboard");
};
