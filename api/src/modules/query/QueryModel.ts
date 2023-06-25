import mongoose from 'mongoose'

const QuerySchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    query: {
        type: String,
        required: true
    },

    response: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },
}, { versionKey: false })

const QueryModel = mongoose.model('query', QuerySchema)

export default QueryModel