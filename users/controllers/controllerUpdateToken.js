const { createToken } = require('../utils/createToken');

const controllerUpdateToken = async (req, res) => {
  const { user } = req;
  const token = await createToken({
    id: user.id,
    login: user.login,
    role: user.role,
  });

  return res.json({ token });
};

module.exports = {
  controllerUpdateToken,
};
