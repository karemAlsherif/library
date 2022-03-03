/******************************************************************************
 *                          Fetch and display users
 ******************************************************************************/

displayUsers();
displayBooks();
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
            allUsersAnchor.innerHTML += getUserDisplayEle(allUsers);
        });
}

function displayBooks() {
    Http.Get("/api/books/all")
        .then((response) => response.json())
        .then((response) => {
            var allBooks = response.book;
            // Empty the anchor
            var allBooksAnchor = document.getElementById("all-books-anchor");
            allBooksAnchor.innerHTML = "";
            // Append users to anchor
            allBooksAnchor.innerHTML += getBookDisplayEle(allBooks);
        });
}

function getUserDisplayEle(user) {
    return `<span>${user.length}</span> `;
}

function getBookDisplayEle(book) {
    return `<span>${book.length}</span> `;
}

const logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", () => logoutUser(), false);
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