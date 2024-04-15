// firebaseConfig.js
const admin = require('firebase-admin');

const serviceAccount = require('./student-data-dd6a4-firebase-adminsdk-4kils-70a6c261f8.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'firebase-adminsdk-4kils@student-data-dd6a4.iam.gserviceaccount.com'
});

const db = admin.firestore();

module.exports = db;
