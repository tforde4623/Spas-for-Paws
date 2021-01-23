/* eslint-disable prettier/prettier */
// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  // can use some of this login for checking if logged in
  // app.get("/", (req, res) => {
  //   // If the user already has an account send them to the members page
  //   if (req.user) {
  //     res.redirect("/members");
  //   }
  //   res.sendFile(path.join(__dirname, "../public/signup.html"));
  // });

  app.get("/", res => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
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
  app.get("/members", isAuthenticated, res => {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  app.get("/calendar", res => {
    //render calendar page via handlebars
    res.render("calendar", { dataIn: serviceData });
  });
};

const serviceData = [
  {
    title: "Bath & Full Haircut",
    description: "For dogs who need a bath & haircut.",
    animal: "Dog",
  },
  {
    title: "Bath & Brush",
    description:
      "For dogs who just need a bath to maintain a healthy-looking coat, clean ears & trimmed nails.",
    animal: "Dog",
  },
  {
    title: "Puppy Bath & Trim",
    description:
      "For puppies through 5 months old who need a bath & light trimming, plus TLC to help them get comfortable visiting the salon.",
    animal: "Dog",
  },
  {
    title: "Puppy Bath & Brush",
    description:
      "For puppies through 5 months old who need a bath to maintain a healthy-looking coat, plus extra pampering. Plus, our pet-loving stylists help get puppy comfortable visiting the salon.",
    animal: "Dog",
  },
  {
    title: "Nail Trim",
    description: "Prevents painful splaying & splitting of your dog’s nails.",
    animal: "Dog",
  },
  {
    title: "Flea and Tick Treatment",
    description:
      "Our all-natural flea and tick shampoos work safely with Frontline or other similar preventative applications.",
    animal: "Dog",
  },
  {
    title: "Bath & Full Haircut",
    description: "For cats who need a bath & haircut.",
    animal: "Cat",
  },
  {
    title: "Bath & Brush",
    description:
      "For cats who need just a bath for healthy-looking coat, clean ears & trimmed nails.",
    animal: "Cat",
  },
  {
    title: "Kitten Bath & Trim",
    description:
      "For kittens through 5 months old who need a bath & haircut. Plus our pet stylists help get them comfortable visiting the salon.",
    animal: "Cat",
  },
  {
    title: "Kitten Bath & Brush",
    description:
      "For kittens through 5 months old who need a bath to maintain a healthy-looking coat, clean ears & trimmed nails. Plus, our pet-loving stylists help get kittens comfortable visiting the salon.",
    animal: "Cat",
  },
  {
    title: "Nail Trim",
    description: "Prevents painful splaying & splitting of your cat's nails.",
    animal: "Cat",
  },
];

// index.hmtl
// calender.html
