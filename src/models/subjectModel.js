/** @format */

const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    subject_name: {
      type: String,
      required: [true, "please provide subject name"],
    },
    standard: {
      type: String,
      required: [true, "please provide standard"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Subject", subjectSchema);
