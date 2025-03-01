import llmService from "../services/llmService.js";

// Controller to handle patient data analysis
const analyzePatient = async (req, res) => {
  try {
    // Extract patient data from the request body
    const patientData = req.body;

    // Validate that patient data is provided
    if (!patientData || Object.keys(patientData).length === 0) {
      return res.status(400).json({ error: "Patient data is required" });
    }

    // Call the LLM service to analyze the patient data
    const response = await llmService.analyzePatient(patientData);

    // Send the response back to the client
    res.status(200).json(response);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const patientDiet = async (req, res) => {
    try {
      // Extract patient data from the request body
      const patientData = req.body;
  
      // Validate that patient data is provided
      if (!patientData || Object.keys(patientData).length === 0) {
        return res.status(400).json({ error: "Patient data is required" });
      }
  
      // Call the LLM service to analyze the patient data
      const response = await llmService.patientDiet(patientData);
  
      // Send the response back to the client
      res.status(200).json(response);
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };


const requiredMedications = async (req, res) => {
    try {
      // Extract patient data from the request body
      const patientData = req.body;
  
      // Validate that patient data is provided
      if (!patientData || Object.keys(patientData).length === 0) {
        return res.status(400).json({ error: "Patient data is required" });
      }
  
      // Call the LLM service to analyze the patient data
      const response = await llmService.requiredMedications(patientData);
  
      // Send the response back to the client
      res.status(200).json(response);
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };

export default { analyzePatient , patientDiet , requiredMedications };