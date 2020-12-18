const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');


// 라우터 등록
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const testRouter = require('./routes/test');

// DB ORM
const models = require('./models/index.js');

models.sequelize.sync().then( ()=>{
  console.log("DB 연결 성공");
}).catch(err =>{
  console.log("DB 연결 실패");
  console.log(err);
})

const app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 라우터 사용
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/test',testRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(session({
  key: 'sid',
  secret: 'twkimd',
  resave: false, //세션을 항상 저장할지
  saveUninitialized: true,
  cookie: {
    maxAge: 24000 * 60 * 60 // 유효시간 24시간
  }
}));



module.exports = app;
