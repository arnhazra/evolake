import { check } from 'express-validator'

export const generateAuthCodeValidators = [
    check('email', 'Invalid Email Format').isEmail(),
]

export const verifyAuthCodeValidators = [
    check('email', 'Provide valid email').isEmail(),
    check('otp', 'Invalid OTP format').notEmpty(),
    check('hash', 'Invalid Hash').notEmpty(),
]