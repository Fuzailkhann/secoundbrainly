import mongoose, { model , Schema} from 'mongoose' ;


mongoose.connect("mongodb://localhost:27017/brainly")



const UserSchema = new Schema({
    username : { type : String , required : true , unique : true} ,
    password : { type : String , required : true}, 
    
    }
)

const ContentSchema = new Schema ({
    title: String , 
    link: String  , 
    type: String,

    tags: [ {type : mongoose.Types.ObjectId, ref : 'Tag'}] ,
    userId: {type: mongoose.Types.ObjectId , ref: 'User' , require: true},
    autherId: {type: mongoose.Types.ObjectId , ref: 'User' , require: true},
  
})

const LinkSchema = new Schema({
    hash: String , 
    userId : {type: mongoose.Types.ObjectId , ref: "User" , require: true , unique: true }

})

export const ContentModel =model ("Content" , ContentSchema)
export const LinkModel =model ("Link" , LinkSchema)



export const  UserModel  =model ( "User" , UserSchema)