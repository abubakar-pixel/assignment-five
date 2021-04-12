const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt  = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, username, password } = req.body;

  //check if all fields are present
  if (!email || !username || !password) {
    return res.status(400).send("please provide all fields.");
  }

  //check if username/email is already in database
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).send("email already exists.");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12)

  // create user
  const user = await User.create({ email, username, password: hashedPassword});

  // generate token
  const token = jwt.sign({ id: user._id }, "12345679", { expiresIn: "1h" });

  // return response
  res.status(201).json({ token });
};

const login = async (req, res) => {
    const {email, password } = req.body;

    // check if user is in the database
    let user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send("invalid credentials.");
    }

    //compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).send("invalid credentials.");
    }

     // generate token
    const token = jwt.sign({ id: user._id }, "12345679", { expiresIn: "1h" });

     // return response
    res.status(200).json({ token });
};

const verifyToken = (req, res, next) => {
    const token = req.headers;

    if (!token) {
        return res.status(401).json({ message: "Not Authorized" });
    }

    token = token.split(" ")[1];
      
    try {
        let user = jwt.verify(token, "12345679");
        console.log(user)
        return next();
    } catch (error) {
        res.status(401).json({ message: "invalid token." });
    }

    next(); 
}

module.exports = {
  register,
  login,
  verifyToken,
};
