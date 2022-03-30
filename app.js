require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const sequelize = require('./db')
const cors = require('cors')
const corsMiddleware = require('./MiddleWare/cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser');
const models = require('./models/models')
const router = require('./routes/index')
const session = require('express-session')
const passport = require('passport')
const errorHandler = require('./MiddleWare/errorMiddleware')
require('./passport')

// app.use(cors({
  //Пакет был заменен ручным corsMiddleware
// }))
app.use(corsMiddleware)
app.use(express.json())
app.use(fileUpload({}))
const bodyParser = require('body-parser')
const tokenService = require('./service/token-service')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser('you secret key'))
// app.use(
//   session({
//     secret: 'you secret key',
//     saveUninitialized: false,
//     cookie:{
//       httpOnly: false
//     }
//   })
// )



// module.exports = function CheckCookieAuth(req, res, next) {
  
//   try {
//       const email = req.user.email
//       console.log('your_Email:', email)
//       if (!email) {
//           next()
//       }
      
//     //   req.email = email
//      } //  console.log('EMAIL:', email)
//    catch (e) {
//       res.status(401).json({message: "Не авторизован"})
//   }
// };
// const AuthController = {
//    googleOauth(req, res) {
//     if (!req.user) {
//       return res.status(400).send('Authentication failed!'); 
//     }
//     const { email } = req.user; 
//     console.log('email:', email)
//     // const user = await User.findOne({ where: { email } });
//     // const token = jwt.sign({ id, email }, process.env.JWT_SECRET);
//     return res.status(200).send({ email });
//   }
// };
app.get('/one',  (req, res) => {
  // req.session.name = req.body.name;
  req.session.Auth = true;//установить
  console.log(req.session);
  console.log(req.session.id);
  console.log('привет', req.headers);
  res.cookie('token', '12345ABCDE', {
    maxAge: 3600 * 24,
    secure: false,
    httpOnly: false
  })
   res.send('Hello World!');
})
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.get('/some',  (req, res) => {
  console.log('from someroute:',req.session)
  console.log('from someroute:', req.session.id)
  console.log('Cookie: ', req.cookies)
   res.send('somePage!');
})
app.get('/',  async(req, res) => {
  let userId = 1;
  let refreshToken = 'с пасхой!'
  
  const token = await tokenService.saveToken(userId, refreshToken)
  // const token = await models.Tokens.create({UserId: userId, refreshToken})
    console.log('TOKEN', token)
  res.send(`Запрос в базу ушел `)
  //  res.send('<a href="/auth/google">auth with google</a>');
})
app.get('/session', (req, res)=>{
  // console.log('груша', req.session.email)
  console.log('свеколка', req.session.email)
  console.log('Cookieeee: ', req.cookies)
  res.send('EPIC Seesion...');
})

app.get('/auth/google',  
  passport.authenticate('google', { scope: ['email', 'profile'] }
  // , { session: false }
  ),
 
  (req, res, next)=>{
    
    console.log('ответ', req)
    res.json({
      message: 'Signup successful',
      user: req.user
      });
  }
)
app.get( '/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/protected',
    failureRedirect: '/failure'
  })
);
app.get('/failure', (req, res)=>{
  req.session.email = 'vasia@gmail.com'
  console.log('slkjfsjfsjflsjfsjlfjskflsjf')
  res.cookie('token', '12345ABCDE', {
    maxAge: 3600 * 24,
    secure: false,
    httpOnly: false
  })
  console.log('шишки')
  res.send('EPIC FAIL...')
})


app.get('/protected',  (req, res) => {
  if(!req.user){

   return res.sendStatus(401);
  }
  // const user = req.user
  // const candidate = await User.findOne({where: {email}})
  
  console.log('вы авторизировались через гугл', req.user.email)
  res.redirect('http://localhost:3000')

  res.json({messege: 'авторизация прошла', data: req.user});
});

app.use('/lapi', router);
////////////////
app.use(errorHandler);
///////////////////
app.listen(port, async() => { 
  try{
    await sequelize.authenticate()
    await sequelize.sync({alter: true})//{force: true}/{alter: true}
  }catch(e){
    console.log(e)
  }
  console.log(`Example app listening on port ${port}`)
})

// Всем привет. Такой вопрос теоретический по сессии.. Обычно для хранения сессии исп. базу данный либо редис c аналогами.. ради любопытства набрал такой код.....Открыл в разных браузерах постманом. Согласно многих источников :"В работе с сессией в таком формате, как приведено в примере, есть один важный нюанс - конструкция будет работать только для одного пользователя. Объект Node.js сессии глобальный и будет перезаписываться данными последнего пользователя. Чтобы избежать этого используются хранилища оперативной памяти." Но у меня все работает как надо , идентификаторы и сессия выводится разная для разных браузеров.. Может я чего то не понимаю?? Вот код:
