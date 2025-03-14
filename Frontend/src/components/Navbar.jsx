import { LogOut, MailWarning, Settings, UserRound } from 'lucide-react'
import React from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';

function Navbar() {
  const {user,logout} = useAuthStore();

  return (
    <nav className='text-slate-200 flex justify-between px-6 sm:px-8 py-4 border-b border-b-green-900 items-center'>
      <Link to={'/'} className='flex items-center gap-2'>
        <MailWarning className='w-8 h-8 text-primary' />
        <span className='font-bold text-xl'>Chatify</span>
      </Link>

      <div className='flex items-center gap-6'>
        <Link to={'/settings'} className='flex items-center gap-1'>
          <Settings className='w-5 h-5 '/>
          <p className='font-semibold sm:inline hidden'>Settings</p>
        </Link>
        {user?
          <>
            <Link to={'/profile'} className='flex items-center gap-1'>
              <UserRound className="w-5 h-5"/>
              <p className='font-semibold sm:inline hidden'>Profile</p>
            </Link>
            <button onClick={()=>logout()} className='flex items-center gap-1 cursor-pointer'>
              <LogOut className='h-5 w-5' />
              <p className='font-semibold sm:inline hidden'>Logout</p>
            </button>
          </>:null
        }
      </div>
    </nav>
  )
}

export default Navbar
