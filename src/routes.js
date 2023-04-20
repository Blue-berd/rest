/** @format */
const router = require("express").Router();
const {
  createStudent,
  fetchStudents,
  addMarks,
  fetchResults,
  generate_Rollnumber,
} = require("./controller");



router.get("/students", createStudent);

router.post("/students", fetchStudents);

router.get("/fetch_results", fetchResults);

router.post("/add_result", addMarks);

router.get("/gen_rollnumber", generate_Rollnumber);

module.exports = router;
