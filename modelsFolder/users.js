const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    username: String,
    avatarImg: String,
    githubId: String,
    url: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema, "users"); // this last parameter specifies the collection name

module.exports = User;
