// import { useEffect } from "react";
// import { ShareIcon } from "../icons/shareIcon";


// interface CardProps{
//     title: string ;
//     link: string ;
//     type: "youtube" | "twitter" ;
// }

// export function Card({title , link , type}: CardProps) {

 

// useEffect(() => {
//   if (type === "twitter" && window.twttr) {
//     window.twttr.widgets.load();
//   }
// }, [type, link]);

//     return<div className=" p-4 rounded-md min-w-48 w-72 min-h-32 border shadow-md  border-gray-200 bg-white">
//         <div className="flex justify-between ">
//             <div className=" flex text-gray-500 text-md items-center">
                
//                 <div className="text-gray-500 pr-2"><ShareIcon/></div>
//                 {title}
                
        
//             </div>

//             <div className="flex">
//                 <div className="pr-2 text-gray-500">
//                     <a href={link.replace("x.com" , "twitter.com" )} target = "_blank">
//                         <ShareIcon/>
//                         </a>

//                 </div>
//                 <div className="text-gray-500">
//                     <ShareIcon/>

//                 </div>
                
            
//             </div>
//         </div>
//         <div className="pt-6 ">
//             {
//                 type ==="youtube" && 
//                 <iframe className="w-full"  
//               src = {link.replace("watch" , "embed").replace("?v=" , "/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               referrerPolicy="strict-origin-when-cross-origin" 
//              allowFullScreen></iframe> 
//             }
//              {/* */}
//              {
//                 type === "twitter"  &&  <blockquote className="twitter-tweet">
//            <a href={link.replace("x.com" , "twitter.com")}></a>
//       </blockquote>
//               }

            

//         </div>
      
       
//     </div>
// }


import { useEffect, useRef } from "react";
import { ShareIcon } from "../icons/shareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "youtube" | "twitter";
}

export function Card({ title, link, type }: CardProps) {
  const tweetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (type === "twitter" && (window as any).twttr && tweetRef.current) {
      (window as any).twttr.widgets.load(tweetRef.current);
    }
  }, [link, type]);

  return (
    <div className="p-4 rounded-md min-w-48 w-72 min-h-32 border shadow-md border-gray-200 bg-white">
      <div className="flex justify-between">
        <div className="flex text-gray-500 text-md items-center">
          <div className="text-gray-500 pr-2">
            <ShareIcon />
          </div>
          {title}
        </div>
      </div>

      <div className="pt-6">

        {/* YOUTUBE */}
        {type === "youtube" && (
          <iframe
            className="w-full"
            src={link.replace("watch?v=", "embed/")}
            title="YouTube video player"
            allowFullScreen
          />
        )}

        {/* TWITTER */}
        {type === "twitter" && (
          <div ref={tweetRef}>
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          </div>
        )}

      </div>
    </div>
  );
}