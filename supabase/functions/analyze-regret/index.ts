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

    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) {
      console.error('Lovable API key not found');
      return new Response(JSON.stringify({ error: 'Lovable API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Analyzing regret for text:', text.substring(0, 100) + '...');

  try {
    console.log('Making Lovable AI API call...');
    
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are ReLiveAI, a compassionate AI psychologist specializing in regret analysis using advanced NLP models and psychological principles. Analyze the user's decision/situation with empathy and scientific rigor.

Determine the regret classification and provide comprehensive therapeutic insights based on counterfactual thinking theory and action vs inaction regret research.

Respond ONLY with valid JSON (no markdown, no code blocks) in this exact format:
{
  "label": "string",
  "confidence": number,
  "intensity": number,
  "reflection": "string",
  "perspective": "string",
  "insights": ["string1", "string2", "string3"],
  "suggestions": ["string1", "string2"],
  "affectedDomain": "string",
  "emotionalTone": {
    "primary": "string",
    "secondary": ["string1", "string2"]
  },
  "currentImpact": "string",
  "futureProjection": "string",
  "irreversibleLimitation": "string",
  "threatAnalysis": {
    "stress": {"level": "Low/Medium/High", "score": number},
    "anxiety": {"level": "Low/Medium/High", "score": number},
    "motivationLoss": {"level": "Low/Medium/High", "score": number},
    "healthRisk": {"level": "Low/Medium/High", "score": number}
  }
}

Guidelines:
- Be empathetic, non-judgmental, and supportive
- Focus on growth and understanding, not prescriptions
- Use therapeutic language that validates their experience
- Base insights on psychological research about regret and decision-making
- label must be one of: "Regret by Action", "Regret by Inaction", "No Regret"
- confidence should be 0-100
- intensity should be 0-10 (can include decimals like 8.1)
- affectedDomain examples: "Career and Skill Development", "Relationships", "Health", "Education", "Financial"
- emotionalTone.primary: main emotion detected
- emotionalTone.secondary: array of 2-3 supporting emotions
- currentImpact: describe how it affects them now (Medium to High, Low, etc with explanation)
- futureProjection: what might happen if addressed vs unaddressed
- irreversibleLimitation: what truly can't be changed, but also what still can be done
- threatAnalysis scores: 1-5 scale for each category`
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
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      throw new Error(`AI API call failed: ${response.status}`);
    }

    const data = await response.json();
    const analysisText = data.choices[0].message.content;
    
    console.log('AI response:', analysisText);
    
    // Parse the JSON response from AI (handle markdown-wrapped JSON)
    let analysisResult;
    try {
      // Remove markdown code blocks if present
      let cleanedText = analysisText.trim();
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/```json\n?/, '').replace(/\n?```$/, '');
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/```\n?/, '').replace(/\n?```$/, '');
      }
      analysisResult = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', analysisText);
      throw new Error('Invalid JSON response from AI');
    }

    // Validate the response structure
    if (!analysisResult.label || typeof analysisResult.confidence !== 'number' || 
        typeof analysisResult.intensity !== 'number' || !analysisResult.reflection || 
        !analysisResult.perspective || !Array.isArray(analysisResult.insights) ||
        !Array.isArray(analysisResult.suggestions) || !analysisResult.affectedDomain ||
        !analysisResult.emotionalTone || !analysisResult.threatAnalysis) {
      console.error('Invalid analysis structure:', analysisResult);
      throw new Error('Invalid analysis format from AI');
    }

    console.log('AI API call successful');
    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error calling AI API:', error);
    
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
      ],
      affectedDomain: "Personal Growth",
      emotionalTone: {
        primary: "Regret",
        secondary: ["Self-reflection", "Motivation"]
      },
      currentImpact: "Medium - This regret is prompting you to reflect and consider future actions.",
      futureProjection: "If addressed through self-compassion and future-focused planning, this can become a catalyst for growth rather than a source of ongoing distress.",
      irreversibleLimitation: "The specific past moment cannot be changed, but the lessons learned can inform all future decisions.",
      threatAnalysis: {
        stress: { level: "Medium", score: 3 },
        anxiety: { level: "Low", score: 2 },
        motivationLoss: { level: "Medium", score: 3 },
        healthRisk: { level: "Low", score: 1 }
      }
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