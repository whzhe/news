var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/m_user.js');
var Post = require('../models/m_post.js');
var news = require('news');
var internel = require('internel');
var edit = require('edit');

///////////whzhe add a news////////////////
//router.post('/post', checkLogin);

router.post('/news',function(req, res, next)
{
    news.message_handle(req, res);
});

router.post('/internel',function(req, res, next)
{
    internel.message_handle(req, res);
});

router.post('/edit',function(req, res, next)
{
    edit.message_handle(req, res);
});

///////////////////////////////////////////
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express', layout: "layout" });
});

router.get('/reg', checkNotLogin);
router.get('/reg', function(req, res) {
    res.render('reg', {
        title: '用戶註冊',
    });
});

router.post('/reg', checkNotLogin);
router.post('/reg', function(req, res) {
  //檢驗用戶兩次輸入的口令是否一致
  if (req.body['password-repeat'] != req.body['password']) {
    req.flash('error', '兩次輸入的口令不一致');
    return res.redirect('/reg');
  }

  //生成口令的散列值
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');

  var newUser = new User({
    name: req.body.username,
    password: password,
  });

  //檢查用戶名是否已經存在
  User.get(newUser.name, function(err, user) {
    if (user) {
      err = 'Username already exists.';
    }

    if (err) {
      req.flash('error', err);
      return res.redirect('/reg');
    }

    //如果不存在則新增用戶
    newUser.save(function(err) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/reg');
      }
      req.session.user = newUser;
      req.flash('success', '註冊成功');
      res.redirect('/');
    });
  });
});


router.get('/login', function(req, res) {
  res.render('login', {
    title: '用户登入',
  });
});

router.post('/login', function(req, res) {
  //生成口令的散列值
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');

  User.get(req.body.username, function(err, user) {
    if (!user) {
      req.flash('error', '用戶不存在');
      return res.redirect('/login');
    }
    if (user.password != password) {
      req.flash('error', '用戶口令錯誤');
      return res.redirect('/login');
    }

    req.session.user = user;
    req.flash('success', '登入成功');
    res.redirect('/');
  });
});

router.post('/post', checkLogin);
router.post('/post', function(req,res) {
    var currentUser = req.session.user;
    var post = new Post(currentUser.name, req.body.post);

    post.save(function(err) {
        if(err) {
            req.flash('error', err);
            return res.redirect('/');
        }

        req.flash('success', '发布成功');
        res.redirect('/u/' + currentUser.name);
    });
});

router.get('/u/:user', function(req,res) {
    User.get(req.params.user, function(err, user) {
        if (!user) {
            req.flash('error', '用户不存在');
            return res.redirect('/');
        }

        Post.get(user.name, function(err, posts) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }

            res.render('user', {
                title: user.name,
                posts: posts,
            });
        });
    });
});

router.get('/logout', function(req, res) {
    req.session.user = null;
    req.flash('success', '登出成功');
    res.redirect('/');
});

function checkLogin(req, res, next) {
  if (!req.session.user) {
    req.flash('error', '未登入');
    return res.redirect('/login');
  }
  next();
}

function checkNotLogin(req, res, next) {
  if (req.session.user) {
    req.flash('error', '已登入');
    return res.redirect('/');
  }
  next();
}

module.exports = router;
