import llmAgent from "../llmAgent.js";
import { SYSTEM_PROMPT_vitals ,SYSTEM_PROMPT_diet , SYSTEM_PROMPT_medications} from "../utils/constants.js";

// Service to analyze patient data using the LLM model
const analyzePatient = async (patientData) => {
  try {
    // Call the llmAgent function with the patient data
    const response = await llmAgent(JSON.stringify(patientData), SYSTEM_PROMPT_vitals);
    return response;
  } catch (error) {
    throw new Error(`Failed to analyze patient data: ${error.message}`);
  }
};
// Service to analyze patient data using the LLM model
const patientDiet = async (patientData) => {
  try {
    // Call the llmAgent function with the patient data
    const response = await llmAgent(JSON.stringify(patientData), SYSTEM_PROMPT_diet);
    return response;
  } catch (error) {
    throw new Error(`Failed to analyze patient data: ${error.message}`);
  }
};

const requiredMedications = async (patientData) => {
  try {
    // Call the llmAgent function with the patient data
    const response = await llmAgent(JSON.stringify(patientData), SYSTEM_PROMPT_medications);
    return response;
  } catch (error) {
    throw new Error(`Failed to analyze patient data: ${error.message}`);
  }
};

export default { analyzePatient , patientDiet , requiredMedications };