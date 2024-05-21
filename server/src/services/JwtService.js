const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generalAccessToken = async (payload) => {
  const access_token = jwt.sign(
    {
      ...payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: '1h' }
  );
  return access_token;
};

const generalRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    {
      ...payload,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: '365d' }
  );
  return refresh_token;
};

const refreshTokenService = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          return resolve({
            status: 'ERROR',
            message: 'Authentication failed!',
          });
        }

        const access_token = await generalAccessToken({
          id: user?.id,
          isAdmin: user?.isAdmin,
        });

        return resolve({
          status: 'OK',
          message: 'Success!',
          access_token,
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  generalAccessToken,
  generalRefreshToken,
  refreshTokenService,
};
