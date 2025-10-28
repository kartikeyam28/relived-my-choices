import { GoogleGenerativeAI } from "@google/generative-ai";

// You can set your API key here or pass it dynamically
// For production, use environment variables: import.meta.env.VITE_GEMINI_API_KEY
let apiKey = "";

export const setGeminiApiKey = (key: string) => {
  apiKey = key;
};

export const getGeminiApiKey = () => {
  return apiKey || import.meta.env.VITE_GEMINI_API_KEY || "";
};

interface AnalysisResult {
  label: string;
  confidence: number;
  intensity: number;
  reflection: string;
  perspective: string;
  insights: string[];
  suggestions: string[];
  affectedDomain: string;
  emotionalTone: {
    primary: string;
    secondary: string[];
  };
  currentImpact: string;
  futureProjection: string;
  irreversibleLimitation: string;
  threatAnalysis: {
    stress: { level: string; score: number };
    anxiety: { level: string; score: number };
    motivationLoss: { level: string; score: number };
    healthRisk: { level: string; score: number };
  };
}

// Helper function to wait/delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Retry with exponential backoff
const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      const isLastAttempt = attempt === maxRetries - 1;
      const isOverloaded = error?.message?.includes('overloaded') || 
                          error?.message?.includes('503') ||
                          error?.message?.includes('429');
      
      if (isLastAttempt || !isOverloaded) {
        throw error;
      }
      
      // Exponential backoff: 1s, 2s, 4s
      const waitTime = baseDelay * Math.pow(2, attempt);
      console.log(`Model overloaded. Retrying in ${waitTime}ms... (Attempt ${attempt + 1}/${maxRetries})`);
      await delay(waitTime);
    }
  }
  throw new Error('Max retries reached');
};

export const analyzeWithGemini = async (text: string): Promise<AnalysisResult> => {
  const key = getGeminiApiKey();
  
  if (!key) {
    throw new Error("Gemini API key is not set. Please configure your API key.");
  }

  const genAI = new GoogleGenerativeAI(key);
  
  // Models to try in order (fallback strategy)
  const models = [
    "gemini-2.5-flash",
    "gemini-1.5-flash", 
    "gemini-pro"
  ];

  const prompt = `You are ReLiveAI, a compassionate AI psychologist. Analyze this decision with empathy and provide insights.

Respond with valid JSON in this exact format:
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
- Be empathetic and supportive
- label: "Regret by Action", "Regret by Inaction", or "No Regret"
- confidence: 0-100
- intensity: 0-10 (decimals ok)
- affectedDomain: Career, Relationships, Health, Education, or Financial
- emotionalTone.secondary: array of 2-3 emotions
- threatAnalysis scores: 1-5 scale

Decision: ${text}`;

  // Try multiple models with retry logic
  let lastError: Error | null = null;
  
  for (const modelName of models) {
    try {
      console.log(`Trying model: ${modelName}`);
      
      const model = genAI.getGenerativeModel({ 
        model: modelName,
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 2048,
          responseMimeType: "application/json",
        },
      });

      // Wrap the API call with retry logic
      const analysisResult = await retryWithBackoff(async () => {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const analysisText = response.text();
        
        // Remove markdown code blocks if present
        let cleanedText = analysisText.trim();
        if (cleanedText.startsWith('```json')) {
          cleanedText = cleanedText.replace(/```json\n?/, '').replace(/\n?```$/, '');
        } else if (cleanedText.startsWith('```')) {
          cleanedText = cleanedText.replace(/```\n?/, '').replace(/\n?```$/, '');
        }
        
        const parsed: AnalysisResult = JSON.parse(cleanedText);
        
        // Validate the response structure
        if (!parsed.label || typeof parsed.confidence !== 'number' || 
            typeof parsed.intensity !== 'number' || !parsed.reflection || 
            !parsed.perspective || !Array.isArray(parsed.insights) ||
            !Array.isArray(parsed.suggestions) || !parsed.affectedDomain ||
            !parsed.emotionalTone || !parsed.threatAnalysis) {
          throw new Error('Invalid analysis format from Gemini AI');
        }
        
        return parsed;
      }, 3, 1000);
      
      // Success! Return the result
      console.log(`Successfully analyzed with model: ${modelName}`);
      return analysisResult;
      
    } catch (error) {
      console.error(`Failed with model ${modelName}:`, error);
      lastError = error as Error;
      
      // If this is not an overload error, don't try other models
      const errorMsg = (error as Error).message;
      if (!errorMsg.includes('overloaded') && !errorMsg.includes('503') && !errorMsg.includes('429')) {
        break;
      }
      
      // Continue to next model
      continue;
    }
  }

  // All models failed
  console.error('All models failed. Last error:', lastError);
  
  if (lastError) {
    if (lastError.message.includes('API key')) {
      throw new Error('Invalid API key. Please check your Gemini API key.');
    } else if (lastError.message.includes('overloaded') || lastError.message.includes('503')) {
      throw new Error('Gemini AI is currently experiencing high traffic. Please try again in a few moments.');
    } else if (lastError.message.includes('JSON')) {
      throw new Error('Failed to parse AI response. Please try again.');
    }
    throw lastError;
  }
  
  throw new Error('Failed to analyze with Gemini AI. Please try again.');
};
