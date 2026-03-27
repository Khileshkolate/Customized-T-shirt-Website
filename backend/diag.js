const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

async function checkDB() {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/custom_printing_db';
    await mongoose.connect(uri);
    
    const db = mongoose.connection.db;
    const mockupCollection = db.collection('mockups');
    
    const allRecords = await mockupCollection.find({}).toArray();
    
    const result = {
      total: allRecords.length,
      uploaded: allRecords.filter(r => r.imageUrl).length,
      samples: allRecords.filter(r => r.imageUrl).slice(0, 5),
      oneEmpty: allRecords.filter(r => !r.imageUrl)[0]
    };

    fs.writeFileSync('diag_output.json', JSON.stringify(result, null, 2));
    console.log('Diagnostic data written to diag_output.json');

    mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('DATABASE ERROR:', err);
    process.exit(1);
  }
}

checkDB();
