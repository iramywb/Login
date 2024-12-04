if (localStorage.getItem("currentSession") != null) {
    window.location.href = "home.html";
}

var users = getUsers();

function getUsers() {
    if (localStorage.getItem("users") == null) {
        return [];
    }
    return JSON.parse(localStorage.getItem("users"));
}
function login(email, pwd) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].pwd == pwd) {
            // set session in local storage to user object
            localStorage.setItem("currentSession", JSON.stringify(users[i]));
            return true;
        }
    }
    return false;
}
function redirect(link) {
    setTimeout(function () {
        window.location.href = link;
    }, 2000);
}
document.getElementById("login").addEventListener("click", function (e) {
    var email = document.getElementById("email");
    var pwd = document.getElementById("pwd");

    pwd.classList.remove("is-invalid");
    email.classList.remove("is-invalid");

    var success = document.querySelector(".text-success");
    var label = document.querySelector(".custom label");
    if (login(email.value, pwd.value)) {
        success.classList.remove("d-none");
        setTimeout(function () {
            window.location.href = "home.html";
        }, 2000);
    } else {
        if (email.value == "") {
            email.classList.add("is-invalid");
            label.innerText = "Please enter your email";
            label.setAttribute("for", "email");
            return;
        }
        if (pwd.value == "") {
            pwd.classList.add("is-invalid");
            label.innerText = "Please enter your password";
            label.setAttribute("for", "pwd");
            return;
        }
        for (var i = 0; i < users.length; i++) {
            if (users[i].email == email.value) {
                if (users[i].pwd == pwd.value) {
                    success.classList.remove("d-none");
                    redirect("home.html");
                } else {
                    label.innerText = "Wrong password";
                    label.setAttribute("for", "pwd");
                    pwd.classList.add("is-invalid");
                }
                return; // this will break the loop and will not continue to the last part where email not found
            }
        } // this will run if email is not found as the loop will not reach return
        // email not found
        email.classList.add("is-invalid");
        label.innerText = "Email not found";
        label.setAttribute("for", "email");
    }
});