/** @format */

const mongoose = require("mongoose");
const marks = require("./marksModel");
const studentSchema = new mongoose.Schema(
  {
    student_Id: { type: String },
    student_Name: {
      type: String,
      required: [true, "please provide student name"],
    },
    standard: { type: String, required: [true, "please provide standard"] },
    marks: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Marks",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("student", studentSchema);
