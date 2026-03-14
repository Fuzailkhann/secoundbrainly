



import { useNavigate } from "react-router";
import { BrainIcon } from "../../icons/BrainIcon";
import { TwitterIcon } from "../../icons/twitterIcon";
import { YouTubeIcon } from "../../icons/youtubeIcon";
import type { ContentType } from "../../pages/dashboar";
import { SidebarItem } from "./SidebarItem";




interface SidebarProps {
  setSelectedType: React.Dispatch<React.SetStateAction<ContentType>>;
  onClick : () => void;
}

export function Sidebar({ setSelectedType }: SidebarProps) {
    // const navigate = useNavigate();
  const username = localStorage.getItem("username");
 const navigate = useNavigate();
  function handleLogout(){
    localStorage.removeItem("token");
    localStorage.removeItem("username")
    navigate("/")

  }

  return (
    <div className="fixed left-0 top-0 w-72 h-screen bg-white text-black border-r pl-6">

      {/* Logo */}
     

      
      <div
  onClick={() => setSelectedType("all")}
  className="flex text-2xl pt-8 font-bold text-gray-800 items-center gap-2 cursor-pointer"
>
  <BrainIcon className="w-8 h-8 text-purple-600" />
  Brainly
</div>

      {/* Username */}
      <div className="font-semibold text-gray-700 mt-6">
        👋 Hello {username}
      </div>

      {/* Sidebar Items */}
      <div className="pt-6">
        <SidebarItem
          onClick={() => setSelectedType("twitter")}
          text="Twitter"
          icon={<TwitterIcon />}
        />

        <SidebarItem
          onClick={() => setSelectedType("youtube")}
          text="Youtube"
          icon={<YouTubeIcon />}
        />
      </div>

      <div  className="absolute bottom-8">
        {localStorage.getItem("token") && (
          <button onClick={handleLogout} className="bg-red-500  text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
        )}
      </div>
    </div>
  );
}