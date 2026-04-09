const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    age: { 
        type: Number ,required: true
    },
    gender: { 
        type: String,required: true 
    },
    diagnosis: { 
        type: String, required: true 
    },
    contact: { 
        type: String 
    }, // optional, for future
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model("Patient", patientSchema);
