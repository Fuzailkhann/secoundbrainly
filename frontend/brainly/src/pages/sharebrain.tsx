import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Sidebar } from "../components/ui/Sidebar";
import { Card } from "../components/Card";

 export type ContentType = "twitter" | "youtube" | "all";
export function SharedBrain() {
  const { hash } = useParams();
  
  const [data, setData] = useState<any[]>([]);
  const [selectedType , setSelectedType] = useState<ContentType>("all")

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/share/${hash}`)
      .then((res) => {
        setData(res.data.content);
        console.log("share brain data", res.data);
      });
  }, [hash]);

  if (!data) return <div>Loading...</div>;

  return (
    <div>  
      <Sidebar setSelectedType={setSelectedType} />
       
         <div className="p-4 ml-72 min-h-screen bg-gray-100 border-4 border-white">
             <div className='flex gap-4 flex-wrap' >
                  {data.filter((item) => selectedType === "all" || item.type === selectedType )
                  .map(({ type , link , title}) =>{
                    return <Card
                    type={type}
                    
                     title={title}
                      link={link} />
                  })}
                 
            
                 </div>
         </div>
          
     
    </div>
  );
}