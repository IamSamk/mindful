
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import 'https://deno.land/x/xhr@0.1.0/mod.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    })
  }
  
  try {
    const { messages, userId } = await req.json()
    
    // Get environment variables
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set')
    }
    
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')
    
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error('Supabase credentials not set')
    }
    
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    
    // Get the last message from the user to save to the database
    const lastUserMessage = messages.length > 0 ? messages[messages.length - 1].content : ''
    
    if (lastUserMessage && userId) {
      // Save user message to the database
      const { error: insertError } = await supabase
        .from('chat_messages')
        .insert({
          user_id: userId,
          content: lastUserMessage,
          is_from_user: true
        })
      
      if (insertError) {
        console.error('Error saving user message:', insertError)
      }
    }
    
    // Prepare conversation history for Gemini
    const conversationHistory = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }))
    
    console.log("Sending to Gemini API:", JSON.stringify(conversationHistory))
    
    // Call Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: conversationHistory,
        systemInstruction: {
          parts: [{
            text: "You are an empathetic AI mental health counselor. Your primary goals are to:\n1. Listen actively and compassionately\n2. Provide emotional support and understanding\n3. Offer gentle, constructive guidance\n4. Help users explore their feelings and thoughts\n\nNever provide medical diagnosis, encourage professional help for serious concerns, maintain a supportive tone, and respect user's privacy. If user mentions self-harm, gently suggest contacting a licensed therapist or emergency services."
          }]
        },
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 500,
        },
      }),
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Gemini API Error:', response.status, errorText)
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`)
    }
    
    const data = await response.json()
    console.log("Gemini API response:", data)
    
    // Extract AI response from Gemini format
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response at this time.'
    
    if (aiResponse && userId) {
      // Save AI response to the database
      const { error: insertError } = await supabase
        .from('chat_messages')
        .insert({
          user_id: userId,
          content: aiResponse,
          is_from_user: false
        })
      
      if (insertError) {
        console.error('Error saving AI response:', insertError)
      }
    }
    
    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in gemini-chat function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
