"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function VerifyEmailPage(){
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try{
            await axios.post("/api/users/verifyemail", {token});
            return setVerified(true);
        }catch(error:any){
            return setError(true);
            console.log(error.reponse.data)
        }
    }

     useEffect(() => {
        const urlToken = window.location.search.split("=") [1];
        setToken(urlToken);
    }, [])

    useEffect(()=>{
         if(token?.length > 0){
            verifyUserEmail();
        }
    },[token])

    useEffect(()=>{
        if(verified || error){
            setTimeout(() => {
                window.location.href = "/login"
            }, 5000)
        }    
    })

     return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center">
      
        <h1 className="text-4xl"> Verify Email</h1>
        <h2 className="p-2 bg-orange-600 text-black ">
            {token ? `${token}` : "no token"}
        </h2>

        {verified && (
            <div className="bg-green-500 text-white p-4 rounded-lg">
                Email verified, you can login now
                <Link href = "/login">Login</Link>
            </div>
        )}
        {error && (
            <div className="bg-red-500 text-white p-4 rounded-lg">
                Invalid or expired token
                <Link href = "/login">Login</Link>
            </div>
        )}
        {!verified && !error && (
            <div className="bg-blue-500 text-white p-4 rounded-lg mt-2.5">
                Verifying your email...
            </div>
        )}
       
      </div>
    </div>
  );
   
}