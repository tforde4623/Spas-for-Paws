// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  // TESTING ONLY!! Serve index.handlebars to the root route.  REMOVE ME!!
  // eslint-disable-next-line prefer-arrow-callback
  app.get("/calendar", (req, res) => {
    // get user data from where ever, hardcoded for test
    const currentUser = {
      firstname: "Sharon",
      lastname: "Roy"
    };

    // get service data from the database or where ever it is stored
    // hardcoded for test
    const serviceData = [
      {
        description: "Service 1"
      },
      {
        description: "Service 2"
      },
      {
        description: "Service 3"
      }
    ];

    const indexData = {
      user: currentUser,
      petservices: serviceData
    };
    res.render("calendar", { dataIn: indexData });
  });
};
