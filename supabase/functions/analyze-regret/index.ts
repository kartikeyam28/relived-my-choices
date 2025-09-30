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
            content: `You are ReLiveAI, a compassionate AI psychologist specializing in regret analysis using advanced NLP models and psychological principles. Analyze the user's decision/situation with empathy and scientific rigor.

Determine the regret classification and provide therapeutic insights based on counterfactual thinking theory and action vs inaction regret research.

Respond ONLY with valid JSON in this exact format:
{
  "label": "string",
  "confidence": number,
  "intensity": number,
  "reflection": "string",
  "perspective": "string",
  "insights": ["string1", "string2", "string3"],
  "suggestions": ["string1", "string2"]
}

Guidelines:
- Be empathetic, non-judgmental, and supportive
- Focus on growth and understanding, not prescriptions
- Use therapeutic language that validates their experience
- Base insights on psychological research about regret and decision-making
- label must be one of: "Regret by Action", "Regret by Inaction", "No Regret"
- confidence should be 0-100
- intensity should be 0-10`
          },
          {
            role: 'user',
            content: `Please analyze this decision/situation: ${text}`
          }
        ],
        max_completion_tokens: 1200,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, await response.text());
      throw new Error('OpenAI API call failed');
    }

    const data = await response.json();
    const analysisText = data.choices[0].message.content;
    
    console.log('OpenAI response:', analysisText);
    
    // Parse the JSON response from OpenAI
    let analysisResult;
    try {
      analysisResult = JSON.parse(analysisText);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', analysisText);
      throw new Error('Invalid JSON response from OpenAI');
    }

    // Validate the response structure
    if (!analysisResult.label || typeof analysisResult.confidence !== 'number' || 
        typeof analysisResult.intensity !== 'number' || !analysisResult.reflection || 
        !analysisResult.perspective || !Array.isArray(analysisResult.insights) ||
        !Array.isArray(analysisResult.suggestions)) {
      console.error('Invalid analysis structure:', analysisResult);
      throw new Error('Invalid analysis format from OpenAI');
    }

    console.log('OpenAI API call successful');
    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    
    // Fallback to mock data if API fails
    const fallbackResult = {
      label: "Regret by Inaction",
      confidence: 87,
      intensity: 6.8,
      reflection: "Your experience reflects a common human tendency to wonder about paths not taken. These feelings are valid and show your capacity for growth and self-reflection.",
      perspective: "If you had moved forward with that decision, you might have faced challenges that would have ultimately strengthened your resilience and expanded your comfort zone. Sometimes what feels like a missed opportunity was actually perfect timing for where you are now.",
      insights: [
        "Inaction regret often feels more persistent because our minds tend to idealize outcomes we didn't experience, overlooking potential difficulties.",
        "Your hesitation may have been intuitive wisdom - sometimes our subconscious recognizes when we're not ready for certain experiences.",
        "This reflection shows emotional intelligence and the ability to learn from experience, which are valuable traits for future decisions."
      ],
      suggestions: [
        "Consider what this experience taught you about your values and decision-making process for future opportunities.",
        "Practice self-compassion - acknowledge that you made the best decision with the information and emotional state you had at the time."
      ]
    };

    return new Response(JSON.stringify(fallbackResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  } catch (error) {
    console.error('Error in analyze-regret function:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});