const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');

const app = express();

app.use(logger('dev'));
app.use(helmet());

app.get('/', (req, res) => {
  res.status(200).send("Hello world!");
});

// start the Express server
const port = app.get('port') || 3001;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
