import React from 'react'
import Sidebar from '../components/Sidebar'
import { useChatStore } from '../store/useChatStore';
import ChatContainer from '../components/ChatContainer';
import NoChatSelected from '../components/NoChatSelected';

const Home = () => {
  const {selectedUser} = useChatStore();

  return (
    <main>
      <section className='max-w-[1200px] mx-auto rounded-xl text-slate-200 flex'>
        <Sidebar/>
        {selectedUser?<ChatContainer/>:<NoChatSelected/>}
      </section>
    </main>
  )
}

export default Home