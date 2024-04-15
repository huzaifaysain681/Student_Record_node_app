// models/Student.js
const db = require('../firebaseConfig');

const Student = db.collection('students');

module.exports = Student;
