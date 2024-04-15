// routes/csvRoutes.js
const express = require('express');
const router = express.Router();
const csvController = require('../Controllers/csvController');
const multer = require('multer');
const path = require('path'); // Node.js module for handling file paths

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure the 'uploads' directory exists
    cb(null, path.join(__dirname, '../uploads/')); // Using path.join for cross-platform compatibility
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
};

// Route for importing CSV file
router.post('/import', upload.single('csvFile'), csvController.importCSV);

// Error handling middleware
router.use(errorHandler);

module.exports = router;
