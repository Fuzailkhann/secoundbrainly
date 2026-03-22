

interface InputInterfaces {
    placeholder : string;
    userrefrence? : React.RefObject<HTMLInputElement | null>; 
  
}

export function Input({placeholder ,userrefrence}: InputInterfaces){
    return <div>
        <input className=" border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" 
        type="text" ref={userrefrence} placeholder={placeholder} />
    </div>
}
