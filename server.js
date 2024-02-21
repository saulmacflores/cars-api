const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;
const redis = require('redis');
const client = redis.createClient();

console.log("Redis Client: ", client);


const RedisStore = require('connect-redis')(session);
const store = new RedisStore({
  client,
});
console.log("Redis Store: ", RedisStore);
console.log("Store: ", store);

const app = express();
const db = require("./modelsFolder");

// Session middleware for express-session with Redis
app.use(session({
    store,
    secret: 'my secret',
  }));

// API 'use' Setup
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(
  cors({
    methods: ["POST", "PUT", "GET", "DELETE"],
    origin: "*",
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Z-Key",
      "Authorization",
    ],
  })
);
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// Data Routes
app.use("/", require("./routesFolder"));

// Passport Setup
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Passport Routes
app.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : "Logged Out"
  );
});
app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./viewsFolder"));

// Exception Catch
process.on("uncaughtException", (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\nException origin: ${origin}`
  );
});

// Db Connection
db.mongoose
  .connect(db.uri)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("Cannot connect to Database...", error);
    process.exit();
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
