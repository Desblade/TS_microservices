const { validationResult } = require('express-validator');
const { db } = require('../db');

const controllerCreateArticle = async (req, res) => {
  try {
    const { title, description } = req.body;
    const creatorId = req.user.id;
    const errs = validationResult(req);

    if (!errs.isEmpty()) {
      return res.status(400).json({ message: 'Заполните все поля' });
    }

    const createdArticle = await db('articles')
      .insert({
        title,
        description,
        creatorId,
      })
      .returning('*');

    return res.json(createdArticle[0]);
  } catch (e) {
    console.error(e);

    return res.status(500).json({ message: 'Не удалось создать статью' });
  }
};

module.exports = {
  controllerCreateArticle,
};
