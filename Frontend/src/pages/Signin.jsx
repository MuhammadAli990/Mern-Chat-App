import { Bot } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function Signin() {
  const {isLoading,signin,user} = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(await signin(formData)){navigate('/')}
  };
  return (
    <div className="flex flex-col justify-center items-center mt-7 sm:p-12 p-6 ">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 border-r bdr-r-primary pr-6">
          <h2 className="text-primary font-bold sm:text-4xl text-3xl">
            Chatify
          </h2>
          <Bot className="text-primary sm:w-20 sm:h-20 h-12 w-12" />
        </div>
        <h2 className="text-slate-300 font-bold sm:text-4xl text-3xl">
          Sign-in
        </h2>
      </div>
      <p className="text-slate-300 font-semibold mt-2">
        Connect, Chat, Create Moments.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col mt-5">
        <label className="text-slate-300 mb-1 font-semibold">E-mail:</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e)=>setFormData({...formData,email:e.target.value})}
          className="bg-black border border-slate-500 rounded-md p-2 text-slate-300 font-semibold outline-none mb-2 md:w-[30rem] sm:w-[24rem] w-[18rem]"
          placeholder="example@gmail.com"
        />
        <label className="text-slate-300 mb-1 font-semibold">Password:</label>
        <input
          type="password"
          required
          value={formData.password}
          onChange={(e)=>setFormData({...formData,password:e.target.value})}
          className="bg-black border border-slate-500 rounded-md p-2 text-slate-300 font-semibold outline-none mb-2"
          placeholder="Enter your password"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary text-slate-300 py-2 rounded-lg font-semibold cursor-pointer hover:!bg-green-700 duration-200 mt-4 disabled:cursor-no-drop disabled:!bg-green-800"
        >
          {
            isLoading? "Signing-in....":"Sign-in"
          }
        </button>
      </form>
      <div className="text-sm mt-1">
        <span className="text-slate-500">Don't have an account?</span>{" "}
        <Link to="/signup" className="text-primary underline">
          Sign-up
        </Link>
      </div>
    </div>
  );
}

export default Signin;
