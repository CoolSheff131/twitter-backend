import express from 'express'
import cloudinary from '../core/cloudinary'


class UploadFileController{
    async index(req : any, res: express.Response): Promise<void>{
       const file = req.image
       console.log(req)
       cloudinary.v2.uploader.upload_stream({type:"auto"},(error, result)=>{
        if(error || !result){
            return res.status(500).send()
        }
        res.status(201).send({
            url: result.url,
            size: result.bytes / 1024,
        })
       }).end(file.buffer)
       
    }


}

export const UploadFileCtrl = new UploadFileController()