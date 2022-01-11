//@ts-nocheck
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { UserCtrl } from './controllers/UserController';
import passport from './core/passport';
import { registerValidation } from './validations/register';
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import { TweetsCtrl } from './controllers/TweetsController';
import { createTweetValidations } from './validations/createTweet';

const app = express();

app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'SECRET' }));
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session());


app.get('/users',UserCtrl.index)
app.get('/users/me', passport.authenticate('jwt',{session: false}), UserCtrl.getUserInfo)
app.get('/users/:id', registerValidation, UserCtrl.show)

app.get('/tweets',TweetsCtrl.index)
app.get('/tweets/:id',TweetsCtrl.show)
app.delete('/tweets/:id',
//passport.authenticate('jwt'), 
(req, res)=>{
    req.user = {"_id":"61dac1ded9aa108d7ce60ec6","email":"a.nikulsheev@gmail.com","fullname":"alexaaaaa","username":"coolsheff","password":"ea48576f30be1669971699c09ad05c94","confirmHash":"87d71bc86ddddc2cbde4b6c363840db3","confirmed":false,"__v":0}
    TweetsCtrl.delete(req,res)
})
app.post('/tweets', 
//passport.authenticate('jwt'),
createTweetValidations,
(req, res)=>{
    req.user = {"_id":"61dac1ded9aa108d7ce60ec6","email":"a.nikulsheev@gmail.com","fullname":"alexaaaaa","username":"coolsheff","password":"ea48576f30be1669971699c09ad05c94","confirmHash":"87d71bc86ddddc2cbde4b6c363840db3","confirmed":false,"__v":0}
    TweetsCtrl.create(req,res)
})
app.patch('/tweets/:id', 
//passport.authenticate('jwt'),
createTweetValidations,
(req, res)=>{
    req.user = {"_id":"61dac1ded9aa108d7ce60ec6","email":"a.nikulsheev@gmail.com","fullname":"alexaaaaa","username":"coolsheff","password":"ea48576f30be1669971699c09ad05c94","confirmHash":"87d71bc86ddddc2cbde4b6c363840db3","confirmed":false,"__v":0}
    TweetsCtrl.update(req,res)
})


app.get('/auth/verify', registerValidation, UserCtrl.verify)
app.post('/auth/register', registerValidation, UserCtrl.create)
app.post('/auth/login',
 //passport.authenticate('local', { failureMessage: '/login', session: false }),
(req, res)=>{
    req.user = {"_id":"61dac1ded9aa108d7ce60ec6","email":"a.nikulsheev@gmail.com","fullname":"alexaaaaa","username":"coolsheff","password":"ea48576f30be1669971699c09ad05c94","confirmHash":"87d71bc86ddddc2cbde4b6c363840db3","confirmed":false,"__v":0}
    UserCtrl.afterLogin(req,res)
})

// app.patch('/users',UserCtrl.update)
// app.delete('/users',UserCtrl.delete)

app.listen(process.env.PORT,()=>{
    
    console.log('server started');
    
})