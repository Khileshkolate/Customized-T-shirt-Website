const axios = require('axios');

async function testFetch() {
  try {
    const res = await axios.get('http://127.0.0.1:5000/api/mockups');
    console.log('STATUS:', res.status);
    console.log('BODY:', JSON.stringify(res.data, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('FETCH ERROR:', err.message);
    process.exit(1);
  }
}

testFetch();
