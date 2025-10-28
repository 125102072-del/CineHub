const { login, register } = require("../services/auth");

const loginController = async (req, res, next) => {
  try {
  //  const response = await login(req.body);
    const data = req.body;
    if (data) {
      res
        .status(200)
        .send({ status: 200, message: "login successfull" , data : data});
    }
  } catch (error) {
    next(error);
  }
};


const registerController = async (req, res, next) => {
  try {
  //  const response = await register(req.body);
  const data = req.body;
    if (data)
      res
        .status(201)
        .send({ status: 201, message: "User registered successfully" , data : data});
  } catch (error) {
    next(error);
  }
};

module.exports = { loginController, registerController };