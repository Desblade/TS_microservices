const { verifyToken } = require('../utils/verifyToken');

const checkTokenMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    try {
      const { id, role } = await verifyToken(token);
      req.user = { id, role };

      return next();
    } catch (e) {
      console.error(e);

      return res.status(500).json({ message: 'Вы не авторизованы' });
    }
  }
  return res.status(500).json({ message: 'Вы не авторизованы' });
};

module.exports = {
  checkTokenMiddleware,
};