import mongoose, { model , Schema} from 'mongoose' ;


// mongoose.connect("mongodb+srv://ahad:ahad@cluster0.evtddcf.mongodb.net/brainly")
//   .then(() => console.log("✅ DB connected successfully"))
//   .catch((err) => console.log("❌ DB error:", err));

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log("✅ DB connected successfully"))
  .catch((err) => console.log("❌ DB error:", err));

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
    userId: {type: mongoose.Types.ObjectId , ref: 'User' , required: true},
    // autherId: {type: mongoose.Types.ObjectId , ref: 'User' , required: true},
  
})

const LinkSchema = new Schema({
    hash: String , 
    userId : {type: mongoose.Types.ObjectId , ref: "User" , required: true , unique: true }

})

export const ContentModel =model ("Content" , ContentSchema)
export const LinkModel =model ("Link" , LinkSchema)



export const  UserModel  =model ( "User" , UserSchema)