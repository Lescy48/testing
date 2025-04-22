function validateLogin() {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    const predefinedUsername = "admin#1234";
    const predefinedPassword = "admin#1234";

    // Pengecekan username dan password
    if (username.value === predefinedUsername && password.value === predefinedPassword) {
        // Set login status in session storage
        sessionStorage.setItem("isLoggedIn", "true");

        // Display success message
        errorMessage.style.display = "none"; 
        successMessage.style.display = "block";
        successMessage.textContent = "Login succeeded!";

        // Redirect to the main page after a delay
        setTimeout(() => {
            window.location.href = "index.html";
        }, 3000);
        return; // Hentikan eksekusi lebih lanjut
    }

    // Jika salah, tampilkan pesan error
    if (!username.value || !password.value) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Please fill out all fields.";
        username.classList.add("error-background");
        password.classList.add("error-background");
        return;
    }

    // Send data to login.php using AJAX jika login gagal
    const formData = new FormData();
    formData.append("username", username.value);
    formData.append("password", password.value);

    fetch("login.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if (data.includes("success")) {
            // Set login status in session storage
            sessionStorage.setItem("isLoggedIn", "true");

            // Display success message
            errorMessage.style.display = "none"; 
            successMessage.style.display = "block";
            successMessage.textContent = "Login succeeded!";

            // Redirect to the main page after a delay
            setTimeout(() => {
                window.location.href = "index.html";
            }, 3000);
        } else {
            // Display error message from PHP
            successMessage.style.display = "none";
            errorMessage.style.display = "block";
            errorMessage.textContent = data;
            username.classList.add("error-background");
            password.classList.add("error-background");
        }
    })
    .catch(error => {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Error: " + error;
    });
}

document.getElementById('username').addEventListener('input', function () {
    this.classList.remove("error-background");
    document.getElementById('error-message').style.display = "none";
});

document.getElementById('password').addEventListener('input', function () {
    this.classList.remove("error-background");
    document.getElementById('error-message').style.display = "none";
});