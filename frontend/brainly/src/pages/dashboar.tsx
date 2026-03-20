

import { Button } from '../components/ui/Button'
import { PlusIcon } from '../icons/plusIcon'
import { Card } from '../components/Card'
import { ShareIcon } from '../icons/shareIcon'
import { CreateContentModal } from '../components/ui/CreateContentModel'
import {useEffect, useState } from 'react'
import { Sidebar } from '../components/ui/Sidebar'
import {useContent} from "../hooks/useContent"
import { BACKEND_URL } from '../config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


 export type ContentType = "twitter" | "youtube" | "all";
function Dashboard() {
  const [modalOpen , setModalOpen]  = useState(false)
  const {contents  , fetchContent}= useContent();
  const navigate = useNavigate()


  const [selectedType , setSelectedType] = useState<ContentType>("all")
  useEffect

  useEffect(() =>{
    fetchContent()

  } , [modalOpen , selectedType])
//   useEffect(() => {
//   contents.forEach(item => console.log(item.type))
// }, [contents])
  
  return (
    <div>
      <Sidebar setSelectedType = {setSelectedType} />
      <div className='p-4 ml-72 min-h-screen bg-gray-100 border-4 border-white'>
      <CreateContentModal open= {modalOpen} onClose = {() => setModalOpen(false)} />
      <div className='flex justify-end gap-4'>
     <Button className ="cursor-pointer" onClick={() => setModalOpen(true)}  startIcon={<PlusIcon size ="md"/>} size="sm" variant= "primary" text="Add content"/>
     <Button onClick = { async() =>{
      const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share` , {
        share: true
      } , {
        headers:{
          "Authorization" : localStorage.getItem("token")
        }
      })
      
      // const shareLink = `http://localhost:5173/share/${response.data.hash}`;
      navigate(`/share/${response.data.hash}`);
      //alert(shareLink)
     
     }} startIcon={<ShareIcon/>} size="sm" variant= "secondary" text="Share Brain"/>
     </div>

     <div className='flex gap-4 flex-wrap mt-4' >
   
      {contents.filter((item) => selectedType === "all" || item.type === selectedType)
      .map(({ type , link , title} , index) =>{
        return <Card  
        type={type}
        key={index}
         
         title={title}
          link={link} />
      })}
     

     </div>
     
    
    </div>
    </div>
    
  )
}

  

export default Dashboard;
