var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const { addUser, removeUser, changeUserState } = require('./socket-users');

var indexRouter = require('./routes/router');

var app = express();

const server = app.listen(5000, () =>
  console.log(`Server running on port ${5000}`)
)

const io = require("socket.io")(server)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {
  req.io = io
  next()
})

io.on('connect', (socket) => {
  socket.on('join', ({ userid, email }, callback) => {
    const { error, user } = addUser({ id: socket.id, userid, email })

    if(error) return callback(error)

    console.log("one user joined")

    socket.join(user.email)

    io.sockets.emit('users', { user: user.email })

    callback()
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if(user) {
      console.log("one user disconnected")

     ///update user status

      io.sockets.emit('userstatus', { email:user.email })
    }
  })

  socket.on('change', ({userid,email, state}) => {
    const user = changeUserState({userid: userid, state})

    if (user) {
      io.sockets.emit('change', { email: email, userid: userid})
    }
  })

  socket.on('typing', (payload) => {
    io.sockets.emit('typing', payload)
  })
})

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.error("\x1b[31m", '<<< ERROR HANDLER >>>');
  console.error("\x1b[31m", err.message);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
