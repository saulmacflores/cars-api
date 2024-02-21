const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;
const MongoStore = require("connect-mongo");
const User = require("./modelsFolder/users");

require("dotenv").config();

const app = express();
const db = require("./modelsFolder");

app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

app.use(bodyParser.json());
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
    async function (accessToken, refreshToken, profile, done) {
      try {
        // Search for an existing user by their GitHub ID
        let user = await User.findOne({ githubId: profile.id });

        if (user) {
          return done(null, user);
        } else {
          console.log(profile._json);
          user = await User.create({
            githubId: profile._json.id,
            name: profile._json.name,
            url: profile._json.html_url,
            email: profile._json.email || profile._json.blog,
            username: profile._json.login,
            avatarImg: profile._json.avatar_url,
          });
          console.log("User created", user)

          return done(null, user);
        }
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


// Passport Routes
app.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.name}`
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
