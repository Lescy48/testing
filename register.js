function validateRegister() {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const errorMessage = document.getElementById('error-message');

    errorMessage.style.display = "none";
    [username, password, confirmPassword].forEach(input => input.classList.remove("error-background"));

    if (!username.value || !password.value || !confirmPassword.value) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Please fill out all fields correctly.";
        [username, password, confirmPassword].forEach(input => {
            if (!input.value) input.classList.add("error-background");
        });
        return;
    }

    if (password.value !== confirmPassword.value) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Passwords do not match.";
        password.classList.add("error-background");
        confirmPassword.classList.add("error-background");
        return;
    }

    const formData = new FormData();
    formData.append("username", username.value);
    formData.append("password", password.value);

    fetch("register.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if (data.includes("success")) {
            window.location.href = "login.html";
        } else {
            errorMessage.style.display = "block";
            errorMessage.textContent = data;
        }
    })
    .catch(error => {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Error: " + error;
    });
}