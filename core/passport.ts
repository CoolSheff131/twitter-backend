import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import {Strategy as JWTstrategy, ExtractJwt} from 'passport-jwt'
import { UserModel, UserModelInterface } from '../models/UserModel'
import { generateMD5 } from '../utils/generateHash'



passport.use(
    new LocalStrategy(
        async (username,password,done): Promise<void> =>{
        try {
            console.log('aaa');
            const user = await UserModel.findOne({$or: [{email: username}, {username}] }).exec()
            if(!user){
                return done(null,false)
            }
             
            if(user.password === generateMD5(password + process.env.SECRET_KEY)){
                done(null,user)
            }else{
                done(null,false)
            }
        } catch (error) {
            console.log(1);
            
            done(error,false)
        }
    })
)

passport.serializeUser((user: any,done: any)=>{
    done(null,user?._id)
})


passport.deserializeUser((id,done)=>{
    UserModel.findById(id,(err: any,user: any)=>{
        done(err, user)
    })
})

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.SECRET_KEY || '123',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async (payload, done)=>{
            try {
                return done(null, payload.user)
            } catch (error) {
                done(error)
            }
        }
    )
)

const a = passport

export default a