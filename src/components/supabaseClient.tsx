/*import { createBrowserClient } from "@supabase/ssr";

export function createBrowser () {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}*/
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://afwgthjhqrgxizqydmvs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmd2d0aGpocXJneGl6cXlkbXZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU4Nzg4OTUsImV4cCI6MjAzMTQ1NDg5NX0.Oq0wjvVrT8YJ4Q3q7Ji8-28qljja8h1sEBzZV5oXzzc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


