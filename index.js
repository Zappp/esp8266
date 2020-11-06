const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');

// add dotenv config
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const db = pgp(process.env.DATABASE_URL);

// declare our app variable
const app = express();

// middlewares
app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// first endpoint
app.get('/', async (req, res) => {
  try {
    const sensorData = await db.query('SELECT * FROM sensor_data ORDER BY current_timestamp;');

    res.status(200).send({ sensorData });
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post('/data', async (req, res) => {
  if (!req.body || req.body === {}) return res.status(400).send({ message: 'No data sent in request body' });

  const { api_key, temperature, humidity, pressure } = req.body;

  if (process.env.API_KEY !== api_key) {
    return res.status(401).send({ message: 'Wrong api key provided' });
  }

  try {
    const request = await db.query(`INSERT INTO sensor_data(temperature, humidity, pressure, date) VALUES (${temperature}, ${humidity}, ${pressure}, ${Date.now()});`);

    if (request) {
      res.send({});
    }
  } catch (error) {
    throw new Error(error.message);
    res.status(500).send(error);
  }
});

// start the Express server
const port = process.env.PORT || 3001;
const host = process.env.HOSTNAME || 'localhost';

app.listen(port, () => console.log(`Server is listening on http://${host}:${port}`));
