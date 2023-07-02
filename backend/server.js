const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Define a route for file upload
app.post('/api/upload', upload.array('files'), (req, res) => {
  // Access the uploaded files via req.files
  console.log(req.files);

  // Perform operations on the files
  // For example, you can store them, process their content, etc.

  res.json({ message: 'Files uploaded successfully.' });
});

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
const port = 3500;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
