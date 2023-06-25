import { check } from 'express-validator'

export const createDatasetValidations = [
    check('name').notEmpty().withMessage('Name must not be empty'),
    check('category').notEmpty().withMessage('Category must not be empty'),
    check('description').notEmpty().withMessage('Description must not be empty'),
    check('data').isArray().withMessage('Data must be an array of objects'),
]