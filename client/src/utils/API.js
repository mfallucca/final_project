import axios from "axios";

export default {
  // Gets all books
  getArticles: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getArticle: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveArticle: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};


