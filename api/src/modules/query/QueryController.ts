import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import arraySort from 'array-sort'
import statusMessages from '../../constants/statusMessages'
import DatasetModel from './QueryModel'
import jwt from 'jsonwebtoken'
import UserModel from '../user/UserModel'
import { envConfig } from '../../../config/envConfig'
import AnalyticsController from '../analytics/AnalyticsController'

export default class DatasetController {
    public subscriptionSecret: string
    public analyticsController: AnalyticsController

    constructor() {
        this.subscriptionSecret = envConfig.subscriptionSecret
        this.analyticsController = new AnalyticsController()
    }

    async getData(req: Request, res: Response) {
        try {
            const subscriptionId = req.params.subscriptionId
            const datasetId = req.params.datasetId
            const subscription = jwt.verify(subscriptionId, this.subscriptionSecret, { algorithms: ['HS256'] })
            const userId = (subscription as any).userId
            const selectedPlan = (subscription as any).selectedPlan
            const { subscriptionKey } = await UserModel.findById(userId)
            if (subscriptionId === subscriptionKey) {
                const txCount = (await this.analyticsController.getAnalyticsBySubKey(subscriptionKey)).length
                switch (selectedPlan) {
                    case 'Standard':
                        if (txCount < Number(envConfig.standardSubscriptionReqLimit)) {
                            const data = await DatasetModel.findById(datasetId).select('data')
                            this.analyticsController.createAnalytics(subscriptionKey, datasetId)
                            return res.status(200).json({ data })
                        }

                        else {
                            throw new Error
                        }

                    case 'Premium':
                        if (txCount < Number(envConfig.premiumSubscriptionReqLimit)) {
                            const data = await DatasetModel.findById(datasetId).select('data')
                            this.analyticsController.createAnalytics(subscriptionKey, datasetId)
                            return res.status(200).json({ data })
                        }

                        else {
                            throw new Error
                        }

                    default:
                        break
                }
            }

            else {
                throw new Error
            }
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
}