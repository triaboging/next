const jwt = require('jsonwebtoken');
const { Tokens } = require('../models/models');


class TokenService {
    generateTokens(id, email, role, isActivated) {
        try {
        const accessToken = jwt.sign({id, email, role, isActivated}, process.env.JWT_ACCESS_SECRET, {expiresIn: '15s'})
        const refreshToken = jwt.sign({id, email, role, isActivated}, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
        } catch (error) {
            console.log(error)
        }
        
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        try {
            const tokenData = await Tokens.findOne({where: {UserId: userId}})
            if (tokenData) {
                tokenData.refreshToken = refreshToken;
            return  await tokenData.save();
            
            }
            const token = await Tokens.create({UserId: userId, refreshToken})
            return token;
        } catch (error) {
            console.log(error)
        }
       
    }

    async removeToken(refreshToken) {
        const tokenData = await  Tokens.destroy({where: {refreshToken}})
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await Tokens.findOne({where: {refreshToken}})
        return tokenData;
    }
}

module.exports = new TokenService();
