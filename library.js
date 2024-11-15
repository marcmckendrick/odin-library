document.addEventListener("DOMContentLoaded", function () {
    const newBookBtn = document.getElementById("new-book-btn");
    const closeFormBtn = document.getElementById("close-form-btn");
    const newBookFormBlock = document.getElementById("new-book-form-block");
    const bookGrid = document.getElementById("book-grid");
    const submitForm = document.getElementById("submit-form");

    // Array to store book objects
    const myLibrary = [];

    // Book Constructor Function
    function Book(title, author, pages, beenRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.beenRead = beenRead;
    }

    // Function to display books in a grid
    function displayBooks() {
        // Clear the grid
        bookGrid.innerHTML = "";

        // Iterate through the library and create cards
        myLibrary.forEach((book, index) => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("book-card");

            // Add book information
            bookCard.innerHTML = `
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Pages:</strong> ${book.pages}</p>
                <p><strong>Read:</strong> ${book.beenRead ? "Yes" : "No"}</p>
                <button class="remove-book-btn" data-index="${index}">Remove</button>
            `;

            // Append the card to the grid
            bookGrid.appendChild(bookCard);
        });

        // Add event listeners to the remove buttons
        document.querySelectorAll(".remove-book-btn").forEach((button) => {
            button.addEventListener("click", function () {
                const index = this.dataset.index;
                myLibrary.splice(index, 1); // Remove book from array
                displayBooks(); // Re-render grid
            });
        });
    }

    // Open the form when "New Book" is clicked
    newBookBtn.addEventListener("click", () => {
        newBookFormBlock.style.display = "flex";
    });

    // Close the form when "Close" is clicked
    closeFormBtn.addEventListener("click", () => {
        newBookFormBlock.style.display = "none";
    });

    // Add a new book when the form is submitted
    submitForm.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent form submission and page reload

        // Collect form data
        const title = document.getElementById("title-input").value.trim();
        const author = document.getElementById("author-input").value.trim();
        const pages = document.getElementById("num-pages-input").value.trim();
        const beenRead = document.getElementById("been-read").checked;

        // Validate form data
        if (title === "" || author === "" || pages === "") {
            alert("Please fill in all fields.");
            return;
        }

        // Create a new Book object
        const newBook = new Book(title, author, pages, beenRead);

        // Add the new book to the library
        myLibrary.push(newBook);

        // Clear the form inputs
        document.getElementById("title-input").value = "";
        document.getElementById("author-input").value = "";
        document.getElementById("num-pages-input").value = "";
        document.getElementById("been-read").checked = false;

        // Close the form
        newBookFormBlock.style.display = "none";

        // Update the grid
        displayBooks();
    });
});
