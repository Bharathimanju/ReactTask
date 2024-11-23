const mongoose = require('mongoose');

// Define the schema for the Beneficiary model
const BeneficiarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  relationship: { type: String, required: true },
  dob: { type: String, required: true },
  status: { type: String, required: true },
});

// Create the Beneficiary model
const Beneficiary = mongoose.model("Beneficiary", BeneficiarySchema);

// Export the model to use it in other parts of the app
module.exports = Beneficiary;
