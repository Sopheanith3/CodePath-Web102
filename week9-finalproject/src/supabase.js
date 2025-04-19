import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase URL and anon key
const supabaseUrl = 'https://iyxmfrpsxdzzcdainhyp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5eG1mcnBzeGR6emNkYWluaHlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4NTQyNjcsImV4cCI6MjA2MDQzMDI2N30.uuIUgXF915N25fSkXRrWqGj9gAIe6aGm7RjWjm2GKfQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;