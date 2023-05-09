const jwt = require('jsonwebtoken');

const verifyToken = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      return reject(err);
    }
    resolve(data);
  });
});

module.exports = {
  verifyToken,
};
