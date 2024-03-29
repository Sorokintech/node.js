import Book from "../models/books";

const getBooks = (req, res) => {
  return Book.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

const getBookById = (req, res) => {
  const { book_id } = req.params;

  return Book.findById(book_id)
    .then((book) => {
      res.status(200).send(book);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

const createBook = (req, res) => {
  return Book.create({ ...req.body })
    .then(() => {
      res.status(201).send("Book created");
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

const deleteBook = (req, res) => {
  const { book_id } = req.params;

  return Book.findByIdAndDelete(book_id)
    .then(() => {
      res.status(200).send("Book deleted");
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

const editBook = (req, res) => {
  const { book_id } = req.params;

  return Book.findByIdAndUpdate(book_id, { ...req.body })
    .then(() => {
      res.status(200).send("Book data update");
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

export default { getBooks, getBookById, createBook, editBook, deleteBook };
