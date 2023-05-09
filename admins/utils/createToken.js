const jwt = require('jsonwebtoken');

const createToken = (payload) => new Promise((resolve, reject) => {
  return jwt.sign(payload, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      return reject(err);
    }
    resolve(data);
  });
});

module.exports = {
  createToken,
};
