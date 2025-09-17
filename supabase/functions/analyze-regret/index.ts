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
      console.log('Empty text provided');
      return new Response(JSON.stringify({ error: 'Text input is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      console.error('OpenAI API key not found in environment variables');
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured. Please check your Supabase secrets.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    console.log('OpenAI API key found, length:', openaiApiKey.length);
    console.log('Analyzing regret for text:', text.substring(0, 100) + '...');

    try {
      console.log('Making OpenAI API call...');
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-5-2025-08-07',
          messages: [
            {
              role: 'system',
              content: `You are ReLiveAI, a compassionate AI psychologist specializing in regret analysis. 

Respond ONLY with valid JSON in this exact format:
{
  "label": "string",
  "confidence": number,
  "intensity": number,
  "reflection": "string",
  "perspective": "string",
  "insights": ["string", "string", "string"],
  "suggestions": ["string", "string"]
}

Label must be one of: "Regret by Action", "Regret by Inaction", or "Minimal Regret"
Confidence: 0-100 (clinical confidence level)
Intensity: 0.0-10.0 (emotional intensity score)
Reflection: Professional therapeutic reflection (2-3 sentences)
Perspective: Alternative perspective with cognitive reframing (2-3 sentences)
Insights: 3 research-backed psychological insights (1 sentence each)
Suggestions: 2 evidence-based growth strategies (1 sentence each)`
            },
            {
              role: 'user',
              content: `Analyze this decision/situation: ${text}`
            }
          ],
          max_completion_tokens: 1000,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenAI API error:', response.status, errorText);
        
        // Handle specific error cases
        if (response.status === 401) {
          return new Response(JSON.stringify({ 
            error: 'Invalid OpenAI API key. Please check your API key configuration.' 
          }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } else if (response.status === 429) {
          return new Response(JSON.stringify({ 
            error: 'OpenAI API rate limit exceeded. Please try again later.' 
          }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } else {
          return new Response(JSON.stringify({ 
            error: `OpenAI API error (${response.status}): ${errorText}` 
          }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      }

      const data = await response.json();
      const analysisText = data.choices[0].message.content;
      
      console.log('OpenAI response received, length:', analysisText?.length || 0);
      
      // Parse the JSON response from OpenAI
      let analysisResult;
      try {
        analysisResult = JSON.parse(analysisText);
      } catch (parseError) {
        console.error('Failed to parse OpenAI response as JSON:', analysisText);
        return new Response(JSON.stringify({ 
          error: 'Invalid JSON response from OpenAI. Please try again.' 
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Validate the response structure
      if (!analysisResult.label || typeof analysisResult.confidence !== 'number' || 
          typeof analysisResult.intensity !== 'number' || !analysisResult.reflection || 
          !analysisResult.perspective || !Array.isArray(analysisResult.insights) ||
          !Array.isArray(analysisResult.suggestions)) {
        console.error('Invalid analysis structure:', analysisResult);
        return new Response(JSON.stringify({ 
          error: 'Invalid analysis format from OpenAI. Please try again.' 
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      console.log('Analysis successful');
      return new Response(JSON.stringify(analysisResult), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (error) {
      console.error('Error in OpenAI API call:', error);
      console.error('Error details:', error.message, error.stack);
      
      return new Response(JSON.stringify({ 
        error: 'OpenAI API call failed: ' + error.message
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error in analyze-regret function:', error);
    return new Response(JSON.stringify({ error: 'Internal server error: ' + error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});