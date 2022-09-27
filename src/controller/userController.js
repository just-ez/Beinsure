const User = require("../service/user");
const { success, error } = require("../utils/baseController");
const Usermodel = require('../models/user')
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await new User().getAll();
    if (users) return success(res, users, 200);
    else return error(res, 404, "user not found");
  } catch (err) {
    return error(res, 400, err);
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await new User(req.params.Id).getUserById();
    if (user) return success(res, user, 200);
    else return error(res, 404, "user not found");
  } catch (err) {
    error(res, 400, err);
  }
};

module.exports.signup = async (req, res) => {
  try {
    const user = await new User(req.body).signup();
    if (user) {
      res.cookie("Token", user, { httpOnly: true });
      res.json(user);
    //  return success(res, user, "signup sucessful");
    }
    else return error(res, 400, "user with email already exists");
  } catch (err) {
    console.log(err);
    return error(res, 400, err.message);
  }
};

module.exports.signup_get = (req,res) => {
  res.render('signup')
}

module.exports.updateUser = async (req, res) => {
  try {
    const updateUser = await new User(req.body).updateUser();
    if (updateUser) return success(res, updateUser, "user details updated");
    return error(res, 400, "unable to update user");
  } catch (err) {
    return error(res, 400, err.message);
  }
};

module.exports.login = async (req, res) => {
  try {
    const token = await new User(req.body).login();
    if (token) {
      res.cookie("Token", token, { httpOnly: true });
      res.json(token);
    }
   else return error(res, 400, "incorrect user details");
  } catch (err) {
    console.log(err);
    return error(res, 400, err);
  }
};


module.exports.login_get = (req,res) => {
  res.render('login')
}
module.exports.logout = (req,res) => {
  res.cookie("Token", '', { maxAge: 1 });
  res.redirect('/api/login')
}
module.exports.getDashboard = async (req,res) => {
  const id = req.decoded._id
  console.log(id);
 const user = await Usermodel.findById({_id: id})
 console.log(user);
 if (user) return res.render('Home',{user: user})
}