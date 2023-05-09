const { db } = require('../db');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { createToken } = require('../utils/createToken');

const controllerLoginUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    const errs = validationResult(req);

    if (!errs.isEmpty()) {
      return res.status(400).json({ message: 'Заполните все поля' });
    }

    const user = await db('users')
      .select(['id', 'login', 'password', 'role'])
      .where({ login })
      .first();

    if (!user) {
      return res.status(400).json({ message: 'Неправильный логин или пароль' });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(400).json({ message: 'Неправильный логин или пароль' });
    }

    const token = await createToken({
      id: user.id,
      login: user.login,
      role: user.role,
    });

    return res.json({ token });
  } catch (e) {
    console.error(e);

    return res.status(500).json({ message: 'Не удалось авторизоваться' });
  }
};

module.exports = {
  controllerLoginUser,
};
