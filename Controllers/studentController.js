
const Student=require('../models/Students')

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const snapshot = await Student.get();
    const students = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(students);
  } catch (error) {
    console.error('Error getting students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

// Get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Student.doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Student not found' });
    }
    const student = { id: doc.id, ...doc.data() };
    res.json(student);
  } catch (error) {
    console.error('Error getting student:', error);
    res.status(500).json({ error: 'Failed to fetch student' });
  }
};

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    const { name, grade } = req.body;
    const docRef = await Student.add({ name, grade });
    res.status(201).json({ id: docRef.id, name, grade });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Failed to create student' });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if any fields are provided in the request body
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'At least one field must be provided for update' });
    }

    await Student.doc(id).update(updateData);
    res.json({ message: 'Student updated successfully' });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Failed to update student' });
  }
};

// Delete student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await Student.doc(id).delete();
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Failed to delete student' });
  }
};
