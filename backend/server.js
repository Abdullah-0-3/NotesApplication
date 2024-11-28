const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const notesRoutes = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/notes', notesRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});