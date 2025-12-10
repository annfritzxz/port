
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://odqhaasjtcxsvusrtlmi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kcWhhYXNqdGN4c3Z1c3J0bG1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxODcyODEsImV4cCI6MjA4MDc2MzI4MX0.6gSgYVwW-hx22ddsz477IXpHAv-nPMzFG06BoFTq9DY';
const supabase = createClient(supabaseUrl, supabaseKey)

