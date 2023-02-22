const router = require('express').Router();

import { getUsers, getUserById, createUser, deleteUser, editUser, addBookForUser, returnBookByUser } from '../controllers/users';

router.get('/users', getUsers);
router.get('/users/:user_id', getUserById);
router.post('/users', createUser);
router.patch('/users/:user_id', editUser);
router.delete('/users/:user_id', deleteUser);
router.put('/users/:user_id/:book_id', addBookForUser);
router.post('/users/:user_id/:book_id', returnBookByUser);

export default router;