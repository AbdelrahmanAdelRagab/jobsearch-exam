import User from './userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// function for user signup

const signUp = async (req, res) => {
  const { firstName, lastName, email, password, recoveryEmail, DOB, mobileNumber, role } = req.body;

  try {    // Check if a user exists

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }


    // hashing password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user 
    const user = await User.create({
      firstName,
      lastName,
      username: `${firstName} ${lastName}`,
      email,
      password: hashedPassword, // Store the hashed password
      recoveryEmail,
      DOB,
      mobileNumber,
      role
    });
 // Respond with the user's id, username, email, and a token "You're IN"
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id)  // Generate token
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' }); //Handling errors 
  }
};
// function for user sign-in
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
        // Find the user by email

    const user = await User.findOne({ email });
        // does user exist ?

    if (user && (await bcrypt.compare(password, user.password))) {
      user.status = 'online'; 
      await user.save();

      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export { signUp, signIn };


