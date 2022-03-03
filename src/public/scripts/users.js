/******************************************************************************
 *                          Fetch and display users
 ******************************************************************************/

displayUsers();
hidenav();

function displayUsers() {
    Http.Get("/api/users/all")
        .then((response) => response.json())
        .then((response) => {
            var allUsers = response.users;
            // Empty the anchor
            var allUsersAnchor = document.getElementById("all-users-anchor");
            allUsersAnchor.innerHTML = "";
            // Append users to anchor
            allUsers.forEach((user) => {
                allUsersAnchor.innerHTML += getUserDisplayEle(user);
            });
        });
}

function getUserDisplayEle(user) {
    return ` <tr>
    <td>${user.id}</td>
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.role}</td>
    <td> <a class="fa fa-trash p-4 delete-user-btn" onclick="deleteUser(${user.id})">
</a></td>
</tr>`;
}

/******************************************************************************
 *                        Add, Edit, and Delete Users
 ******************************************************************************/
const logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", () => logoutUser(), false);

function addUserOne() {
    var nameInput = document.getElementById("name-input");
    var emailInput = document.getElementById("email-input");
    var pwdlInput = document.getElementById("pwd-input");
    var roleInput = document.getElementById("role-input");
    var data = {
        user: {
            name: nameInput.value,
            email: emailInput.value,
            pwdHash: pwdlInput.value,
            role: roleInput.value,
        },
    };
    Http.Post("/api/users/add", data).then(() => {
        window.location.href = "/users";
    });
}

function deleteUser(id) {
    var id = id;
    Http.Delete("/api/users/delete/" + id).then(() => {
        displayUsers();
    });
}

/******************************************************************************
 *                        Add, Edit, and Delete Users
 ******************************************************************************/

function logoutUser() {
    Http.Get("/api/auth/logout").then(() => {
        window.location.href = "/";
    });
}

function hidenav() {
    let role = localStorage.getItem("role");

    if (role == 2) {
        window.location.href = "/Books";
    }
}