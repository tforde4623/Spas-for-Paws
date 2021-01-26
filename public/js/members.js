$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the Members HTML page to display "Welcome, (First Name) (Last Name)!"
  $.get("/api/user_data").then(data => {
    $("#welcome").text("," + " " + data.first_name + " " + data.last_name);
  });
});
