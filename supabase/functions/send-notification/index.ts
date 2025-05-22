
// Follow this setup guide to integrate the Deno runtime and handle edge functions locally: https://deno.land/manual/runtime/manual
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NotificationRequest {
  userId?: string;
  email?: string;
  title: string;
  message: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Auth context of the function
    const supabaseClient = createClient(
      // Supabase API URL - env var exported by default.
      Deno.env.get('SUPABASE_URL') ?? '',
      // Supabase API ANON KEY - env var exported by default.
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get the request body
    const { userId, email, title, message } = await req.json() as NotificationRequest;

    if (!title || !message) {
      return new Response(
        JSON.stringify({ error: "Title and message are required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Get the user ID either directly or by email
    let targetUserId = userId;
    
    if (email && !userId) {
      // If email is provided and userId is not, get the userId from the email
      const { data: userData, error: userError } = await supabaseClient
        .from('users')
        .select('id')
        .eq('email', email)
        .maybeSingle();
      
      if (userError || !userData) {
        return new Response(
          JSON.stringify({ error: "User not found" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 404 }
        );
      }
      
      targetUserId = userData.id;
    }
    
    if (!targetUserId) {
      return new Response(
        JSON.stringify({ error: "Either userId or email must be provided" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Insert the notification
    const { error: insertError } = await supabaseClient
      .from('notifications')
      .insert({
        user_id: targetUserId,
        title,
        message
      });
    
    if (insertError) {
      throw insertError;
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
