const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function signup(req, res) {
  try {
    const { name, email, password, role } = req.body;

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    // Saving the user to the database
    await user.save();

    // Generating JWT token with an expiration time of 1 day
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

   res.json({ email: user.email, accessToken: token });
  } catch (error) {
     res.status(500).json({ message: error.message });
 }
}

async function login(req,res){
	try{
		const{email,password}=req.body;
		
		const user=await User.findOne({email});
		
		if(!user){
			return res.status(404).json({message:'User not found'});
			
		}
		
    const isPasswordValid=await bcrypt.compare(password,user.password);
    
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
    
    const token=jwt.sign(
        {userId:user._id},
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
    );
  
      res.json({
        email:user.email,
        accessToken:token
      });
  		
  	}catch(error){
  		res.status(500).json({message:error.message});

  }
}

module.exports = { signup, login };