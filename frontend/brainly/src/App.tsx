

// import { Button } from './components/ui/Button'
// import { PlusIcon } from './icons/plusIcon'
// import { Card } from './components/Card'
// import { ShareIcon } from './icons/shareIcon'
// import { CreateContentModal } from './components/ui/CreateContentModel'
// import { useState } from 'react'
// import { Sidebar } from './components/ui/Sidebar'

import{ Signin} from "./pages/Signin"
import {BrowserRouter , Routes , Route}  from "react-router-dom"
import   {Signup } from "./pages/Signup";
import Dashboard from "./pages/dashboar";
import {SharedBrain }from "./pages/sharebrain";
// import Dashboard from "./pages/dashboar";
function App(){
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Signup/>} />
    <Route path="/signup" element={<Signup/>} />
    <Route path= "/signin" element={<Signin/>} />
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path = "/share/:hash" element = {<SharedBrain/>} />
  </Routes>
  </BrowserRouter>
}
//function App() {
  // const [modalOpen , setModalOpen]  = useState(false)
  // return (
  //   <div>
  //     <Sidebar />
  //     <div className='p-4 ml-72 min-h-screen bg-gray-100 border-4 border-white'>
  //     <CreateContentModal open= {modalOpen} onClose = {() => setModalOpen(false)} />
  //     <div className='flex justify-end gap-4'>
  //    <Button className ="cursor-pointer" onClick={() => setModalOpen(true)}  startIcon={<PlusIcon/>} size="sm" variant= "primary" text="Add content"/>
  //    <Button startIcon={<ShareIcon/>} size="sm" variant= "secondary" text="Share Brain"/>
  //    </div>
  //    <div className='flex gap-4' >
  //     <Card  type="youtube" title ="how to use brainly" link= "https://www.youtube.com/watch?v=Ep4yASWJgf4"/>
  //    <Card type ="twitter" title = "MOdi involve in epsitine file" link="https://x.com/iamsrk/status/1993005395003273462"/>

  //    </div>
     
    
  //   </div>
  //   </div>
    
  // )
//}

  

export default App;
