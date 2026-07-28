document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    status.textContent = "Sending...";
    status.className = "form-status";

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    })
      .then(function (response) {
        if (response.ok) {
          form.reset();
          status.textContent = "Thank you — your message has been sent.";
          status.className = "form-status success";
        } else {
          return response.json().then(function (data) {
            var msg =
              data && data.errors
                ? data.errors.map(function (e) { return e.message; }).join(", ")
                : "Something went wrong. Please try again or email directly.";
            status.textContent = msg;
            status.className = "form-status error";
          });
        }
      })
      .catch(function () {
        status.textContent = "Something went wrong. Please try again.";
        status.className = "form-status error";
      });
  });
});
