const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken=require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, service,pic } = req.body;
    
    if (!name || !email || !password || !service) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }
    // query of mongodb
    const userExists = await User.findOne({ email });
    
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    
    const user = await User.create({
        name,
        email,
        password,
        service,
        pic,
    });
    
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            service: user.service,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Failed to Create the User");
    }
});

const allUsers = asyncHandler(async (req, res) => {
  // like we used params in our api
  // we can also query out api
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
          { service: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
      
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});


const authUser = asyncHandler(async (req, res) => {
  const { email, password, service } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      service:user.service,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = {registerUser ,allUsers,authUser};
