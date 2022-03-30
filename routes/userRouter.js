const Router = require ('express');
const { check } = require('express-validator');
const userController = require('../Controllers/userController');
const validation = require('../MiddleWare/validation');
const authMiddleware = require('../MiddleWare/authMiddleware');
const jwt = require('jsonwebtoken');
const router = new Router;
const generateJwt = (id, email, role, isActivated) => {
    return jwt.sign(
        {id, email, role, isActivated},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}
router.post('/registration',
validation.registration,
userController.registration)
router.post('/login',validation.login, userController.login)
// router.get('/check', authMiddleware, userController.check)
router.get('/activate/:link',   userController.activate)
router.get('/refresh', userController.refresh)
router.get('/logout', userController.logout)
router.get('/getusers',userController.getUsers)
router.get('/check', authMiddleware,(req, res, next)=>{
    try {
        console.log('слива', req.session.email)
        const token = generateJwt(req.auth.id, req.auth.email, req.auth.role, isActivated = true)
        
        return res.json({token: token, messeage: 'receive new tooken'})
    } catch (error) {
        console.log(error)
    }
    
})

module.exports = router;