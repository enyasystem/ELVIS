import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transactionId } = await req.json();

    const { data: transaction, error: txError } = await supabase
      .from('transactions')
      .select('*, profiles(email)')
      .eq('id', transactionId)
      .single();

    if (txError) throw txError;

    const emailResponse = await resend.emails.send({
      from: "Jeason Steel <notifications@jeasonsteel.com>",
      to: [transaction.profiles.email],
      subject: `Payment ${transaction.payment_status} - Jeason Steel`,
      html: `
        <h1>Payment ${transaction.payment_status}</h1>
        <p>Your payment of ${transaction.currency} ${transaction.amount} is ${transaction.payment_status}.</p>
        <p>Transaction Reference: ${transaction.id}</p>
        <p>Thank you for choosing Jeason Steel!</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true, emailResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Notification error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});