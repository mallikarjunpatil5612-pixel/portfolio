document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("toggle-password");
    const loginBtn = document.getElementById("login-btn");
    const btnText = loginBtn.querySelector(".btn-text");
    const spinner = document.getElementById("spinner");
    const alertContainer = document.getElementById("alert-container");

    // 👁️ Show/Hide Password functionality
    togglePassword.addEventListener("click", function() {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        
        // Toggle icon visually
        this.classList.toggle("fa-eye");
        this.classList.toggle("fa-eye-slash");
    });

    // Handle Form Submission
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault(); // Prevent default form UI submission

        // Step 1: Get Input Values
        let email = emailInput.value.trim();
        let password = passwordInput.value;

        // Step 2: Validation
        if(email === "" || password === "") {
            showAlert("Please fill in all fields", "error");
            return;
        }

        // Setup loading state processing animation
        setLoading(true);

        // Step 3: Send Data to Backend
        // Real logic usually calls fetch("http://localhost:3000/login", {...})
        // For demonstration, simulating network latency with setTimeout
        console.log("Mock sending data to backend:", { email, password: "***" });

        setTimeout(() => {
            // Mock backend response handling (simulating correct credentials check)
            if (email.includes("@") && password.length >= 5) {
                // Success Simulation ✅
                showAlert("Login Successful! Preparing dashboard...", "success");
                
                // Real implementation example:
                /*
                fetch("http://localhost:3000/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                })
                .then(res => res.json())
                .then(data => {
                    if(data.token) {
                        showAlert("Success", "success");
                        // Store token and redirect
                    } else {
                        showAlert(data.message, "error");
                    }
                });
                */

                // End loading state simulation after showing message
                setTimeout(() => {
                    setLoading(false);
                    // window.location.href = "/dashboard";
                }, 1500);
            } else {
                // Error Simulation ❌
                showAlert("Invalid credentials! Please try again.", "error");
                setLoading(false);
            }
        }, 1200); // 1.2 second simulated server delay
    });

    function showAlert(message, type) {
        alertContainer.textContent = message;
        alertContainer.className = "alert-container"; // reset base class
        
        if (type === "error") {
            alertContainer.classList.add("alert-error");
            // Add a small shake animation to the form on error
            loginForm.parentElement.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(0)' }
            ], { duration: 400 });
        } else {
            alertContainer.classList.add("alert-success");
        }

        // Hide alert message after 4 seconds automatically
        setTimeout(() => {
            alertContainer.style.opacity = "0";
            setTimeout(() => {
                alertContainer.style.display = "none";
                alertContainer.style.opacity = "1";
                alertContainer.className = "alert-container";
            }, 300);
        }, 4000);
    }

    function setLoading(isLoading) {
        if (isLoading) {
            loginBtn.disabled = true;
            btnText.style.display = "none";
            spinner.style.display = "inline-block";
            loginBtn.style.cursor = "not-allowed";
        } else {
            loginBtn.disabled = false;
            btnText.style.display = "inline-block";
            spinner.style.display = "none";
            loginBtn.style.cursor = "pointer";
        }
    }
});
