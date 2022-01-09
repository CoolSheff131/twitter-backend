import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { UserCtrl } from './controllers/UserController';
import { registerValidation } from './validations/register';


const app = express();


app.use(express.json())

app.get('/users',UserCtrl.index)
app.post('/users', registerValidation, UserCtrl.create)
app.get('/users/:id', registerValidation, UserCtrl.show)
app.get('/users/verify', registerValidation, UserCtrl.verify)
// app.patch('/users',UserCtrl.update)
// app.delete('/users',UserCtrl.delete)

app.listen(process.env.PORT,()=>{
    
    console.log('server started');
    
})