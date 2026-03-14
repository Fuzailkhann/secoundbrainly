import { useRef } from "react";
import { Input } from "../components/input";
import { Button } from "../components/ui/Button";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export function Signup() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function handleSignup(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post(BACKEND_URL + "/api/v1/signup" , {
            username,
            password
        })
      
        navigate("/signin")

    }

    return <div className="h-screen w-screen  bg-gray-200 flex justify-center items-center">
        <div className="bg-white min-w-48 border rounded-xl p-8 gap-4 border-white">
            <div className="mb-2" >
            <Input userrefrence = {usernameRef} placeholder="Username"/>
            </div>
            <Input userrefrence = {passwordRef} placeholder="Password"/>
            <div className="flex justify-center mt-4">
                  <Button onClick={handleSignup} loading = {false} variant="primary" text="Signup" size="sm" fullWidth = {true} />

            </div>
             <div className="text-center mt-4 text-sm">
                    Already have an account? {" "}
                    <span 
                        className="text-blue-600 cursor-pointer"
                        onClick={() => navigate("/signin")}
                    >
                        Sign in
                    </span>
                </div>
          
        </div>
         

    </div>
}