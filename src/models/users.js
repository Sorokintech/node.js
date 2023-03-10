import { Schema, model } from "mongoose";

const userSchema = new Schema( {
    name: {
        type: String,
        required: true,
        minLength: 2
    },
    surname: {
        type: String,
        required: true,
        minLength: 2
    },
    username: {
        type: String,
        required: true,
        minLength: 5
    },
    books: {
        type: Array,
        required: false,
        minLength: false
    }
})

export default model('user', userSchema);