var query=require("../lib/mysql.js");  
  
function User(user) {
  this.name = user.name;
  this.password = user.password;
};
module.exports = User;

User.prototype.save = function save(callback) {
  var insertSql= 'INSERT INTO user SET userName =\'' + this.name + '\', password =\'' + this.password + '\'';

  var user = {
    name: this.name,
    password: this.password,
  };  

  query(insertSql, function(err,vals) {
    if(err) {
      return callback(err);
    }
    console.log('Id inserted: ' + vals.insertId);
    callback(err, user);
  });
};

User.get = function get(username, callback) {
  var querySql = 'SELECT * FROM user where userName=\'' + username + '\'';
  query(querySql, function(err,vals,fields) {
    if(err) {
      return callback(err);
    }

    if(vals.length < 1) {
      return callback(err, null);
    } else {
      // 封裝文檔爲 User 對象
      var user = new User({name: vals[0]['userName'],
                           password: vals[0]['password']});
      callback(err, user);
    }
  });
};
