import llmService from "../services/llmService.js";
import Vitals from "../models/model.vitals.js";


const upsertVitals = async (req, res) => {
    try {
        // Extract data from request body
        const { patient_id, vitalSigns } = req.body;

        // Validate input
        if (!patient_id || !vitalSigns) {
            return res.status(400).json({ error: "Patient ID and vital signs are required" });
        }

        // Check if vitals already exist for this patient
        const existingVital = await Vitals.findOne({ patient_id });

        let savedVitalSigns;

        if (existingVital) {
            // Update existing vital signs document
            existingVital.heartRate = vitalSigns.heartRate;
            existingVital.respiratoryRate = vitalSigns.respiratoryRate;
            existingVital.bodyTemperature = vitalSigns.bodyTemperature;
            existingVital.oxygenSaturation = vitalSigns.oxygenSaturation;
            existingVital.bloodPressure = vitalSigns.bloodPressure;
            existingVital.painLevel = vitalSigns.painLevel;
            existingVital.glucose = vitalSigns.glucose;

            // Save updated vital signs document to database
            savedVitalSigns = await existingVital.save();
        } else {
            // Create new vital signs document
            const newVitalSigns = new Vitals({
                patient_id,
                heartRate: vitalSigns.heartRate,
                respiratoryRate: vitalSigns.respiratoryRate,
                bodyTemperature: vitalSigns.bodyTemperature,
                oxygenSaturation: vitalSigns.oxygenSaturation,
                bloodPressure: vitalSigns.bloodPressure,
                painLevel: vitalSigns.painLevel,
                glucose: vitalSigns.glucose
            });

            // Save new vital signs document to database
            savedVitalSigns = await newVitalSigns.save();
        }

        // Generate response using LLM service
        const response = await llmService.analyzeVitals(vitalSigns);

        // Send response back to client
        res.status(200).json(response);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getVitals = async (req, res) => {
    try {
        // Extract patient ID from request parameters
        const { patient_id } = req.params;

        // Validate input
        if (!patient_id) {
            return res.status(400).json({ error: "Patient ID is required" });
        }

        // Find the patient first
        const patient = await Vitals.findOne({ patient_id });

        if (!patient) {
            return res.status(404).json({ error: "Patient not found" });
        }

        // Generate response using LLM service
        const response = await llmService.analyzeVitals(patient);

        // Send response back to client
        res.status(200).json(response);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const generateReport = async (req, res) => {
  try {
    // Extract patient id from params
    const { patient_id } = req.params;

    // Validate input
    if (!patient_id) {
      return res.status(400).json({ error: "Patient ID is required" });
    }

    // Call the LLM service to generate the report
    const response = await llmService.generateReport(patient_id);

    // Send the response back to the client
    res.status(200).json(response);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default { upsertVitals, getVitals, generateReport };