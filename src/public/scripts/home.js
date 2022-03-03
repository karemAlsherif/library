/******************************************************************************
 *                          Fetch and display users
 ******************************************************************************/
var Http = (function() {
    // Setup request for json
    var getOptions = function(verb, data) {
        var options = {
            dataType: "json",
            method: verb,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };
        if (data) {
            options.body = JSON.stringify(data);
        }
        return options;
    };
    // Set Http methods
    return {
        Get: function(path) {
            return fetch(path, getOptions("GET"));
        },
        Post: function(path, data) {
            return fetch(path, getOptions("POST", data));
        },
        Put: function(path, data) {
            return fetch(path, getOptions("PUT", data));
        },
        Delete: function(path) {
            return fetch(path, getOptions("DELETE"));
        },
    };
})();

displayBooks();
displayAuthors();
displayPublisher();
displayBookType();
const filter = document.getElementById("filter-btn");
filter.addEventListener(
    "click",
    () => {
        displayfilter();
    },
    false
);

function displayBooks() {
    Http.Get(`/api/books/all`)
        .then((response) => response.json())
        .then((response) => {
            var allBooks = response.book;
            // Empty the anchor
            var allBooksAnchor = document.getElementById("all-book");
            allBooksAnchor.innerHTML = "";
            // Append users to anchor
            allBooks.forEach((book) => {
                allBooksAnchor.innerHTML += getBookDisplayEle(book);
            });
        });
}

function getBookDisplayEle(book) {
    return ` <div class="post-preview">
            <a href="/book">
            <h2 class="post-title">
              ${book.title}
               </h2>
             <h3 class="post-subtitle">
            ${book.author.name}</h3></a>
            <p class="post-meta">
            Publisher by
                <a href="/book">${book.publisher.name}</a> YearOfPublication ${book.yearOfPublication}
            </p>
            <p class="post-meta">
            
                <p>${book.price}LYD</p>
            </p>
</div> <hr class="my-4" />`;
}

function displayAuthors() {
    Http.Get("/api/authors/all")
        .then((response) => response.json())
        .then((response) => {
            var allAuthor = response.authors;
            var allAuthorsAnchor = document.getElementById("author-input");
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
            var allpublisher = response.pubs;
            var allpublisherAnchor = document.getElementById("publisher-input");
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
            allbooktype.forEach((booktype) => {
                allBookTypeAnchor.innerHTML += getBookTypeDisplayEle(booktype);
            });
        });
}

function getBookTypeDisplayEle(booktype) {
    return ` <option value="${booktype.id}">${booktype.name}</option>    `;
}

function displayfilter() {
    var authorInput = document.getElementById("author-input");
    var publisherInput = document.getElementById("publisher-input");
    var booktypeInput = document.getElementById("booktype-input");
    //var serchInput = document.getElementById("serch");
    console.log(booktypeInput.value, "booktypeInput");

    var author = parseInt(authorInput.value);
    var publisher = parseInt(publisherInput.value);
    var booktype = parseInt(booktypeInput.value);
    console.log(booktype, "booktypeInput");
    console.log(author, "author");
    console.log(publisher, "publisher");

    var query = `?`;
    if (author && author > 0) {
        query = query + `authorId=${author}`;
    }
    if (booktype && booktype > 0) {
        query = query + `typeId=${booktype}`;
    }
    if (publisher && publisher > 0) {
        query = query + `pubId=${publisher}`;
    }
    // const query = `?authorId=${author}&typeId=${booktype}&pubId=${publisher}`;

    Http.Get(`/api/books/all` + query)
        .then((response) => response.json())
        .then((response) => {
            var allBooks = response.book;
            // Empty the anchor
            var allBooksAnchor = document.getElementById("all-book");
            allBooksAnchor.innerHTML = "";
            // Append users to anchor
            allBooks.forEach((book) => {
                allBooksAnchor.innerHTML += getBookDisplayEle(book);
            });
        });
}