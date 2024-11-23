const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());



// Define the schema for "Beneficiary"
const BeneficiarySchema = new mongoose.Schema({
    name: String,
    relationship: String,
    dob: String,
    status: String,
});

const BeneficiaryModel = mongoose.model("Beneficiary", BeneficiarySchema);

// MongoDB connection (local or Atlas)
mongoose.connect("mongodb://127.0.0.1:27017/beneficiaries", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// POST: Insert new beneficiary data
app.post("/insert", async (req, res) => {
    const { name, relationship, dob, status } = req.body;

    const newBeneficiary = new BeneficiaryModel({
        name,
        relationship,
        dob,
        status,
    });

    try {
        await newBeneficiary.save();
        res.status(201).send("Beneficiary added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error inserting beneficiary: " + err.message);
    }
});

// GET: Read all beneficiaries
app.get("/reads", async (req, res) => {
    try {
        const beneficiaries = await BeneficiaryModel.find({});
        res.status(200).send(beneficiaries);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching beneficiaries: " + err.message);
    }
});

// PUT: Update beneficiary data
app.put("/update", async (req, res) => {
    const { id, newName, newRelationship, newDob, newStatus } = req.body;

    try {
        const updatedBeneficiary = await BeneficiaryModel.findByIdAndUpdate(
            id,
            { newName, newRelationship, newDob, newStatus },
            { new: true }  // Return the updated document
        );

        if (!updatedBeneficiary) {
            return res.status(404).send("Beneficiary not found");
        }

        res.status(200).send("Beneficiary updated successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating beneficiary: " + err.message);
    }
});

// DELETE: Delete beneficiary by ID
app.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error("Invalid ID format:", id);
        return res.status(400).send("Invalid ID format");
    }

    try {
        const deletedBeneficiary = await BeneficiaryModel.findByIdAndRemove(id);
        if (!deletedBeneficiary) {
            console.error("Beneficiary not found for deletion:", id);
            return res.status(404).send("Beneficiary not found");
        }
        console.log("Beneficiary deleted successfully:", deletedBeneficiary);
        res.status(200).send("Beneficiary deleted successfully");
    } catch (err) {
        console.error("Error deleting beneficiary:", err.message);
        res.status(500).send("Error deleting beneficiary: " + err.message);
    }
});



// General error handler (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(3002, () => {
    console.log("Server is running on http://localhost:3002");
});



