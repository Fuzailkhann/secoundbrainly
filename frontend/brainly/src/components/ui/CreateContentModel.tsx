import { useRef, useState } from "react";
import { CloseIcon } from "../../icons/CloseIcon";
import { Input } from "../input";
import { Button } from "./Button";
import { BACKEND_URL } from "../../config";
import axios from "axios";

interface ContentModel{
    open: boolean;
    onClose : () => void;
}

enum ContentType {
    youtube = "youtube",
    twitter = "twitter"
}
export function CreateContentModal({open , onClose }: ContentModel){
    const titleRef = useRef<HTMLInputElement>(null)
    const linkRef = useRef<HTMLInputElement>(null)
    const [type , setType] = useState(ContentType.youtube)

     async function addContent(){
        const  title = titleRef.current?.value;
        const link = linkRef.current?.value;
        
         

        await axios.post(`${BACKEND_URL}/api/v1/content` , {
            link ,
            title ,
            type


        } , {
            headers:{
                "Authorization": localStorage.getItem("token")
            }
        })
        onClose();
     


        
    }
    return <div>
        {
            open && <div> <div className="w-screen h-screen bg-slate-500  p-8 fixed border top-0 left-0 opacity-60 flex justify-center">
                

                    </div>
                    <div className="p-4 w-screen h-screen fixed top-0  left-0 felx justify-center ">
                        <div className =" p-8 flex flex-col justify-center h-screen items-center  p-4">
                    
                    <span className="bg-white opacity-100 rounded fixed">
                        <div className="flex justify-end ">
                            <div onClick={onClose}>
                            <CloseIcon/>
                            </div>
                        </div>
                        <div className="p-4">
                            <Input userrefrence= {titleRef} placeholder = "Enter Title"/>
                           
                            <Input userrefrence= {linkRef} placeholder = "past your link"/>
                        </div>
                        <div className="">
                            <h1>Type</h1>
                            <div className="flex gap-1 p-4 flex justify-center">
                                <Button size ="md"
                                 onClick={() =>{
                                setType(ContentType.youtube)
                            }} 
                            text ="youtube" 
                            variant ={ type === ContentType.youtube ? "primary" : "secondary" } >

                            </Button>

                            <Button size ="md" 
                            onClick = {() =>{
                                setType(ContentType.twitter)
                               }} 
                               text ="twitter" 
                            variant ={ type === ContentType.twitter ? "primary" : "secondary" } ></Button>

                            </div>
                            
                        </div>
                        <div  className = " flex items-center justify-center"> 
                        <Button onClick= {addContent} variant="primary" size="md" text="Submit"></Button>
                        </div>
                    </span>
                    </div>

               
                </div>
            </div>

        }

    </div>
}

