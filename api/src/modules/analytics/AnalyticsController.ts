import AnalyticsModel from './AnalyticsModel'

export default class AnalyticsController {
    async createAnalytics(subscriptionKey: string, datasetId: string) {
        try {
            const analytics = new AnalyticsModel({ subscriptionKey, datasetId })
            await analytics.save()
        }

        catch (error) {
            throw error
        }
    }

    async getAnalyticsBySubKey(subscriptionKey: string) {
        try {
            const analyticsList = await AnalyticsModel.find({ subscriptionKey: subscriptionKey })
            return analyticsList
        } catch (error) {
            throw error
        }
    }
}