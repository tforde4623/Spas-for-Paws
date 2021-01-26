/* eslint-disable prettier/prettier */
// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

module.exports = function(app) {
  // can use some of this login for checking if logged in
  // app.get("/", (req, res) => {
  //   // If the user already has an account send them to the members page
  //   if (req.user) {
  //     res.redirect("/members");
  //   }
  //   res.sendFile(path.join(__dirname, "../public/signup.html"));
  // });

  // index/home page route
  app.get("/", (res) => {
    // replace with render
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // register page route
  app.get("/register", (req, res) => {
    // replace with render
    res.sendFile(path.join(__dirname, "../public/register.html"));
  });

  // members page route
  app.get("/members", (req, res) => {
    // replace with render
    res.sendFile(path.join(__dirname, "../public/members.html"));  
  });

  // login page route
  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/");
    }
    // replace with render
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get("/members", isAuthenticated, res => {
  //   res.sendFile(path.join(__dirname, "../public/members.html"));
  // });

  app.get("/calendar", checkAuthentication, (req, res) => {
    //render calendar page via handlebars IF logged in
    res.render("calendar", { dataIn: serviceData });
  });
};

// function to handle pages only accessible if logged in
const checkAuthentication = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

// static pet service data
const serviceData = [
  {
    title: "Dog Bath & Haircut",
    description: "For dogs who need a bath & haircut.",
    animal: "Dog",
    isDog: true,
    isCat: false,
    isRabbit: false,
  },
  {
    title: "Dog Bath & Brush",
    description:
      "For dogs who just need a bath to maintain a healthy-looking coat, clean ears & trimmed nails.",
    animal: "Dog",
    isDog: true,
    isCat: false,
    isRabbit: false,
  },
  {
    title: "Puppy Bath & Trim",
    description:
      "For puppies through 5 months old who need a bath & light trimming, plus TLC to help them get comfortable visiting the salon.",
    animal: "Dog",
    isDog: true,
    isCat: false,
    isRabbit: false,
  },
  {
    title: "Puppy Bath & Brush",
    description:
      "For puppies through 5 months old who need a bath to maintain a healthy-looking coat, plus extra pampering.",
    animal: "Dog",
    isDog: true,
    isCat: false,
    isRabbit: false,
  },
  {
    title: "Dog Nail Trim",
    description: "Prevents painful splaying & splitting of your dog’s nails.",
    animal: "Dog",
    isDog: true,
    isCat: false,
    isRabbit: false,
  },
  {
    title: "Dog Flea & Tick",
    description:
      "Our all-natural flea and tick shampoos work safely with Frontline or other similar preventative applications.",
    animal: "Dog",
    isDog: true,
    isCat: false,
    isRabbit: false,
  },
  {
    title: "Cat Bath & Haircut",
    description: "For cats who need a bath & haircut.",
    animal: "Cat",
    isDog: false,
    isCat: true,
    isRabbit: false,
  },
  {
    title: "Cat Bath & Brush",
    description:
      "For cats who need just a bath for healthy-looking coat, clean ears & trimmed nails.",
    animal: "Cat",
    isDog: false,
    isCat: true,
    isRabbit: false,
  },
  {
    title: "Kitten Bath & Trim",
    description:
      "For kittens through 5 months old who need a bath & haircut. Plus our pet stylists help get them comfortable visiting the salon.",
    animal: "Cat",
    isDog: false,
    isCat: true,
    isRabbit: false,
  },
  {
    title: "Kitten Bath & Brush",
    description:
      "For kittens through 5 months old who need a bath to maintain a healthy-looking coat, clean ears & trimmed nails. ",
    animal: "Cat",
    isDog: false,
    isCat: true,
    isRabbit: false,
  },
  {
    title: "Cat Nail Trim",
    description: "Prevents painful splaying & splitting of your cat's nails.",
    animal: "Cat",
    isDog: false,
    isCat: true,
    isRabbit: false,
  },
  {
    title: "Rabbit Demat & Gland ",
    description: "Your bunny will be soft and fluffy!",
    animal: "Rabbit",
    isDog: false,
    isCat: false,
    isRabbit: true,
  },
  {
    title: "Rabbit Nails",
    description:
      "Prevents painful splaying & splitting of your rabbit's nails.",
    animal: "Rabbit",
    isDog: false,
    isCat: false,
    isRabbit: true,
  },
  {
    title: "Bunny Portrait",
    description:
      "A delighful pet portrait of your bunnie for special occasions! ",
    animal: "Rabbit",
    isDog: false,
    isCat: false,
    isRabbit: true,
  },
];
