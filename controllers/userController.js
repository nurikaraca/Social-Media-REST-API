const User = require("../models/User");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");

//register

const register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .json({
          message:
            "This email address is already in use. Please use a different email address for registration.",
        });
    }

    if (password.length < 6 || password.length > 12) {
      res
        .status(400)
        .json({
          message:
            "Password must be at least 6 characters and at most 12 characters long",
        });
    }

    //generate new password
    const passwordHash = await bcrypt.hash(password, 10);

    if (!isEmail(email)) {
      res.status(400).json({ message: "Invalid email address" });
    }

    //create new user
    const newUser = await User.create({ ...req.body, password: passwordHash });
    res.status(201).json({newUser})

  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const  login = async (req,res,next) =>{
  const { email, password} = req.body
  try {
    const user = await User.findOne({email:email})
    if(!user){
      return  res.status(400).json({message: "There's no account associated with this email address"})
    }

    const passwordCompare = await bcrypt.compare(password,user.password)
    if(!passwordCompare) {
      return res.status(400).json({message:"The passwords do not match."})
    }
    const token = await jwt.sign({id:user._id}, process.env.SECRET_KEY,{expiresIn:'1h'} )
    res.status(200).json({message:"Login successful" , token: token , user});
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error"});
  }
}

function isEmail(emailAdress) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailAdress.match(regex)) return true;
  else return false;
}

module.exports = { register,login };
