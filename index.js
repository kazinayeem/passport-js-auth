const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const db = require("./config/database");
const userRouter = require("./router/user.router");
const MongoStore = require('connect-mongo');
const passport = require('passport');

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1) 
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl : "mongodb://localhost:27017/passport-auth"
    })
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "ejs");

app.use("/", userRouter);

app.listen(4000, () => {
  db();
});
