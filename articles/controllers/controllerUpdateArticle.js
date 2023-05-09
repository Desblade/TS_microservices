const { db } = require('../db');

const controllerUpdateArticle = async (req, res) => {
  try {
    const { id } = req.query;
    const { title, description } = req.body;
    const { user } = req;
    const update = {};

    if (user.role === 'admin') {
      update.editorId = user.id;
    }

    const article = await db('articles')
      .select('creatorId')
      .where({ id })
      .first();

    if (!article) {
      return res.status(404).json({ message: 'Не удалось найти статью' });
    }

    if (title) {
      if (user.id === article.creatorId || user.role === 'admin') {
        update.title = title;
      } else {
        return res.status(400).json({ message: 'Вы не можете менять оглавление статьи' });
      }
    }

    if (description) {
      if (user.id === article.creatorId || user.role === 'admin') {
        update.description = description;
      } else {
        return res.status(400).json({ message: 'Вы не можете менять описание статьи' });
      }
    }

    const updatedArticle = await db('articles')
      .where({ id })
      .update(update)
      .returning('*');

    return res.json(updatedArticle[0]);
  } catch (e) {
    console.error(e);

    return res.status(500).json({ message: 'Не удалось обновить статью' });
  }
};

module.exports = {
  controllerUpdateArticle,
};
