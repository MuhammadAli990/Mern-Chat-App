import React, { useEffect, useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatInput from './ChatInput';
import MessageSentCard from './MessageSentCard';
import { useAuthStore } from '../store/useAuthStore';
import MessageReceiveCard from './MessageReceiveCard';

function ChatContainer() {
  const {user} = useAuthStore();
  const {selectedUser,messages,getMessages,subscribeToMessages,unsubscribeFromMessages} = useChatStore();
  const lastMessageRef = useRef();
  useEffect(()=>{
    getMessages(selectedUser._id);
    subscribeToMessages();

    return()=>{
      unsubscribeFromMessages();
    }
  },[])
  useEffect(()=>{
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])


  return (
    <div className='w-full h-screen flex flex-col'>
      <header className='flex items-center px-4 gap-2 py-3 border-b bdr-b-primary'>
        <div className='w-12 h-12 overflow-hidden rounded-full flex justify-center items-center'>
          <img src={selectedUser?.profilePic} className='w-full h-full object-cover'/>
        </div>
        <h3 className='font-semibold text-xl'>{selectedUser?.fullname}</h3>
      </header>
      
      <section className='flex-grow px-2 py-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 flex flex-col gap-2 thin-scrollbar'>
        {messages.map((ele,ind)=>{
          return(ele?.senderId==user._id?<MessageSentCard data={ele} key={ind}  ref={ind==messages.length-1? lastMessageRef:null}/>:<MessageReceiveCard data={ele} key={ind} ref={ind==messages.length-1? lastMessageRef:null}/>)
        })}
      </section>

      <ChatInput/>
      
    </div>
  )
}

export default ChatContainer
