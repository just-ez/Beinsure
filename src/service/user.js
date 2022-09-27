const USermodel = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwt_Secret_key, jwt_duration } = require("../core/config");

class User {
  constructor(data) {
    this.data = data;
    this.errors = [];
  }
  async getAll() {
    const user = await USermodel.find({});
    if (user) return user;
  }

  async getUserById() {
    const id = this.data;
    const user = await USermodel.find({ _id: id });
    if (user) return user;
  }

  async signup() {
    const alreadyExists = await USermodel.findOne({ email: this.data.email });
    if (!alreadyExists) {
      const createUser = new USermodel(this.data);
      const user = await createUser.save();
      if (user) {
      const checkPass = await bcrypt.compare(this.data.password, user.password);
      if (checkPass) {
        const token = jwt.sign({ _id: user._id }, jwt_Secret_key, {
          expiresIn: jwt_duration,
        });
        return token;
      }
      }
    }
  }

  async updateUser() {
    const updatedata = this.data;
    const findUser = await USermodel.findOne({ email: this.data.email });
    console.log(findUser);
    if (findUser) {
      const updated = await USermodel.updateOne(
        { email: findUser.email },
        updatedata
      );
      return updated;
    }
  }

  async login() {
    const user = await USermodel.findOne({ email: this.data.email });
    if (user) {
      const checkPass = await bcrypt.compare(this.data.password, user.password);
      if (checkPass) {
        const token = jwt.sign({ _id: user._id }, jwt_Secret_key, {
          expiresIn: jwt_duration,
        });
        return token;
      }
    }
  }
}

module.exports = User;
