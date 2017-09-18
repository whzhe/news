var query=require("../lib/mysql.js");

function Post(username, post, time) {
    this.name = username;
    this.post = post;
    if(time) 
    {
        this.time = time;
    }
    else
    {
        this.time = new Date();
    }
};

module.exports = Post;

Post.prototype.save = function save(callback) {
    var post = {
        name: this.name,
        post: this.post,
        time: this.time,
    };

    var insertSql = 'insert into post set userName=\'' + this.name + '\', posts=\'' + this.post + '\'';
    query(insertSql, function(err, vals) {
        if(err) {
            return callback(err);
        }
        console.log('Id inserted:' + vals.insertId);
        callback(err, post);
    });
};

Post.get = function get(username, callback) {
    var querySql = 'select * from post where userName=\'' + username + '\'';
    query(querySql, function(err, vals, fields) {
        if (err) {
            return callback(err);
        }

        if (vals.length < 1) {
            return callback(err, null);
        }
        else {
            var posts = [];

            for(var i = 0; i < vals.length; i++) {
                var post = new Post(username, vals[i]['posts'], vals[i]['time']);
                posts.push(post);
            }

            callback(err, posts);
        }
    });
};
