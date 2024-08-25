const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());
const processData = (data) => {
  const numbers = [];
  const alphabets = [];
  let highestLowercaseAlphabet = null;
  data.forEach(item => {
    if (/^\d+$/.test(item)) {
      numbers.push(item);
    } else if (/^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
      if (item === item.toLowerCase()) {
        if (!highestLowercaseAlphabet || item > highestLowercaseAlphabet) {
          highestLowercaseAlphabet = item;
        }
      }
    }
  });
  return { numbers, alphabets, highestLowercaseAlphabet };
};
app.post('/bfhl', (req, res) => {
  const { data } = req.body;
  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: "Invalid input format. 'data' should be an array."
    });
  }
  const userId = "1234567";
  const email = "muvvalasruthi5@gmail.com";
  const rollNumber = "AB123";
  const { numbers, alphabets, highestLowercaseAlphabet } = processData(data);
  return res.status(200).json({
    is_success: true,
    user_id: userId,
    email: email,
    roll_number: rollNumber,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
  });
});
app.get('/bfhl', (req, res) => {
  return res.status(200).json({
    operation_code: "Operation successful"
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
