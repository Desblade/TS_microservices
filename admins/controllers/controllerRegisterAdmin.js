const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { db } = require('../db');
const { createToken } = require('../utils/createToken');

const controllerRegisterAdmin = async (req, res) => {
  try {
    const { name, surname, login, password } = req.body;
    const errs = validationResult(req);

    if (!errs.isEmpty()) {
      return res.status(400).json({ message: 'Заполните все поля' });
    }

    const admin = await db('admins')
      .select(['id', 'login', 'role'])
      .where({ login })
      .first();

    if (admin) {
      return res.status(400).json({ message: 'Пользователь с таким логином уже существует' });
    }

    const passwordHash = await bcrypt.hash(password, 5);

    const registerAdmin = await db('admins')
      .insert({
        name,
        surname,
        login,
        password: passwordHash,
        role: 'admin',
      })
      .returning('*');

    const [adminForToken] = registerAdmin;

    const token = await createToken({
      id: adminForToken.id,
      login: adminForToken.login,
      role: adminForToken.role,
    });

    return res.json({ token });
  } catch (e) {
    console.error(e);

    return res.status(500).json({ message: 'Не удалось зарегестрироваться' });
  }
};

module.exports = {
  controllerRegisterAdmin,
};
