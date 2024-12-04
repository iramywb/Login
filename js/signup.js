if (localStorage.getItem("currentSession") != null) {
    window.location.href = "home.html";
}

var users = getUsers();

function signup(name, email, pwd) {
    users.push({ name: name, email: email, pwd: pwd });
}
function saveUser() {
    localStorage.setItem("users", JSON.stringify(users));
}
function getUsers() {
    if (localStorage.getItem("users") == null) {
        return [];
    }
    return JSON.parse(localStorage.getItem("users"));
}
function validateEmail(email) {
    //get the label after email input to change its text
    var label = document.querySelector("#email + label");
    // checks email format
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;
    if (!regex.test(email)) {
        label.innerText = "Please enter a correct email format. ex.user@domain.com";
        return false;
    }
    // checks email if already used
    for (var i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            label.innerText = "Email already registered";
            return false;
        }
    }
    // if email is valid and not used
    return true;
}
function validatePassword(pwd) {
    //length >= 6 only
    var regex = /^[a-zA-Z0-9]{6,}$/;
    return regex.test(pwd);
}
function validateName(name) {
    //doesn't have any special character and length >= 2, numbers allowed
    var regex = /^[a-zA-Z0-9]{2,}$/;
    return regex.test(name);
}
function redirect(link) { // redirect to the link provided after 2 seconds
    setTimeout(function () {
        window.location.href = link;
    }, 2000);// time in miliseconds
}
function validStyle(element, boolean) {
    if (boolean) {
        element.classList.remove("is-invalid");
        element.classList.add("is-valid");
    } else {
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
    }
}
document.getElementById("signup").addEventListener("click", function (e) {
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var pwd = document.getElementById("pwd");
    var success = document.querySelector(".text-success");

    var valid = true;
    if (name.value != "") {
        if (validateName(name.value)) {
            validStyle(name, true);
        } else {
            document.querySelector("#name + label").innerText = "Your name must be at least 2 characters and doesn't contain any special character";
            validStyle(name, false);
            valid = false;
        }
    } else {
        document.querySelector("#name + label").innerText = "Please enter a name";
        validStyle(name, false);
        valid = false;
    }
    if (email.value != "") {
        if (validateEmail(email.value)) {
            validStyle(email, true);
        } else {
            document.querySelector("#email + label").innerText = "Please enter a correct email format. ex.user@domain.com";
            validStyle(email, false);
            valid = false;
        }
    } else {
        document.querySelector("#email + label").innerText = "Please enter an email";
        validStyle(email, false);
        valid = false;
    }
    if (pwd.value != "") {
        if (validatePassword(pwd.value)) {
            validStyle(pwd, true);
        } else {
            document.querySelector("#pwd + label").innerText = "Password must be at least 6 characters";
            validStyle(pwd, false);
            valid = false;
        }
    } else {
        document.querySelector("#pwd + label").innerText = "Please enter a password";
        validStyle(pwd, false);
        valid = false;
    }
    // if valid then signup and show success message and redirect to login page
    if (valid) {
        signup(name.value, email.value, pwd.value);
        saveUser();
        success.classList.remove("d-none");
        redirect("index.html");
    }
})