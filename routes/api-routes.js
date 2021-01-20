// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  // might need to change this to add first/last name, not sure
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error - updated
  app.post("/api/signup", (req, res) => {
    db.User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  // dunna wtf this is for, might need to change
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        id: req.user.id,
      });
    }
  });

  // get req to get all services
  app.get("/api/services", (req, res) => {
    models.Services.findAll({}).then((response) => res.json(response));
  });

  // get all appointments for calender rendering -updated
  app.get("/api/appointments", (req, res) => {
    models.Appointments.findAll({}).then((response) => res.json(response));
  });

  // post a new appointment - updated
  app.post("/api/appointments", (req, res) => {
    models.Appointments.create({
      appointment_time: req.body.appointment_time,
      user_id: req.body.user_id,
      service_id: req.body.service_id,
      comments: req.body.comments,
    }).then((response) => res.json(response));
  });

  // update an appointment
  app.put("/api/appointments/:id", (req, res) => {
    models.Appointments.update(req.body, {
      where: {
        id: req.body.id,
      },
    }).then((post) => res.json(post));
  });
};
