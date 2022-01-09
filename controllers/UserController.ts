import express from 'express'
import '../core/db'
import { validationResult } from 'express-validator';
import {UserModel, UserModelInterface} from '../models/UserModel'
import { generateMD5 } from '../utils/generateHash';
import { SentMessageInfo } from 'nodemailer';
import { sendEmail } from '../utils/sendEmail';

class UserController{
    async index(_ : any, res: express.Response): Promise<void>{
        try {
            const users = await UserModel.find({}).exec();
            res.json({
                status:'success',
                data: users
            })

            
        } catch (error) {
            res.status(500).json({
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

            const data: UserModelInterface = {
                email: req.body.email,
                username: req.body.username,
                fullname: req.body.fullname,
                password: req.body.password,
                confirmHash: generateMD5(process.env.SECRET_KEY || Math.random().toString()),
            }

            const user = await UserModel.create(data)
            
            sendEmail({
                emailFrom: "admin@test.com",
                emailTo: data.email,
                subject: 'Подтверждение почты',
                html: `Для подтверждения перейдите на <a href="http:localhost:${process.env.PORT || 8888}/users/verify?hash=${data.confirmHash}">по этой ссылке</a>`,   
            },
            (err: Error | null, info: SentMessageInfo)=>{
                if(err){
                    res.json({
                        status: 'error',
                        message: err
                    })                 
                }else{
                    res.status(201).json({
                        status: 'success',
                        data: user
                    })
                }
            })
            
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error
            })
        }
    }

    async verify(req : any, res: express.Response): Promise<void>{
        try {
            const hash = req.query.hash

            if(!hash){
                res.status(400).send()
                return
            }

            const user = await UserModel.findOne({confirmHash: hash}).exec();
            if(user){
                user.confirmed = true
                user.save();
                res.json({
                    status:'success'
                })
            }else{
                res.status(404).send({
                    status: 'error',
                    message: 'Пользователь не найден'
                })
            }

            
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error
            })
        }
    }
}

export const UserCtrl = new UserController()