"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";



export default function ProfilePage() {
   const [data, setData] = useState("nothing")
  const router = useRouter();

  // Example user data (replace with real user or API data if needed)
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Full Stack Developer | React & Node.js | Passionate about clean code",
    avatar:
      "https://ui-avatars.com/api/?name=John+Doe&background=4F46E5&color=fff&size=128",
  };

  const handleLogout = async () => {

      try{
    //     // Clear cookie (optional: use cookie library if HttpOnly not set)
    // document.cookie =
    //   "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // document.cookie =
    //   "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    await axios.get('/api/users/logout')
    toast.success("Logout SuccessFul")
      router.push("/login");
      }catch (error:any){
        console.log(error.message);
        toast.error(error.message)
      }
    // Redirect to logi
  };

 

  const getUserDetails = async () =>{
    const res = await axios.get("/api/users/me")
    console.log(res.data)
    setData(res.data.data._id)
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center px-4 py-10">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Profile Avatar */}
        <motion.img
          src={user.avatar}
          alt={user.name}
          className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />

        {/* Profile Info */}
        <h1 className="text-2xl font-bold text-indigo-700">{user.name}</h1>
        <h2 className="text-2xl font-bold text-indigo-700">{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <p className="text-sm text-gray-500">{user.email}</p>
        <p className="mt-4 text-gray-700">{user.bio}</p>

        {/* Edit Profile Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all"
        >
          Edit Profile
        </motion.button>

        {/* Logout Button */}
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-3 px-6 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-all"
        >
          Logout
        </motion.button>
         {/* Logout Button */}
        <motion.button
          onClick={getUserDetails}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-3 px-6 py-2 bg-orange-700 text-white font-medium rounded-lg hover:bg-red-600 transition-all"
        >
          Get User Details
        </motion.button>
      </motion.div>
    </div>
  );
}
