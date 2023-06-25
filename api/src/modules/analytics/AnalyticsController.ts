import AnalyticsModel from './AnalyticsModel'

export default class AnalyticsController {
    async createAnalytics(owner: string, query: string, response: string, subscriptionKey: string) {
        try {
            const analytics = new AnalyticsModel({ owner, query, response, subscriptionKey })
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

    async countAnalyticsBySubKey(subscriptionKey: string) {
        try {
            const analyticsCount = await AnalyticsModel.find({ subscriptionKey: subscriptionKey }).countDocuments()
            return analyticsCount
        } catch (error) {
            throw error
        }
    }

    async getAnalyticsByQuery(query: string) {
        try {
            const analytics = await AnalyticsModel.find({ query: query })
            return analytics
        } catch (error) {
            throw error
        }
    }
}