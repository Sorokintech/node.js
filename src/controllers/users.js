import { find, findById, create, findByIdAndDelete, findByIdAndUpdate } from '../models/users';
import { findById as _findById, findByIdAndUpdate as _findByIdAndUpdate } from '../models/books';

const getUsers = (req, res) => {
    return find({}).then(
        (data) => {res.status(200).send(data)}
    )
};

const getUserById = (req, res) => {
    const {user_id} = req.params;

    return findById(user_id).then(
        (user) => {res.status(200).send(user)}
    ).catch(
        (e) => {res.status(500).send(e.message)}
    )
};

const createUser = (req, res) => {
    return create({...req.body}).then(
        () => {res.status(201).send('User created')}
    ).catch(
        (e) => {res.status(500).send(e.message)}
    )
};

const deleteUser = (req, res) => {
    const {user_id} = req.params;

    return findByIdAndDelete(user_id).then(
        () => {res.status(200).send('User deleted')}
    ).catch(
        (e) => {res.status(500).send(e.message)}
    )
};

const editUser = (req, res) => {
    const {user_id} = req.params;

    return findByIdAndUpdate(user_id, {...req.body}).then(
        () => {res.status(200).send('User data update')}
    ).catch(
        (e) => {res.status(500).send(e.message)}
    )
};

const addBookForUser = (req, res) => {
    const {user_id} = req.params;
    const {book_id} = req.params;

    _findById(book_id).then(
        (book) => {
            if (book.available === false) {
                return res.status(200).send(`Книга ${book.title}, ${book.author} отсутствует в библиотеке`)
            } else {
                _findByIdAndUpdate(book_id, {available: false}).then(
                    () => {
                        return findByIdAndUpdate(user_id, {$push: {books: book}}).then(
                            () => {
                                res.status(200).send(`Вы взяли книгу ${book.title}, ${book.author}`)
                            })
                    })
            }
        }
    ).catch(
        (e) => {res.status(500).send(e.message)}
    );
};

const returnBookByUser = (req, res) => {
    const {user_id} = req.params;
    const {book_id} = req.params;

    _findById(book_id).then(
        (book) => {
            if (book.available === true) {
                return res.status(200).send(`Книга ${book.title}, ${book.author} уже сдана в библиотеку`)
            } else {
                return _findByIdAndUpdate(book_id, {available: true}).then(
                    () => {
                        findByIdAndUpdate(user_id, {$pull: {books: {title: book.title}}}).then(
                            () => {
                                res.status(200).send(`Вы вернули книгу ${book.title}, ${book.author} в библиотеку`)
                            })
                    })
            }
        }
    ).catch(
        (e) => {res.status(500).send(e.message)}
    );
}

export default {getUsers, getUserById, createUser, editUser, deleteUser, addBookForUser, returnBookByUser};