const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: 'Authentication failed!',
        status: 'ERROR',
      });
    }

    if (user?.isAdmin) {
      return next();
    } else {
      return res.status(404).json({
        message: 'Authentication failed!',
        status: 'ERROR',
      });
    }
  });
};

const authUserMiddleware = (req, res, next) => {
  const token = req.headers.token?.split(' ')[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: 'Authentication failed!',
        status: 'ERROR',
      });
    }

    if (user?.isAdmin || user?.id === userId) {
      return next();
    } else {
      return res.status(404).json({
        message: 'Authentication failed!',
        status: 'ERROR',
      });
    }
  });
};

module.exports = { authMiddleware, authUserMiddleware };
