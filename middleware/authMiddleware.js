const jwt = require('jsonwebtoken');
const User = require('../models/user');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
      if (token == null) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
        // console.log(err);
      // If verification fails due to invalid signature or other errors,
      // it could indicate an invalid or tampered token.
      return res.status(403).json({ message: 'Invalid token' });
    }
    
    // Check if the token has expired by comparing its expiration time with current time
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    
    if (decodedToken.exp < currentTimeInSeconds) {
      return res.status(401).json({ message: 'Token has expired' });
    }
    
    req.user = decodedToken;
    next();
  });
}

async function isAdmin(req, res, next) {
    try {
      const { userId } = req.user;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    //   console.log(user);
      if (user.role !== 'admin') {
        console.log('User is not an admin');
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
module.exports = { authenticateToken, isAdmin };
  

