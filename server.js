const express = require('express');
const path = require('path');
const app = express();
const port = 3090;

app.use(express.static('dist'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

