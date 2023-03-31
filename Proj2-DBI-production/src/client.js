import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    "https://wdeqvfoebgcriqntwzaj.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkZXF2Zm9lYmdjcmlxbnR3emFqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3OTc3OTc4NywiZXhwIjoxOTk1MzU1Nzg3fQ.WkewY3AxxmSJkit3HLii-aUD_SJ4ctDcDBqKEMPaAQw",
)
