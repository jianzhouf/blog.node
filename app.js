var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var index = require('./routes/index');
var blog = require('./routes/blog');
var user = require('./routes/user');


var app = express();

//创建seesionStore
var MemoryStore = session.MemoryStore,
  sessionStore = new MemoryStore();

//设置跨域访问
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }))

// Use the session middleware 
app.use(session({
  ////这里的name值得是cookie的name，默认cookie的name是：connect.sid
  //name: 'hhw',
  secret: 'zj',
  signed: true,
  cookie: ('name', 'value', { path: '/', httpOnly: true, secure: false, maxAge: 600000 }),
  //重新保存：强制会话保存即使是未修改的。默认为true但是得写上
  resave: true,
  //强制“未初始化”的会话保存到存储。 
  saveUninitialized: false,
  store: sessionStore
}))




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('zj'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  if (req.url === '/login') {
    next();
  } else {
    // if (!loginUser) {
    //   res.json({ code: 10001, message: "未登录" })
    // } else {
    //   next();
    // }
    sessionStore.get(req.sessionID, function (err, data) {
      if (err || !data) {
        res.json({ code: 10001, message: "未登录" })
      } else {
        next();
      }
    });
  }
});


app.use('/', index);
app.get('/list', blog.list);
app.post('/add', blog.add);
app.post('/update', blog.update);
app.get('/detailById', blog.detailById);
app.post('/login', user.login);
app.post('/logout', user.logout);
app.post('/sign', user.sign);
app.get('/getUserInfo', user.getUserInfo);







// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
