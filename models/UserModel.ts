//@ts-nocheck
import {model, Schema, Document} from 'mongoose'

export interface UserModelInterface{
    email: string;
    fullname: string;
    username: string;
    password: string;
    _id?: string;
    confirmHash: string;
    confirmed?: boolean;
    location?: string;
    about?: string;
    website?: string;
    tweets?:string[];
}

export type UserModelDocumentInterface = UserModelInterface & Document

const UserSchema = new Schema<UserModelInterface>({
    email: {
        unique: true,
        required: true,
        type: String,
    },
    fullname: {
        required: true,
        type: String
    },
    username: {
        unique: true,
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String,
        
    },
    confirmHash: {
        required: true,
        type: String,
        
    },
    location: String,
    confirmed: {
        type: Boolean,
        default: false,
    },
    about: String,
    website: String,
    tweets:[{type: Schema.Types.ObjectId, ref:'Tweet'}]
}, {
    timestamps: true
})

UserSchema.set('toJSON',{
    transform: function (_, obj){
        delete obj.password
        delete obj.confirmHash
        return obj
    }
})

export const UserModel = model<UserModelDocumentInterface>('User',UserSchema)