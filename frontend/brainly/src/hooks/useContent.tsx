import axios from "axios";
import { useEffect, useState } from "react";
import {BACKEND_URL}  from "../config";

export function useContent() {

    type Content  = {
        type : "twitter" | "youtube" ;
        title : string ;
        link: string ;



    }
    const [ contents , setContents ] = useState<Content[]>([])

    function fetchContent(){
        const token = localStorage.getItem("token");
          if (!token) return;

          axios.get(`${BACKEND_URL}/api/v1/contentview` , {
            headers:{
                "Authorization" : localStorage.getItem("token")
            }
           
            
        })
        .then((response) =>{
            setContents(response.data.content)
            console.log("contentview api " , response.data.content)

        })

    }

    useEffect(() =>{
        fetchContent();
        let interval = setInterval(() =>{
            fetchContent();

        } , 10 * 1000)

        return () =>{
            clearInterval(interval)
        }
      

    } , [])
    return {contents , fetchContent} ;

}
