

export function SidebarItem({text, icon , onClick} : {text: string , icon: React.ReactElement , onClick?: () => void}) {
    return <div  onClick={onClick} className="flex text-gray-700 hover:bg-gray-200 cursor-pointer items-center py-2 pl-4 rounded-md ">
        <div className="pr-2 text-gray-700 ">
            {icon}

        </div>
        <div className="text-gray-700">  {text}

        </div>
       
    </div>

}