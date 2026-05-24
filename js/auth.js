// =========================
// SIMPLE FIXED LOGIN SYSTEM
// =========================

const loginForm = document.getElementById("loginForm");

if(loginForm){
    loginForm.addEventListener("submit", function(e){
        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value.trim();

        const fixedEmail = "admin@botanica.com";
        const fixedPassword = "botanica123";

        if(email === fixedEmail && password === fixedPassword){

            const user = {
                id: 1,
                fullname: "Botanica User",
                email: fixedEmail
            };

            localStorage.setItem("currentUser", JSON.stringify(user));

            alert("Login successful!");
            window.location.href = "dashboard.html";

        }else{
            alert("Wrong email or password.");
        }
    });
}

// =========================
// REGISTER PAGE MESSAGE ONLY
// =========================

const registerForm = document.getElementById("registerForm");

if(registerForm){
    registerForm.addEventListener("submit", function(e){
        e.preventDefault();

        alert("Please use the demo login account provided.");
        window.location.href = "index.html";
    });
}

// =========================
// LOGOUT SYSTEM
// =========================

function logout(){
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}