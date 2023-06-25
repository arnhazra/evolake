import { Request, Response } from 'express'
import { Configuration, OpenAIApi } from 'openai'
import { envConfig } from '../../../config/envConfig'
import AnalyticsController from '../analytics/AnalyticsController'

export default class QueryController {
    public subscriptionSecret: string
    public analyticsController: AnalyticsController

    constructor() {
        this.subscriptionSecret = envConfig.subscriptionSecret
        this.analyticsController = new AnalyticsController()
    }

    async generateQuery(req: Request, res: Response) {
        try {
            const { selectedDb, userQuery, subscriptionKey } = req.body

            const configuration = new Configuration({ apiKey: envConfig.openAIApiKey })
            const openai = new OpenAIApi(configuration)
            const finalQuery = `Create a ${selectedDb} request to ${userQuery.charAt(0).toLowerCase() + userQuery.slice(1)}`

            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: finalQuery,
                temperature: 0.3,
                max_tokens: 60,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            })
            const generatedQuery = response.data.choices[0].text
            this.analyticsController.createAnalytics(finalQuery, generatedQuery)
            return res.status(200).json({ msg: generatedQuery })
        }
        catch (error) {
            return res.status(500).json(error)
        }
    }
}