import express from 'express'
import cloudinary from '../core/cloudinary'


class UploadFileController{
    async index(req : any, res: express.Response): Promise<void>{
       const file = req.filename
       const filePath = '../' + file.path
       cloudinary.v2.uploader.upload_stream({type:"auto"},(error, res)=>{
        if(error || !res){
            return res.status(500).send()
        }
        res.send()
       }).end(file.buffer)
       
    }


}

export const UploadFileCtrl = new UploadFileController()