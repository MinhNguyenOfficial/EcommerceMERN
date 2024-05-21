const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { generalAccessToken, generalRefreshToken } = require('./JwtService');

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser;
    try {
      const isExistdUser = await User.findOne({ email: email });
      if (isExistdUser !== null) {
        resolve({
          status: 'ERROR',
          message: 'Email is existed!',
        });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
      });

      if (createdUser) {
        resolve({
          status: 'OK',
          message: 'Success',
          data: createdUser,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;

    try {
      const user = await User.findOne({ email: email });

      if (user === null) {
        resolve({
          status: 'ERROR',
          message: 'Email or password is incorrect!',
        });
      }

      const comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        resolve({
          status: 'OK',
          message: 'Email or password is invalid!',
        });
      }

      const access_token = await generalAccessToken({
        id: user.id,
        isAdmin: user.isAdmin,
      });

      const refresh_token = await generalRefreshToken({
        id: user.id,
        isAdmin: user.isAdmin,
      });

      resolve({
        status: 'OK',
        message: 'Success',
        access_token,
        refresh_token,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateUser = (userId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ _id: userId });

      if (user === null) {
        return resolve({
          status: 'OK',
          message: 'User not found!',
        });
      }

      const updatedUser = await User.findByIdAndUpdate(userId, data, {
        new: true,
      });

      return resolve({
        status: 'OK',
        message: 'Success!',
        updatedUser,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ _id: userId });

      if (user === null) {
        return resolve({
          status: 'OK',
          message: 'User not found!',
        });
      }

      await User.findByIdAndDelete(userId);

      return resolve({
        status: 'OK',
        message: 'Delete Success!',
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await User.find();

      if (users === null) {
        return resolve({
          status: 'OK',
          message: 'User not found!',
        });
      }

      return resolve({
        status: 'OK',
        message: 'Success!',
        data: users,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getUserDetails = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ _id: userId });

      if (user === null) {
        return resolve({
          status: 'OK',
          message: 'User not found!',
        });
      }

      return resolve({
        status: 'OK',
        message: 'Success!',
        data: user,
      });
    } catch (error) {
      reject(error);
    }
  });
};



module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getUserDetails,
};
