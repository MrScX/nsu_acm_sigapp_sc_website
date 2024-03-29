
const express = require("express");

const redis = require("redis").createClient();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const flash = require("connect-flash");
const helmet = require("helmet");
const dotenv = require("dotenv");
const csurf = require("csurf");
const compression = require("compression");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const errorRoutes = require("./routes/errors");

const userDataMiddleware = require("./middlewares/userData");
const authMiddleWare = require("./middlewares/auth");

const app = express();

dotenv.config();

app.set("view engine", "ejs");

app.set("views", "views");

app.use(express.static(__dirname + "/public"));

app.use(compression());

app.use(helmet());

app.use(cookieParser(process.env.SCOOK_SECRET));

app.use(session({
    name: "_sid",
    secret: process.env.SCOOK_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({
        host: "localhost",
        port: 6378,
        client: redis,
    }),
    cookie: { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

app.use(flash());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

// check if user is logged in
app.use(authMiddleWare.isLoggedIn);

app.use(userDataMiddleware.fetchProfilePicture);

app.use(userRoutes.router);

app.use(authRoutes.router);

app.use(errorRoutes.router);

app.listen(3000, () => {
    console.log("server started on port: 3000");
});

