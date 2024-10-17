const db = require("../utils/connecton");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUserController = async (req, res) => {
  const { userName, email, password, role, mobile } = req.body;

  // Validate input
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
    // Check if the user already exists
    const [existingUser] = await db.execute(
      "SELECT * FROM user_accounts WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert the new user into the database
    await db.execute(
      "INSERT INTO user_accounts (userName, email, password, role, mobile) VALUES (?, ?, ?, ?, ?)",
      [userName, email, hashedPassword, role || "user", mobile || null]
    );

    // Retrieve the newly created user to generate a token
    const [rows] = await db.execute(
      "SELECT * FROM user_accounts WHERE email = ?",
      [email]
    );

    const newUser = rows[0];

    // Generate a token for the new user
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        role: newUser.role,
        mobile: newUser.mobile,
      },
      process.env.SECRET_KEY,
      { expiresIn: "3d" }
    );

    res.status(201).json({ message: "User registered successfully", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error registering user", error: err });
  }
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
    const [rows] = await db.execute(
      "SELECT * FROM user_accounts WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        mobile: user.mobile,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "3d",
      }
    );

    res.json({ status: true, token, message: "success" });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "Error logging in", error: err });
  }
};

module.exports = { loginUserController, registerUserController };
