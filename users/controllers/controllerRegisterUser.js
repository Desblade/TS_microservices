const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { db } = require('../db');
const { createToken } = require('../utils/createToken');

const controllerRegisterUser = async (req, res) => {
  try {
    const { name, surname, login, password } = req.body;
    const errs = validationResult(req);

    if (!errs.isEmpty()) {
      return res.status(400).json({ message: 'Заполните все поля' });
    }

    const user = await db('users')
      .select(['id', 'login', 'role'])
      .where({ login })
      .first();

    if (user) {
      return res.status(400).json({ message: 'Пользователь с таким логином уже существует' });
    }

    const passwordHash = await bcrypt.hash(password, 5);

    const registerUser = await db('users')
      .insert({
        name,
        surname,
        login,
        password: passwordHash,
        role: 'user',
      })
      .returning('*');
    const [userForToken] = registerUser;

    const token = await createToken({
      id: userForToken.id,
      login: userForToken.login,
      role: userForToken.role,
    });

    return res.json({ token });
  } catch (e) {
    console.error(e);

    return res.status(500).json({ message: 'Не удалось зарегестрироваться' });
  }
};

module.exports = {
  controllerRegisterUser,
};
