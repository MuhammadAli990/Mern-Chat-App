import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Bot } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const { signUp, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const validateForm = ()=>{
    if(formData.fullname.trim() && formData.email.trim() && formData.password.trim() && formData.password.length>=8) return true;
    return false;
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!validateForm()){
      toast.error("Invalid input.");
    }
    else{
      await signUp(formData)?navigate('/'):null;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center sm:p-12 p-6 ">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 border-r bdr-r-primary pr-6">
          <h2 className="text-primary font-bold sm:text-4xl text-3xl">
            Chatify
          </h2>
          <Bot className="text-primary sm:w-20 sm:h-20 h-12 w-12" />
        </div>
        <h2 className="text-slate-300 font-bold sm:text-4xl text-3xl">
          Sign-up
        </h2>
      </div>
      <p className="text-slate-300 font-semibold mt-2">
        Connect, Chat, Create Moments.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col mt-5">
        <label className="text-slate-300 mb-1 font-semibold">Fullname:</label>
        <input
          type="text"
          required
          value={formData.fullname}
          onChange={(e)=>setFormData({...formData,fullname:e.target.value})}
          className="bg-black border border-slate-500 rounded-md p-2 text-slate-300 font-semibold outline-none md:w-[30rem] sm:w-[24rem] w-[18rem] mb-2"
          placeholder="Enter your full name"
        />
        <label className="text-slate-300 mb-1 font-semibold">E-mail:</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e)=>setFormData({...formData,email:e.target.value})}
          className="bg-black border border-slate-500 rounded-md p-2 text-slate-300 font-semibold outline-none mb-2"
          placeholder="example@gmail.com"
        />
        <label className="text-slate-300 mb-1 font-semibold">Password:</label>
        <input
          type="password"
          required
          minLength={8}
          value={formData.password}
          onChange={(e)=>setFormData({...formData,password:e.target.value})}
          className="bg-black border border-slate-500 rounded-md p-2 text-slate-300 font-semibold outline-none mb-2"
          placeholder="Choose a secure password"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary text-slate-300 py-2 rounded-lg font-semibold cursor-pointer hover:!bg-green-700 duration-200 mt-4 disabled:cursor-no-drop disabled:!bg-green-800"
        >
          {
            isLoading? "Signing-up....":"Sign-up"
          }
        </button>
      </form>
      <div className="text-sm mt-1">
        <span className="text-slate-500">Already have an account?</span>{" "}
        <Link to="/signin" className="text-primary underline">
          Sign-in
        </Link>
      </div>
    </div>
  );
}

export default Signup;
