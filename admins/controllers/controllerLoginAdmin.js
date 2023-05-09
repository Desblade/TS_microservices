const { db } = require('../db');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { createToken } = require('../utils/createToken');

const controllerLoginAdmin = async (req, res) => {
  try {
    const { login, password } = req.body;
    const errs = validationResult(req);

    if (!errs.isEmpty()) {
      return res.status(400).json({ message: 'Заполните все поля' });
    }

    const admin = await db('admins')
      .select(['id', 'login', 'password', 'role'])
      .where({ login })
      .first();

    if (!admin) {
      return res.status(400).json({ message: 'Неправильный логин или пароль' });
    }

    const comparePassword = await bcrypt.compare(password, admin.password);

    if (!comparePassword) {
      return res.status(400).json({ message: 'Неправильный логин или пароль' });
    }

    const token = await createToken({
      id: admin.id,
      login: admin.login,
      role: admin.role,
    });

    return res.json({ token });
  } catch (e) {
    console.error(e);

    return res.status(500).json({ message: 'Не удалось авторизоваться' });
  }
};

module.exports = {
  controllerLoginAdmin,
};
