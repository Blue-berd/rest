/** @format */

const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema(
  {
    student_rollnumber: {
      type: String,
      required: [true, "please provide student id"],
    },
    student_name: {
      type: String,
      required: [true, "please provide student name"],
    },
    marks: {
      type: Number,
      required: [true, "please provide marks"],
    },
    max_marks: {
      type: Number,
      required: [true, "please provide max marks"],
    },
    test_date: {
      type: Date,
      required: [true, "please provide test date"],
    },
    subject: {
      type: mongoose.Schema.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Marks", marksSchema);
