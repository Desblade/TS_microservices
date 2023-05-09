const express = require('express');
const router = require('./routers/index');
const { db } = require('./db');

const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(router);

db.migrate.latest();

const start = async () => {
  try {
    await app.listen(PORT, '0.0.0.0', () => {
      console.log(`http://localhost:${PORT}`);
    })
  } catch (e) {
    console.error(`Не удалось запустить микросервис users: ${e}`);
  }
};

start();
