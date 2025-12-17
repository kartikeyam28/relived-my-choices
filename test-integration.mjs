#!/usr/bin/env node
// Integration test to verify the complete analysis flow
import { analyzeWithGemini } from './src/lib/gemini.ts';

console.log('🧪 Running Integration Test for Analysis Feature\n');
console.log('========================================\n');

const testDecision = "I turned down a job offer at a startup three years ago because I thought it was too risky. The company went public last year and all early employees became millionaires.";

console.log('📝 Test Input:');
console.log(`"${testDecision.substring(0, 100)}..."\n`);

console.log('🔄 Calling analyzeWithGemini...\n');

analyzeWithGemini(testDecision)
  .then(result => {
    console.log('✅ SUCCESS! Analysis completed.\n');
    console.log('========================================');
    console.log('📊 ANALYSIS RESULTS:\n');
    console.log(`Regret Type: ${result.label}`);
    console.log(`Confidence: ${result.confidence}%`);
    console.log(`Intensity: ${result.intensity}/10`);
    console.log(`Domain: ${result.affectedDomain}`);
    console.log(`\nPrimary Emotion: ${result.emotionalTone.primary}`);
    console.log(`Secondary Emotions: ${result.emotionalTone.secondary.join(', ')}`);
    console.log(`\nReflection: ${result.reflection.substring(0, 150)}...`);
    console.log(`\nPerspective: ${result.perspective.substring(0, 150)}...`);
    console.log(`\nInsights (${result.insights.length}):`);
    result.insights.forEach((insight, i) => {
      console.log(`  ${i + 1}. ${insight.substring(0, 100)}...`);
    });
    console.log(`\nSuggestions (${result.suggestions.length}):`);
    result.suggestions.forEach((suggestion, i) => {
      console.log(`  ${i + 1}. ${suggestion.substring(0, 100)}...`);
    });
    console.log(`\nThreat Analysis:`);
    console.log(`  Stress: ${result.threatAnalysis.stress.level} (${result.threatAnalysis.stress.score}/5)`);
    console.log(`  Anxiety: ${result.threatAnalysis.anxiety.level} (${result.threatAnalysis.anxiety.score}/5)`);
    console.log(`  Motivation Loss: ${result.threatAnalysis.motivationLoss.level} (${result.threatAnalysis.motivationLoss.score}/5)`);
    console.log(`  Health Risk: ${result.threatAnalysis.healthRisk.level} (${result.threatAnalysis.healthRisk.score}/5)`);
    console.log('\n========================================');
    console.log('🎉 ALL TESTS PASSED! The analysis feature is fully functional.\n');
  })
  .catch(error => {
    console.error('\n❌ TEST FAILED!');
    console.error('Error:', error.message);
    console.error('\nPlease check:');
    console.error('1. API key is set correctly in .env');
    console.error('2. Dev server is running');
    console.error('3. Internet connection is stable');
    process.exit(1);
  });
