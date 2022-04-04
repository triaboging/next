require('dotenv').config()
const ApiError = require('../MiddleWare/ApiError');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { User } = require('../models/models');
const uuid = require('uuid');
const mailService = require('../service/mailService');
const tokenService = require('../service/token-service');
const generateJwt = (id, email, role, isActivated) => {
    return jwt.sign(
        {id, email, role, isActivated},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}
class userController{
    
    async registration(req, res, next){
        const errors = validationResult(req) 
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array(), 
                message: 'некорректные данные при регистрации' })
        }
        const {login, email, password } = req.body
        if (!login || !email || !password) {
            return next(ApiError.badRequest('Некорректные данныe...'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const activationLink = uuid.v4()
        const user = await User.create({login, email,  password: hashPassword, activationLink})
        console.log('USER', user)
        // const token = generateJwt(user.id, user.email, user.role)
        await mailService.sendActivationMail(email, `${process.env.API_URL}/lapi/user/activate/${activationLink}` )
        const tokens = tokenService.generateTokens( user.email, user.role, user.isActivated);
        await tokenService.saveToken(user.id, tokens.refreshToken);
        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json({ messege: 'пользователь зарегестрирован, на почту отправлено письмо с подтверждением',
        token: tokens.accessToken
    })
    }
    async login(req, res, next){
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array(), 
                message: 'некорректные данные при регистрации' })
        }
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        
        // await mailService.sendActivationMail(email, `${process.env.API_URL}/lapi/user/activate/${user.activationLink}` )

        // const token = generateJwt(user.id, user.email, user.role, user.isActivated)
        const tokens = tokenService.generateTokens( user.email, user.role, user.isActivated);
        await tokenService.saveToken(user.id, tokens.refreshToken);
        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json({ messege: 'Аутентификация прошла успешно',
        token: tokens.accessToken
        })

    }
    // async check(req, res, next){
    //     try {
    //         const token = generateJwt(req.user.id, req.user.email, req.user.role)
    //         console.log('слива', req.session.email)
    //         return res.json({token: token, messeage: 'receive new tooken'})
    //     } catch (error) {
    //         console.log(error)
    //     }
        
    // }
    async activate(req, res, next){
        try {
            const activationLink = req.params.link
            const user = await User.findOne({where: {activationLink}})
            if(!user){
                throw new Error('Некорректная ссылка для активации')
            }
           const activate = await User.update({
                isActivated: true
            },
             {where: {activationLink: user.activationLink}})
            const activatedUser = await User.findOne({where: {activationLink}})
            console.log("activatedUser:", activatedUser)
            const userData = {
            id: activatedUser.id,
            email: activatedUser.email,
            role: activatedUser.role,
            login: activatedUser.login,
            isActivated: activatedUser.isActivated
            }
           
            // const token = generateJwt(activatedUser.id, activatedUser.email, activatedUser.role, activatedUser.isActivated)
            return  res.redirect('http://localhost:3000/confirmation'),
            res.json({ message: "аккаунт подтвержден" ,
            userData
            })
            
        } catch (error) {
            console.log(error)
        }
       
    }
    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            //////////////////
            const googleSession = req.user
            console.log('googleSession',googleSession )
            if(googleSession){
                console.log('блок сессии')
                const googledata = {
                           email: googleSession.email,
                           login: googleSession.displayName,
                           isActivated: true
                        }
                const user = await User.findOne({where:{email: googledata.email}});
                if(!user){
                    console.log('ГУГЛДАТАЕслиНеЮзер', googledata)
                    const tokens = tokenService.generateTokens( googledata.email, googledata.role = 'USER', googledata.isActivated);
                    const fakepassword = uuid.v4();
                    const hashPassword = await bcrypt.hash(fakepassword, 5)
                    const fakeLink =  uuid.v4();
                    const user = await User.create
                    ({login:googledata.login,
                     email: googledata.email,
                     password: hashPassword,
                     activationLink: fakeLink,
                    isActivated: googledata.isActivated})
                    await tokenService.saveToken(user.id, tokens.refreshToken);
                    const userData={
                        id : user.id,
                        email: user.email,
                        login: user.login,
                        isActivated: user.isActivated,
                        
                    }
                    res.clearCookie("connect.sid", {path: '/'})
                    req.session.destroy();
                    res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
                    return res.json({message: 'refresh token updated', userData,
                     token : tokens.accessToken });
                }else{
                    console.log('ГУГЛДАТАЕслиЮзер', googledata)
                    const tokens = tokenService.generateTokens( user.email, user.role, user.isActivated);
                    await tokenService.saveToken(user.id, tokens.refreshToken);
                    const userData={
                        id : user.id,
                        email: user.email,
                        login: user.login,
                        isActivated: user.isActivated,
                        role: user.role
                    }
                    res.clearCookie("connect.sid", {path: '/'})
                    req.session.destroy();
                    res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
                    return res.json({message: 'refresh token updated', userData,  token : tokens.accessToken });

                }
            }


            ////////////............,,,,,,........................
            // const userData = await userService.refresh(refreshToken);
            if (!refreshToken) {
                throw ApiError.UnauthorizedError('Ошибка авторизации...!!!!!!!!');
            }
            const tokenData = tokenService.validateRefreshToken(refreshToken);
            const tokenFromDb = await tokenService.findToken(refreshToken);
            if (!tokenData || !tokenFromDb) {
                throw ApiError.UnauthorizedError('Тут тухляк уже');
            }
            
            const userRefresh = await User.findOne({where:{email: tokenData.email}});
            // const userDto = new UserDto(user);
            console.log('Лабрадор2', userRefresh.email, userRefresh.id)
            const tokens = tokenService.generateTokens( userRefresh.email, userRefresh.role, userRefresh.isActivated );
    
            await tokenService.saveToken(userRefresh.id, tokens.refreshToken);
            const userData={
                id : userRefresh.id,
                email: userRefresh.email,
                login: userRefresh.login,
                isActivated: userRefresh.isActivated,
                role: userRefresh.role
            }
            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json({message: 'refresh token updated', userData,  token : tokens.accessToken });
        } catch (e) {
            console.log(e)
            next(e);
        }
    }
    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            await tokenService.removeToken(refreshToken);
            
            res.clearCookie('refreshToken');
            return res.json({ message: 'Вы вышли из аккаунта'});
        } catch (e) {
            next(e);
        }
    }
    async getUsers(req, res, next){
        try {
            const users = await User.findAll({attributes: ['email', 'login']})
            console.log('БАЗА', users)
            return res.json({
                message: 'Список пользователей',
                users
            })
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

}
module.exports = new userController()