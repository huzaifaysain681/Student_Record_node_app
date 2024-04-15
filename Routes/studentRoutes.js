// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../Controllers/studentController');

// Routes for CRUD operations on students
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.post('/', studentController.createStudent);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
