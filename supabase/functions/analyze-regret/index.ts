import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();
    
    if (!text || text.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'Text input is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      console.error('OpenAI API key not found');
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Analyzing regret for text:', text.substring(0, 100) + '...');

    // Analyze the regret using OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an AI psychologist specializing in regret analysis. Analyze the provided text and respond with a JSON object containing:

1. "regretType": One of "No Regret", "Regret by Action", or "Regret by Inaction"
2. "regretScore": A number from 0-10 indicating regret intensity (0 = no regret, 10 = extreme regret)
3. "confidence": A decimal from 0-1 indicating your confidence in the analysis
4. "counterfactual": A detailed alternative scenario narrative (2-3 sentences) exploring what might have happened if they made a different choice
5. "insights": An array of 3-4 psychological insights about regret patterns, decision-making, or lessons learned

Base your analysis on established psychological research about regret, counterfactual thinking, and decision-making. Be empathetic and supportive in tone.

Respond ONLY with valid JSON, no other text.`
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.7,
        max_tokens: 800
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, await response.text());
      return new Response(JSON.stringify({ error: 'Failed to analyze regret' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const analysisText = data.choices[0].message.content;
    
    console.log('OpenAI response:', analysisText);
    
    // Parse the JSON response from OpenAI
    let analysis;
    try {
      analysis = JSON.parse(analysisText);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', analysisText);
      return new Response(JSON.stringify({ error: 'Invalid response format from AI' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate the response structure
    if (!analysis.regretType || typeof analysis.regretScore !== 'number' || 
        typeof analysis.confidence !== 'number' || !analysis.counterfactual || 
        !Array.isArray(analysis.insights)) {
      console.error('Invalid analysis structure:', analysis);
      return new Response(JSON.stringify({ error: 'Invalid analysis format' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Analysis completed successfully:', analysis);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-regret function:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});