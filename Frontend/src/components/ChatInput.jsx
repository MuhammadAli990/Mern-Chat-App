import { CircleX, Images, Send } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore.js';

function ChatInput() {
    const [text,setText] = useState("");
    const [image,setImage]=useState(null);
    const {sendMessage} = useChatStore();
    const imgRef = useRef(null);

    const handleSendMessage = ()=>{
      if(!text.trim() && !image) return;
      try{
        sendMessage({text:text.trim(),image});
        setImage(null);
        setText("");
        if(imgRef.current) imgRef.current.value="";
      }catch(e){

      }
    }
    
    const handleImageChange = (e)=>{
      const imageFile = e.target.files[0];
      console.log("hi")
      if(!imageFile) return;
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = async()=>{
        const base64img = reader.result;
        setImage(base64img);
      }
    }
    const handleImgClose = ()=>{
      setImage(null);
      if(imgRef.current) imgRef.current.value='';
    }
  return (
    <section className='flex items-center gap-3 px-4 py-3 relative'>
        {image && <div className='w-40 h-40 bg-black rounded-xl absolute bottom-20 overflow-hidden flex justify-center items-center'>
          <img src={image} className='w-full h-full object-cover'/>
          <CircleX className='hover:scale-95 hover:rotate-180 hover:bg-red-700 duration-200 absolute bg-black rounded-full p-1 h-8 w-8 top-1 right-1 cursor-pointer' onClick={()=>handleImgClose()} />
        </div>}
        <input placeholder='Send a message' type="text" className="flex-grow bg-black border bdr-primary rounded-md p-2 text-slate-300 font-semibold outline-none mb-2" value={text} onChange={(e)=>setText(e.target.value)}/>
        <label htmlFor='image'>
          <Images className='w-7 h-7 mb-2 cursor-pointer hover:scale-105 duration-200' />
          <input type="file" className='hidden' id='image' onChange={(e)=>handleImageChange(e)} ref={imgRef}/>
        </label>
        <Send className='w-7 h-7 mb-2 text-primary cursor-pointer hover:scale-105 duration-200' onClick={()=>handleSendMessage()}/>
    </section>
  )
}

export default ChatInput
