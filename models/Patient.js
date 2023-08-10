// models/Patient.js
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  patient_id: {
    type: String,
    required: true,
  },
  patient_name: {
    type: String,
    required: true,
  },
  patient_age: {
    type: Number,
    required: true,
  },
  patient_address: {
    type: String,
    required: true,
  },
  patient_mobileNo: {
    type: String,
    required: true,
  },
  patient_disease: {
    type: String,
    required: true,
  },
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
