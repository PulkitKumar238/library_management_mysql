const apiUrl = "http://localhost:5000/books";

const fetchBooks = async () => {
  const response = await fetch(apiUrl);
  const books = await response.json();
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";

  books.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.className = "book-card";
    
    let statusClass = 'status-unavailable';
    if (book.available_copies > 5) {
      statusClass = 'status-available';
    } else if (book.available_copies > 0) {
      statusClass = 'status-low';
    }

    bookItem.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Genre:</strong> ${book.genre}</p>
      <p><strong>ISBN:</strong> ${book.isbn}</p>
      <p><strong>Publication Date:</strong> ${new Date(book.publication_date).toLocaleDateString()}</p>
      <p><strong>Available Copies:</strong> <span class="${statusClass}">${book.available_copies}</span></p>
      <p><strong>ID:</strong> ${book.id}</p>
    `;
    bookList.appendChild(bookItem);
  });
};

document.getElementById("addBookForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const bookData = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    genre: document.getElementById("genre").value,
    isbn: document.getElementById("isbn").value,
    publication_date: document.getElementById("publication_date").value,
    available_copies: document.getElementById("available_copies").value,
  };

  await fetch(`${apiUrl}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookData),
  });

  alert("Book added successfully!");
  await fetchBooks();
  performSearch();
});

document
  .getElementById("updateBookForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const bookId = document.getElementById("updateId").value;
    const availableCopies = document.getElementById("updateCopies").value;

    await fetch(`${apiUrl}/update/${bookId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ available_copies: availableCopies }),
    });

    alert("Book updated successfully!");
    fetchBooks();
  });

document
  .getElementById("deleteBookForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const bookId = document.getElementById("deleteId").value;

    await fetch(`${apiUrl}/delete/${bookId}`, {
      method: "DELETE",
    });

    alert("Book deleted successfully!");
    fetchBooks();
  });

fetchBooks();

const performSearch = () => {
  const searchText = document.getElementById("searchInput").value.toLowerCase();
  const searchType = document.getElementById("searchType").value;

  const bookCards = document.querySelectorAll(".book-card");
  bookCards.forEach((card) => {
    let searchValue = "";

    switch (searchType) {
      case "title":
        searchValue = card.querySelector("h3").textContent.toLowerCase();
        break;
      case "author":
        const authorP = Array.from(card.querySelectorAll("p")).find((p) =>
          p.textContent.includes("Author:")
        );
        searchValue = authorP ? authorP.textContent.toLowerCase() : "";
        break;
      case "genre":
        const genreP = Array.from(card.querySelectorAll("p")).find((p) =>
          p.textContent.includes("Genre:")
        );
        searchValue = genreP ? genreP.textContent.toLowerCase() : "";
        break;
    }

    searchValue = searchValue
      .replace("author:", "")
      .replace("genre:", "")
      .trim();

    card.style.display = searchValue.includes(searchText) ? "block" : "none";
  });
};

document.getElementById("searchInput").addEventListener("input", performSearch);
document.getElementById("searchType").addEventListener("change", performSearch);
document.getElementById("searchInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    performSearch();
  }
});
