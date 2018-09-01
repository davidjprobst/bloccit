const Rule = require("./models").Rule;

module.exports = {

  getAllRules(callback){
    return Rule.all()

    .then((topics) => {
      callback(null, rules);
    })
    .catch((err) => {
      callback(err);
    })
  }
}
