import React, { forwardRef } from 'react'
import { formatTime } from '../lib/Utils'
import { useAuthStore } from '../store/useAuthStore'

const MessageSentCard = forwardRef((props,ref) => {
    const {data} = props;
    const {user} = useAuthStore();
  return (
    <div ref={ref} className='flex justify-end items-center gap-2'>
      <div className='space-y-1'>
        <p className='text-xs text-right'>{formatTime(data?.createdAt)}</p>

        <div className='bg-green-900 px-3 py-3 rounded-xl w-fit ml-auto'>
          {data?.image && <div className='w-full h-30 bg-black rounded-xl overflow-hidden flex justify-center items-center'>
            <img src={data?.image} className='w-full h-full object-cover mb-2'/>
          </div>}
          <p className='text-right'>{data?.text}</p>
        </div>

      </div>
      <div className='w-12 h-12 overflow-hidden rounded-full flex justify-center items-center'>
        <img src={user?.profilePic} className='w-full h-full object-cover'/>
      </div>
    </div>
  )
})

export default MessageSentCard