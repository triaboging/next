require('dotenv').config()

// const generateJwt = (id, email, role, isActivated) => {
//     return jwt.sign(
//         {id, email, role, isActivated},
//         process.env.SECRET_KEY,
//         {expiresIn: '24h'}
//     )
// }
module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const googleSession = req.user
        console.log('googleSession',googleSession )
        if(googleSession){
            console.log('блок сессии')
            req.auth = {
                        id : '178254814',
                       email: googleSession.email,
                       role: "USER",
                       isActivated: true
                    }
            next()
        }
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError('Ошибка авторизации'));
        }
        const accessToken = req.headers.authorization.split(' ')[1]
        console.log('accessToken', accessToken)





        if (!accessToken && !googleSession) {
            console.log('токена нету')
            return res.status(401).json({message: 'Auth error'})
        }
        if (accessToken === 'null'|| 'undefined')  {
            console.log('токена нету')
            return res.status(401).json({message: 'check your request'})
        }
        if(accessToken && !googleSession){
            console.log('ква', accessToken)
            const decoded = jwt.verify(accessToken, process.env.SECRET_KEY)
            req.auth = decoded
            next()
        }
        
        
        // console.log('виноград',googleSession)////это объект с сессии авторизации через google
        // console.log('смородина: ', req.cookies)
        // const email = req.session.email/////////UNDERFIND
        // console.log('ОБЪЕКТ EMAIL:', email )
       
        // console.log('accessaccessToken:', accessToken)///null
        // console.log('accessTokenTYPE:', typeof(accessToken))///string
       
                //  if (accessToken) {
        //     const decoded = jwt.verify(accessToken, process.env.SECRET_KEY)
        //     req.auth = decoded
        //     next()
        // }
        
        //  if(!accessToken){
        //      console.log('Кейс1')
        //     // req.auth = {
        //     //     id : googleSession.id,
        //     //    email: googleSession.email,
        //     //    role: "USER",
        //     //    isActivated: true
        //     // }
        //     return res.status(401).json({message: "CHeck", accessToken})
           
        // }
        // const googleSession = req.user;
        // console.log('Место 2')
        // if ( !googleSession && !accessToken) {
        //     return res.status(401).json({message: "Не авторизован!"})
        // }
        
    } catch (e) {
        console.log('привет ошибка', e)
        res.status(401).json({message: "Ошибка авторизации", error: e})
    }
};