//@ts-nocheck
import {model, Schema, Document} from 'mongoose'

export interface TweetModelInterface{
    _id?: string;
    text: string;
    user: string;

}

export type TweetModelDocumentInterface = TweetModelInterface & Document

const TweetSchema = new Schema<TweetModelInterface>({
    text: {
        required: true,
        type: String,
        maxlength:280
    },
    user:{
        required: true,
        ref:'User',
        type: Schema.Types.ObjectId,
    }
    
}, {
    timestamps: true
})

TweetSchema.set('toJSON',{
    transform: function (_, obj){
        delete obj.password
        delete obj.confirmHash
        return obj
    }
})

export const TweetModel = model<TweetModelDocumentInterface>('Tweet',TweetSchema)