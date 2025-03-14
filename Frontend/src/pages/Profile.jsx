import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera } from 'lucide-react';
import { formatDate } from '../lib/Utils';

function Profile() {
  const {user,isLoading,updateProfile} = useAuthStore();

  const [profileImg,setProfileImg] = useState(null);
  const handleImageUpload = (e)=>{
    const image = e.target.files[0];
    if(!image) return;
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = async()=>{
      const base64img = reader.result;
      setProfileImg(base64img);
      updateProfile({profilePic:base64img});
    }

  }
  return (
    <section className='w-full py-6 '>
      <section className='max-w-[700px] mx-auto bg-secondary text-slate-300 flex flex-col justify-center items-center gap-4 py-6 rounded-xl'>

        <h1 className='font-extrabold text-4xl'>Your Profile</h1>

        <div className='flex justify-center relative w-fit'>
          <div className='w-32 h-32 rounded-full border-4 border-green-700 overflow-hidden flex justify-center items-center'>
            <img className='h-full w-full object-cover' src={profileImg || user?.profilePic}/>
          </div>
          <label htmlFor='image'>
            <Camera className='h-10 w-10 bg-green-700 p-1.5 rounded-full absolute bottom-0 right-0 bg-base-content cursor-pointer hover:scale-105 duration-200' />
            <input type="file" className='hidden' id='image' accept="image/*" onChange={handleImageUpload} disabled={isLoading}/>
          </label>
        </div>

        <p className='text-sm text-slate-500'>
          {!isLoading?"Click on Camera icon to change profile image":"Uploading profile image...."}
        </p>

        <div className='flex flex-col mt-5 gap-1'>
          <div className='flex flex-col'>
            <label className="text-slate-300 mb-1 font-semibold" htmlFor="">Full Name</label>
            <input className="bg-black border border-green-700 rounded-md p-2 text-slate-300 font-semibold outline-none mb-2 md:w-[30rem] sm:w-[24rem] w-[18rem]" type="text" disabled value={user?.fullname}/>
          </div>
          <div className='flex flex-col'>
            <label className="text-slate-300 mb-1 font-semibold" htmlFor="">Email Address</label>
            <input className="bg-black border border-green-700 rounded-md p-2 text-slate-300 font-semibold outline-none mb-2 md:w-[30rem] sm:w-[24rem] w-[18rem]" type="email" disabled value={user?.email} />
          </div>
        </div>

      </section>

      <section className='max-w-[700px] mx-auto bg-secondary text-slate-300 flex flex-col justify-center gap-4 py-6 px-8 mrounded-xl mt-4 rounded-xl'>
        <h2 className='font-bold text-2xl text-left mb-2'>Account information:</h2>

        <div className='flex justify-between'>
          <p>Member since:</p>
          <p>{formatDate(user?.createdAt)}</p>
        </div>
        <hr className='text-green-700'/>
        <div className='flex justify-between'>
          <p>Account Status:</p>
          <p className='underline font-semibold text-green-500'>Active</p>
        </div>
      </section>

    </section>
  )
}

export default Profile