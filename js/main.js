var currentSession = JSON.parse(localStorage.getItem("currentSession"));
if (currentSession == null) {
    window.location.href = "index.html";
}
document.getElementById("name").innerText = currentSession.name;

document.querySelector("#options").addEventListener("click", function (e) {
    //if target tag is button
    if (e.target.tagName == "BUTTON") {
        if (e.target.innerText == "Logout") {
            localStorage.removeItem("currentSession");
            window.location.href = "index.html";
        } else if (e.target.innerText == "Delete User") {
            deleteUser();
            window.location.href = "index.html";
        }
    }
});

function deleteUser() {
    var users = getUsers();
    // remove user from users array
    users.splice(users.indexOf(currentSession), 1);
    // save users array to local storage
    if (users.length == 0) {
        localStorage.removeItem("users");
    } else {
        localStorage.setItem("users", JSON.stringify(users));
    }
    localStorage.removeItem("currentSession");
    window.location.href = "index.html";
}
function getUsers() {
    if (localStorage.getItem("users") == null) {
        return [];
    }
    return JSON.parse(localStorage.getItem("users"));
}