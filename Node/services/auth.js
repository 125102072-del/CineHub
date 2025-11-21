const Customer = require("../models/Customer");

const login = async (requestBody) => {

    const { email, password } = requestBody;
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    const customer = await Customer.findOne({ email });
    if (!customer) {
      throw new Error("Email does not exist");
    }
    if (customer.password !== password) {
      throw new Error("Incorrect password");
    }
    return {
      message: "Login successful",
      data: {
        id: customer.customer_id,
        username: customer.username,
        email: customer.email,
        phone_number: customer.phone_number
      }
    };
  };
  

  const register = async ({ userId, username, password }) => {
    // logic to registerif (!password || !username) {

    const {email,phone_number,age} = userId;


    const checkCustomer = await Customer.findOne({ email });
      if (checkCustomer) {
      throw new Error("Account already exists");
    }

      const customer_id = Math.floor(Math.random()*50) + 1;

      const newCustomer = await Customer.create({
  customer_id,
  username,
  email,
  phone_number,
  profile_photo: "",
  age,
  password,
  created_at: new Date()
  }
);

return {
data: {
id: newCustomer.customer_id,
username: newCustomer.username,
email: newCustomer.email,
phone_number: newCustomer.phone_number
}
};
}
  
module.exports = { login, register };