

import { useRef } from "react";
import { Input } from "../components/input";
import { Button } from "../components/ui/Button";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function handleSignin(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
         const response = await axios.post(BACKEND_URL + "/api/v1/signin" , {
            username,
            password
        })
        console.log(response.data.token)
        const jwt = response.data.token;
        localStorage.setItem("token" , jwt);
        localStorage.setItem("username" , response.data.username);
        alert("user signin successfully")
        navigate("/dashboard")

    }

    return <div className="h-screen w-screen  bg-gray-200 flex justify-center items-center">
        <div className="bg-white min-w-48 border rounded-xl p-4 gap-4 border-white">
            <div className ="mb-2" >
            <Input   userrefrence = {usernameRef} placeholder="Username"/>
            </div>
            <Input userrefrence = {passwordRef} placeholder="Password"/>
            <div className="flex justify-center mt-4">
                  <Button onClick={handleSignin} loading = {false} variant="primary" text="Sign in" size="sm" fullWidth = {true} />

            </div>
             <div className="text-center mt-4 text-sm">
                    Don't have an account?{" "}
                    <span 
                        className="text-blue-600 cursor-pointer"
                        onClick={() => navigate("/signup")}
                    >
                        Sign Up
                    </span>
                </div>

          
        </div>

    </div>
}