document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("notification-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent page reload
    alert("You will be notified soon!");
  });
});
