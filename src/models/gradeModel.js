/** @format */

const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema(
  {
    grade_name: {
      type: String,
      required: [true, "please provide grade name"],
    },
    less_than:{
        type:Number,
        required: [true, "please provide less_than percentage"],
    },
    greater_than:{
        type:Number,
        required: [true, "please provide greater_than percentage"],
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Grades", gradeSchema);
