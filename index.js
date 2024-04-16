const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const multer = require('multer');
const studentRoutes = require('./Routes/studentRoutes');
const csvRoutes = require('./Routes/csvRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

app.use(cors({
  origin: 'https://student-record-frontend-1y8q9y7ff-huzaifaysain681s-projects.vercel.app/' // Replace with your frontend origin
}));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this matches the destination in csvRoutes.js
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });


// Routes
app.use('/api/students', studentRoutes);
app.use('/api/csv', csvRoutes);


// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
