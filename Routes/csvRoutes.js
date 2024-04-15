// routes/csvRoutes.js
const express = require('express');
const router = express.Router();
const csvController = require('../Controllers/csvController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  // Optional: Handle multer errors
  onError: function(err, next) {
    console.error('Multer error:', err);
    next(err);
  }
});


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
