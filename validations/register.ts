import validator from 'express-validator'

export const registerValidation = [
    validator.body('email', 'Введите E-mail').isEmail().withMessage('Неверный E-Mail').isLength({
        min: 10,
        max: 40,
    }).withMessage('Неверная длина почты. От 10 до 40.'),
    validator.body('fullname', 'Введите имя').isString().isLength({
        min: 2,
        max: 40,
    }).withMessage('Неверная длина имени. От 2 до 40.'),
    validator.body('username', 'Укажите логин').isString().isLength({
        min: 2,
        max: 40,
    }).withMessage('Неверная длина логина. От 2 до 40.'),
    validator.body('password', 'Укажите пароль').isString().isLength({
        min: 6,
    }).withMessage('Неверная длина логина. От 6.')
]