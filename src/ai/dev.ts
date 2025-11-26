
import { config } from 'dotenv';
config(); // Load .env variables

// Import your flows here to make them available for local Genkit tools (like Flow UI)
import '@/ai/flows/enhance-medicine-search';
import '@/ai/flows/generate-medicine-details';
import '@/ai/flows/extract-medicines-from-image';

console.log("Genkit dev environment initialized. Flows enhance-medicine-search, generate-medicine-details, and extract-medicines-from-image are registered.");
