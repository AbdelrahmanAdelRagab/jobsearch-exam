import jwt from 'jsonwebtoken';
import User from '../user/userModel.js';


// Middleware function to protect routes

const protect = async (req, res, next) => {
  let token;
  // Check if the authorization header contains a Bearer token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
            // Extract the token from the authorization header

      token = req.headers.authorization.split(' ')[1];


            // Verify the token and decode the payload

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

            // Call the next middleware function in the stack

      next();
    } catch (error) {  // Respond with an error if no token is provided

      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export { protect };
