const { check } = require('express-validator');
const validation = {
    registration: 
        [   check('login','некорректный пароль' ).isLength({ min: 3 }),
        check('email','некорректный email').isEmail(),  
        check('password','минимальная длина пароль 6 символов').isLength({min: 6}),  ],
    login: 
        [check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()]
}




module.exports = validation ;