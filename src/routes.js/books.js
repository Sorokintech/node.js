const router = require('express').Router();

import { getBooks, getBookById, createBook, editBook, deleteBook } from '../controllers/books';

router.get('/books', getBooks);
router.get('/books/:book_id', getBookById);
router.post('/books', createBook);
router.patch('/books/:book_id', editBook);
router.delete('/books/:book_id', deleteBook);

export default router;