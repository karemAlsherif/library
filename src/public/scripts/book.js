/******************************************************************************
 *                          Fetch and display users
 ******************************************************************************/
hidenav();
displayBooks();
displayAuthors();
displayPublisher();
displayBookType();

function displayBooks() {
    Http.Get("/api/books/all")
        .then((response) => response.json())
        .then((response) => {
            var allBooks = response.book;
            var allBooksAnchor = document.getElementById("all-book-anchor");
            allBooksAnchor.innerHTML = "";
            allBooks.forEach((book) => {
                allBooksAnchor.innerHTML += getBookDisplayEle(book);
            });
        });
}

function getBookDisplayEle(book) {
    return ` <tr>
    <td>${book.id}</td>
    <td>${book.title}</td>
    <td>${book.author.name}</td>
    <td>${book.publisher.name}</td>
    <td>${book.price}</td>
    <td>${book.yearOfPublication}</td>
    <td> <a class="fa fa-trash p-4 delete-book-btn" onclick="deleteBook(${book.id})">
    </a></td> 
    
</tr>`;
}

function displayAuthors() {
    Http.Get("/api/authors/all")
        .then((response) => response.json())
        .then((response) => {
            var allAuthor = response.authors;
            var allAuthorsAnchor = document.getElementById("author-input");
            allAuthorsAnchor.innerHTML = "";
            allAuthor.forEach((author) => {
                allAuthorsAnchor.innerHTML += getAuthorsDisplayEle(author);
            });
        });
}

function getAuthorsDisplayEle(author) {
    return `  <option  value="${author.id}">${author.name}</option>
    `;
}

function displayPublisher() {
    Http.Get("/api/publisher/all")
        .then((response) => response.json())
        .then((response) => {
            const allpublisher = response.pubs;
            const allpublisherAnchor = document.getElementById("publisher-input");
            allpublisher.forEach((publisher) => {
                allpublisherAnchor.innerHTML += getPublisherDisplayEle(publisher);
            });
        });
}

function getPublisherDisplayEle(publisher) {
    return ` 
     <option value="${publisher.id}">${publisher.name}</option>    `;
}

function displayBookType() {
    Http.Get("/api/types/all")
        .then((response) => response.json())
        .then((response) => {
            var allbooktype = response.booktype;
            var allBookTypeAnchor = document.getElementById("booktype-input");
            allBookTypeAnchor.innerHTML = "";
            allbooktype.forEach((booktype) => {
                allBookTypeAnchor.innerHTML += getBookTypeDisplayEle(booktype);
            });
        });
}

function getBookTypeDisplayEle(booktype) {
    return ` <option value="${booktype.id}">${booktype.name}</option>    `;
}

/******************************************************************************
 *                      Add, and Delete book
 ******************************************************************************/

function addBookOne() {
    var titleInput = document.getElementById("title-input");
    var authorInput = document.getElementById("author-input");
    var publisherInput = document.getElementById("publisher-input");
    var booktypeInput = document.getElementById("booktype-input");
    var yearOfPublicationInput = document.getElementById("YOP-input");
    var priceInput = document.getElementById("prise-input");
    var data = {
        book: {
            title: titleInput.value,
            authorId: parseInt(authorInput.value),
            publisherId: parseInt(publisherInput.value),
            typeId: parseInt(booktypeInput.value),
            yearOfPublication: new Date(yearOfPublicationInput.value),
            price: parseFloat(priceInput.value),
        },
    };
    Http.Post("/api/books/add", data).then(() => {
        window.location.href = "/books";
    });
}

function addAuthorOne() {
    var author = document.getElementById("author");
    var data = {
        author: {
            name: author.value,
        },
    };
    Http.Post("/api/authors/add", data).then(() => {});
}

function addPublisherOne() {
    var publisher = document.getElementById("publisher");
    var data = {
        pub: {
            name: publisher.value,
        },
    };
    Http.Post("/api/publisher/add", data).then(() => {
        window.location.href = "/addbook";
    });
}

function addBookTypeOne() {
    var booktype = document.getElementById("booktype");
    var data = {
        booktype: {
            name: booktype.value,
        },
    };
    Http.Post("/api/types/add", data).then(() => {
        window.location.href = "/addbook";
    });
}
const logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", () => logoutUser(), false);

function deleteBook(id) {
    var id = id;
    Http.Delete("/api/books/delete/" + id).then(() => {
        displayBooks();
    });
}
/******************************************************************************
 *                         *                      Add, and Delete book
 ******************************************************************************/

function logoutUser() {
    Http.Get("/api/auth/logout").then(() => {
        window.location.href = "/";
    });
}

function hidenav() {
    let role = localStorage.getItem("role");
    if (role == 2) {
        var users = document.getElementById("users");
        var Dashboard = document.getElementById("Dashboard");
        users.style.display = "none";
        Dashboard.style.display = "none";
    }
}