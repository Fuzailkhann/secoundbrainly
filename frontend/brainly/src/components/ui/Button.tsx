import type { ReactElement } from "react";


type Variants =  "primary" | "secondary"

interface ButtonProps {
    variant: Variants;
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading? : boolean;
    className? : string;
}

const variantStyles ={
    "primary" : "bg-purple-600 text-white" ,
    "secondary" : "bg-purple-300 text-purple-600"

}

const sizeStyles ={
    "sm" : "py-1 px-2" ,
    "md" : "py-2 px-4" ,
    "lg" :" py-4 px-6"
}

const defaultStyles = "rounded-md flex"

export const Button = (props: ButtonProps) =>{
    return <button className={`${defaultStyles} ${variantStyles[props.variant]}
     ${sizeStyles[props.size]} ${props.fullWidth ? 'w-full flex justify-center items-center' : ''}
       ${props.loading ? "opacity-45": ""}
       ${props.className || ''}`} 
       onClick={props.onClick} disabled={props.loading}> 
    {props.startIcon}{props.text}</button>

}