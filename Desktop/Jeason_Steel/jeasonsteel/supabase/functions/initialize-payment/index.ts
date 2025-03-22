
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { v4 as uuidv4 } from "https://esm.sh/uuid@9.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const FLUTTERWAVE_SECRET_KEY = Deno.env.get("FLUTTERWAVE_SECRET_KEY") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

// Create a supabase client with the service role key
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body
    const body = await req.json();
    const { amount, customer } = body;

    if (!amount) {
      return new Response(
        JSON.stringify({ error: 'Amount is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get the authorization header if present
    const authHeader = req.headers.get('Authorization');
    let userId = null;

    // If there's an auth header, validate the token and get the user
    if (authHeader) {
      try {
        const token = authHeader.replace('Bearer ', '');
        const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
        
        if (error) throw error;
        if (user) userId = user.id;
        
        console.log("Authenticated user:", userId);
      } catch (error) {
        console.error("Auth error:", error);
        // Continue without user ID if authentication fails
      }
    } else {
      console.log("No auth header present, proceeding as guest");
    }

    // Generate a unique transaction reference
    const txRef = `TX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Create a transaction record in the database
    const transactionId = uuidv4();

    // Prepare transaction data
    const transactionData = {
      id: transactionId,
      user_id: userId,
      amount,
      currency: "NGN",
      payment_method: "flutterwave",
      payment_status: "pending",
      flutterwave_reference: txRef,
    };

    // Add customer data if available
    if (customer) {
      Object.assign(transactionData, {
        customer_name: customer.name,
        customer_email: customer.email,
        customer_phone: customer.phone
      });
    }

    // Insert transaction to the database
    const { error: insertError } = await supabaseAdmin
      .from('transactions')
      .insert(transactionData);

    if (insertError) {
      console.error("Error inserting transaction:", insertError);
      throw new Error('Failed to create transaction record');
    }

    // Prepare payload for Flutterwave API
    const payload = {
      tx_ref: txRef,
      amount: amount,
      currency: "NGN",
      redirect_url: `${req.headers.get('origin')}/payment/callback`,
      meta: {
        transaction_id: transactionId
      }
    };

    // Add customer info to the payload if available
    if (customer) {
      Object.assign(payload, {
        customer: {
          email: customer.email,
          name: customer.name,
          phonenumber: customer.phone
        }
      });
    } else if (userId) {
      // Try to get user email from auth system if authenticated
      const { data: userData } = await supabaseAdmin.auth.admin.getUserById(userId);
      if (userData?.user?.email) {
        Object.assign(payload, {
          customer: {
            email: userData.user.email
          }
        });
      }
    }

    // Make request to Flutterwave API
    const response = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${FLUTTERWAVE_SECRET_KEY}`
      },
      body: JSON.stringify(payload)
    });

    const responseData = await response.json();
    console.log("Flutterwave response:", responseData);

    if (!response.ok) {
      throw new Error(`Flutterwave API error: ${responseData.message || "Unknown error"}`);
    }

    // Return the payment link to the client
    return new Response(
      JSON.stringify({ 
        payment_link: responseData.data.link,
        transaction_id: transactionId
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
