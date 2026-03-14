import express from "express"


import jwt from "jsonwebtoken"

import { jwt_PASSWORD } from "./config.js"

import { ContentModel, LinkModel, UserModel } from "./db.js"
import { userMiddleware } from "./middleware.js"
import { random } from "./utils.js"
import cors from "cors"


const app = express()
app.use(express.json())
app.use(cors());

app.post ( "/api/v1/signup"  ,  async (req, res) =>{
    const { username , password} = req.body
     try {  

    
        await UserModel.create({
        username : username ,
        password : password
    })
    res.json({
        message : "user signup"
    })

     } catch(error) {
        res.status(411).json({
            message :  "user already exists"
        })
     }
   


})

app.post ( "/api/v1/signin" , async (req, res) => {
    const { username , password}  = req.body;

    const existingUser = await  UserModel.findOne({
        username , 
        password
    })
    console.log(existingUser)
    if (existingUser) {
        const token  = jwt.sign({
            id : existingUser._id
        } , jwt_PASSWORD)

        res.json({
            token, 
            username: existingUser.username
        })
    } else {
        res.status(403).json({
            message : " incorrect credentioals"
        })

    }


    
})

app.post("/api/v1/content" ,userMiddleware , async(req, res) =>{
    const link = req.body.link;
    const title = req.body.title;
    const type = req.body.type;

    await ContentModel.create({
        link , 
        title, 
        type,
        //@ts-ignore
        userId: req.userId, 
        tags : []
    })
    res.json({
        message : "Content added"
    })



})

app.get( "/api/v1/contentview" , userMiddleware ,async (req, res) =>{
    try{

         //@ts-ignore
    const userId = req.userId;

    const content = await ContentModel.find({
        userId
    }).populate("userId" , "username")
    res.json({
        content
    })
   
    } catch(error){
         console.log("Content fetch error:", error);

    res.status(500).json({
      message: "Internal server error"
    });

    }
})


//     //@ts-ignore
//     const userId = req.userId;

//     const content = await ContentModel.find({
//         userId
//     }).populate("userId" , "username")
//     res.json({
//         content
//     })
// })

app.delete("/api/v1/content" , userMiddleware , async (req, res) =>{
    const contentId = req.body.contentId;

    await ContentModel.findOneAndDelete({
        _id : contentId , 
        //@ts-ignore
        userId: req.userId
    })
    res.json({
        message : "content deleted"
    })

}
)

app.post( "/api/v1/brain/share" , userMiddleware , async(req, res) =>{
    const share = req.body.share
    if (share) {
        const existingLink = await LinkModel.findOne({
            //@ts-ignore
            userId: req.userId

        })
         if (existingLink) {
            res.json({
                hash : existingLink.hash
            })
         
          
            return;
         }
        const hash = random(10)
         await LinkModel.create({
            //@ts-ignore
            userId : req.userId ,
            hash : hash
        })
        res.json ({
            hash: hash
        })
    }else {
         await LinkModel.deleteOne({
            //@ts-ignore
            userId : req.userId
        })
        res.json({
            message: "share link removed"
        })
    }
   

})

app.get("/api/v1/share/:hash" , async (req, res) =>{
    const shareLink = req.params.hash;

    const link = await LinkModel.findOne({
        hash : shareLink
    })
    if (!link){
        res.status(411).json({
            message : " invalid link"
        })
        return;
    }
    
    const content = await ContentModel.find({
        userId : link.userId
        })

        const user = await UserModel.findOne({
            _id : link.userId

        })
        if (!user) {
            res.status(411).json({
                message: "user not found , error should ideally not happen"
            })
            return;
        }

        res.json({
            username: user.username,
            content : content
        })
        

    

})



app.listen(3000)