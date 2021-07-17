const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
var path = require('path');
const app = express();
const cors =require('cors')

app.use(cors());

mongoose.set('useFindAndModify', false);

require('./config/passport')(passport);


app.use(express.static(path.join(__dirname, 'public')));

mongoose
  .connect(
    'mongodb+srv://vaishnavi:vaishnavi@cluster0.qyjqk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);


app.use(passport.initialize());
app.use(passport.session());


app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/courses',require('./routes/courses.js'));
app.use('/task', require('./routes/task.js'));
app.use('/', require('./routes/users.js'));

const PORT = process.env.PORT || 80;

app.listen(PORT, console.log(`Server running on  ${PORT}`));
