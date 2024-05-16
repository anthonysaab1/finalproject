let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let nameField = document.getElementById("nameField");
let title = document.getElementById("title");

signinBtn.onclick = function () {
  nameField.style.maxHeight = "0";
  title.innerHTML = "Sign In";
  signupBtn.classList.add("disable");
  signinBtn.classList.remove("disable");
};
signupBtn.onclick = function () {
  nameField.style.maxHeight = "60px";
  title.innerHTML = "Sign up";
  signupBtn.classList.remove("disable");
  signinBtn.classList.add("disable");
};
document.addEventListener("DOMContentLoaded", function () {
  // Get the form and buttons
  var signupForm = document.getElementById("signupForm");
  var signupBtn = document.getElementById("signupBtn");
  var signinBtn = document.getElementById("signinBtn");

  // Add click event listener to Sign Up button
  signupBtn.addEventListener("click", function () {
    // Call a function to handle form submission (e.g., send data to the server)
    handleSignup();
  });

  // Add click event listener to Sign In button
  signinBtn.addEventListener("click", function () {
    // Call a function to handle sign-in
    handleSignin();
  });

  // Function to handle form submission for Sign Up (replace with your actual implementation)
  function handleSignup() {
    // Get form data and send it to the server (AJAX request or form submission)
    // This function needs to be implemented based on your server-side logic.
  }

  // Function to handle sign-in
  function handleSignin() {
    // Get form data (replace with actual form data retrieval logic)
    var username = document
      .getElementById("nameField")
      .querySelector("input").value;
    var password = document.querySelector("input[type='password']").value;

    // Validate username and password (replace with actual validation logic)
    if (username === "correctUsername" && password === "correctPassword") {
      // Redirect to a new blank page
      window.open("about:blank", "_blank");
    } else {
      // Display an error message or perform other actions for unsuccessful login
      alert("Incorrect username or password. Please try again.");
    }
  }
});
