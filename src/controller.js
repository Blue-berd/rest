/** @format */
const Student = require("./models/studentModel");
const Marks = require("./models/marksModel");
const ApiFeatures = require("./apiFeatures");
const Grades = require("./models/gradeModel");

const createStudent = async (req, res) => {
  try {
    if (!req.body.student_name) {
      return res
        .status(400)
        .send("student name is either undefined, null or false!");
    }

    if (!req.body.standard) {
      return res
        .status(400)
        .send("standard is either undefined, null or false!");
    }

    const { student_name, standard } = req.body;
    // const student_name = first_Name + " " + last_Name;
    const data = { student_name, standard };
    await Student.create(data);
    res.status(201).send({ status: "Success", data });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const fetchStudents = async (req, res) => {
  try {
    const filter = ApiFeatures(Student.find(), req.query)
      .filter()
      .sort()
      .paginate();
    const data = await filter;

    res.status(200).send({ status: "Success", data });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const addMarks = async (req, res) => {
  try {
    if (!req.body.student_rollnumber) {
      return res
        .status(400)
        .send("student_rollnumber is either undefined, null or false!");
    }
    if (!req.body.student_name) {
      return res
        .status(400)
        .send("student_name is either undefined, null or false!");
    }
    if (!req.body.marks) {
      return res.status(400).send("marks is either undefined, null or false!");
    }
    if (!req.body.subject) {
      return res
        .status(400)
        .send("subject is either undefined, null or false!");
    }
    if (!req.body.test_date) {
      return res
        .status(400)
        .send("test_date is either undefined, null or false!");
    }

    const { student_rollnumber, student_name, marks, subject, test_date } =
      req.body;
    const data = {
      student_rollnumber,
      student_name,
      marks,
      subject,
      test_date,
    };
    await Marks.create(data);
    res.status(201).send({ status: "Success", data });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const fetchResults = async (req, res) => {
  try {
    const data = await Student.find().select("student_Name marks");
    const all_grades = await Grades.find();

    const result = data.map((item) => {
      const total_percentage = item.marks.map(
        async (el, total_marks, total_max_marks) => {
          const marks = await Marks.findOne(el);
          total_marks += marks.marks;
          total_max_marks += marks.max_marks;
          const percentage = (total_marks / total_max_marks) * 100;
          const resultSheet = { total_marks, total_max_marks, percentage };
          return resultSheet;
        }
      );
      item[result] = total_percentage;
      const grades = all_grades.map((el) => {
        const { percentage } = total_percentage;
        if (percentage >= el.greater_than && percentage <= el.less_than) {
          return el.grade_name;
        }
      });
      item[grades] = grades;
      return item;
    });

    res.status(200).send({ status: "Success", data });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const generate_Rollnumber = async (req, res) => {
  try {
    const standard = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
    ];

    standard.forEach(async (el) => {
      let students = await Student.find({ standard: el }).sort(student_Name);

      students.forEach(async (item, index) => {
        const rollnum = el + "0" + index;
        await Student.findByIdAndUpdate(item[_id], {
          $set: { student_Id: rollnum },
        });
        item['student_Id'] = rollnum;
      });
    });

    res.status(201).send({ status: "Success", data:students });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  createStudent,
  addMarks,
  fetchStudents,
  fetchResults,
  generate_Rollnumber,
};
