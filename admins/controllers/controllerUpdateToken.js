const { createToken } = require('../utils/createToken');

const controllerUpdateToken = async (req, res) => {
  const { admin } = req;
  const token = await createToken({
    id: admin.id,
    login: admin.login,
    role: admin.role,
  });

  return res.json({ token });
};

module.exports = {
  controllerUpdateToken,
};
