const express = require('express');
const { db } = require('./db');
const router = require('./routers/index');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(router);

db.migrate.latest();

const start = async () => {
  try {
    await app.listen(PORT, '0.0.0.0', () => {
      console.log(`http://localhost:${PORT}`);
    })
  } catch (e) {
    console.error(`Не удалось запустить микросервис articles: ${e}`);
  }
};

start();
