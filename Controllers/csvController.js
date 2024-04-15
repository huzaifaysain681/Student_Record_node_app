// controllers/csvController.js
const csv = require('csv-parser');
const fs = require('fs');
const db = require('../firebaseConfig');

const Student = db.collection('students');

// Import CSV file and save data to Firebase
exports.importCSV = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No CSV file uploaded' });
    }

    // Create a ReadStream to read the uploaded CSV file
    const stream = fs.createReadStream(req.file.path);

    // Pipe the CSV data to the csv-parser library for parsing
    stream.pipe(csv())
      .on('error', (error) => {
        console.error('CSV parsing error:', error);
        res.status(500).json({ error: 'Failed to parse CSV' });
      })
      .on('data', async (data) => {
        try {
          // Add each parsed CSV row as a document to the Firestore collection
          await Student.add(data);
        } catch (error) {
          console.error('Error adding student to Firestore:', error);
          // Handle individual record insertion error, maybe skip the record
        }
      })
      .on('end', () => {
        // Close the ReadStream and delete the temporary CSV file
        stream.close();
        fs.unlinkSync(req.file.path);
        // Respond with success message
        res.json({ message: 'CSV data imported successfully' });
      });
  } catch (error) {
    console.error('Error importing CSV:', error);
    res.status(500).json({ error: 'Failed to import CSV' });
  }
};
