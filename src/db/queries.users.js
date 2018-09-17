 constconst User =  User = requirerequire(("./models""./models").User;).User;
 constconst bcrypt =  bcrypt = requirerequire(("bcryptjs""bcryptjs"););

 modulemodule.exports = {.exports = {
   createUser(newUser, callback){  createUser(newUser, callback)

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    return User.create({
      email: newUser.email,
      password: hashedPassword
    })
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  }

}
