import express from 'express'
import './core/dby'
import { validationResult } from 'express-validator';
import {UserModel} from '../models/UserModel'
import { generateMD5 } from '../utils/generateHash';
import mailer from '../core/mailer'
import { SentMessageInfo } from 'nodemailer';

class UserController{
    async index(_ : any, res: express.Response): Promise<void>{
        try {
            const users = await UserModel.find({}).exec();
            res.json({
                status:'success',
                data: users
            })

            
        } catch (error) {
            res.json({
                status: 'error',
                message: JSON.stringify(error)
            })
        }
    }
    async create(req: express.Request, res: express.Response): Promise<void>{
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                res.status(400).json({status:'error', errors: errors.array()})
            }

            const data = {
                email: req.body.email,
                username: req.body.username,
                fullname: req.body.fullname,
                password: req.body.password,
                confirm_hash: generateMD5(process.env.SECRET_KEY || Math.random().toString())
            }

            const user = await UserModel.create(data)
            res.json({
                status: 'success',
                data: user
            })
            mailer.sendMail({
                from: "admin@test.com",
                to: data.email,
                subject: 'Подтверждение почты',
                html: `Для подтверждения перейдите на <a href="http:localhost:${process.env.PORT || 8888}/signup/verify?hash=${data.confirm_hash}>по этой ссылке</a>"`
            },
            function(err: Error | null, info: SentMessageInfo){
                if(err){
                    console.log(err);
                }else{
                    console.log(info);   
                }
            })
        } catch (error) {
            res.json({
                status: 'error',
                message: JSON.stringify(error)
            })
        }
    }
}

export const UserCtrl = new UserController()