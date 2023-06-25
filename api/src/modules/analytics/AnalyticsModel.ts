import mongoose from 'mongoose'

const AnalyticsSchema = new mongoose.Schema({
    subscriptionKey: {
        type: String,
        required: true
    },

    datasetId: {
        type: String,
        required: true
    }
}, { versionKey: false })

const AnalyticsModel = mongoose.model('analytics', AnalyticsSchema)

export default AnalyticsModel