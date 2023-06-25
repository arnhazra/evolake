import express, { Router } from 'express'
import QueryController from './QueryController'
import authorize from '../../middlewares/authorize'
import queryAuthorizer from '../../middlewares/queryAuthorizer'

export default class DatasetRouter {
    public router: Router
    public queryController: QueryController

    constructor() {
        this.router = express.Router()
        this.queryController = new QueryController()
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/generate', queryAuthorizer, this.queryController.generateQuery.bind(this.queryController))
    }

    getRouter() {
        return this.router
    }
}