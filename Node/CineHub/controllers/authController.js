const { login, register } = require("../services/auth");

const loginController = async (req, res, next) => {
  try {
    const response = await login(req.body);

    res.status(200).json({
      status: 200,
      message: response.message,
      data: response.data
    });

  } catch (error) {
    res.status(400).json({ status: 400, error: error.message });
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