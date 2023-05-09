const { db } = require('../db');

const controllerDeleteArticle = async (req, res) => {
  try {
    const { id } = req.query;
    const { user } = req;

    const article = await db('articles')
      .select(['id', 'creatorId'])
      .where({ id })
      .first();

    if (!article) {
      return res.status(404).json({ message: 'Не удалось найти статью' });
    }

    if (user.id === article.creatorId || user.role === 'admin') {
      await db('articles')
        .where({ id })
        .del();

      return res.sendStatus(200);
    }

    return res.status(400).json({ message: 'Вы не можете удалить эту статью' });
  } catch (e) {
    console.error(e);

    return res.status(500).json({ message: 'Не удалось удалить статью' });
  }
};

module.exports = {
  controllerDeleteArticle,
};
