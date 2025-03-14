import { Loader2 } from 'lucide-react'
import React from 'react'

function Loader() {
  return (
    <div className='h-screen flex justify-center items-center'>
      <Loader2 className='animate-spin w-14 h-14 text-slate-300'/>
    </div>
  )
}

export default Loader
