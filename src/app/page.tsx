import { createServer } from '@/components/supabase_server_client';
import Profile from '@/components/upload-image';

import { postReq } from '@/app/IA_connection/IA'

export default async function Home() {

  const a = await postReq("hola")
  //console.log(JSON.stringify(a));

  const supabase = createServer();
  const { data, error } = await supabase.from("medico_users").select("*")

  return (
    <pre>
      {JSON.stringify(data, null, 2)}
      <Profile />
    </pre>
  );
}
