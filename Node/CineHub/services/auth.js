
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
        id: customer._id,
        username: customer.username,
        email: customer.email,
        phone_number: customer.phone_number
      }
    };
  };
  

  const register = async ({ userId, username, password }) => {
    // logic to registerif (!password || !username) {
  };
  
module.exports = { login, register };