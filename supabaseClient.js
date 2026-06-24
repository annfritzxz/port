
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://odqhaasjtcxsvusrtlmi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kcWhhYXNqdGN4c3Z1c3J0bG1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxODcyODEsImV4cCI6MjA4MDc2MzI4MX0.6gSgYVwW-hx22ddsz477IXpHAv-nPMzFG06BoFTq9DY';
const supabase = createClient(supabaseUrl, supabaseKey)

// Real-time subscription helper
export const subscribeToTable = (tableName, callback) => {
  return supabase
    .channel(`public:${tableName}`)
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: tableName },
      (payload) => callback(payload)
    )
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: tableName },
      (payload) => callback(payload)
    )
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: tableName },
      (payload) => callback(payload)
    )
    .subscribe()
}

export const unsubscribeFromTable = (subscription) => {
  if (subscription) {
    supabase.removeChannel(subscription)
  }
}

export default supabase

