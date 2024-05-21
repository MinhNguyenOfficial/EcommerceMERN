const UserService = require('../services/UserService');
const JwtService = require('../services/JwtService');
// {
//     "name": "test",
//     "email": "a@a",
//     "password": "123456",
//     "confirmPassword": "123456",
//     "phone": "0123456789"
// }
const createUser = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isEmail = reg.test(email);
    if (!email || !password || !confirmPassword) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'Input is required!',
      });
    } else if (!isEmail) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'Invalid email!',
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'Confirm password must be same password!',
      });
    }

    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isEmail = reg.test(email);

    if (!email || !password) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'Input is required!',
      });
    } else if (!isEmail) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'Invalid email!',
      });
    }

    const response = await UserService.loginUser(req.body);
    const { refresh_token, ...newResponse } = response;
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      domain: 'localhost',
      path: '/',
      partitioned: true,
    });
    return res.status(200).json(newResponse);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;

    if (!userId) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'User not found!',
      });
    }

    const response = await UserService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'User not found!',
      });
    }

    const response = await UserService.deleteUser(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const response = await UserService.getAllUser();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await UserService.getUserDetails(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refresh_token;
    if (!token) {
      return res.json({
        status: 'ERROR',
        message: 'Token is required!',
      });
    }
    const response = await JwtService.refreshTokenService(token);
    return res.json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      domain: 'localhost',
      path: '/',
      partitioned: true,
    });
    return res.status(200).json({
      status: 'OK',
      message: 'Logout successfully!',
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
  getAllUser,
  getUserDetails,
  refreshToken,
};
