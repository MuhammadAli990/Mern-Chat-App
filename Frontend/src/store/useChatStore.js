import { create } from "zustand";
import { axiosInstance } from "../lib/Axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set,get)=>({
    messages:[],
    contacts:[],
    isLoading:false,
    selectedUser:null,


    getContacts:async()=>{
        set({isLoading:true});
        try{
            const res = await axiosInstance.get('/message/users');
            if(res.status==200){
                set({contacts:res.data.contacts});
            }
        }
        catch(e){
            toast.error(e?.response?.data?.message || "Unexpected error occured.");
        }
        finally{
            set({isLoading:false});
        }
    },
    getMessages:async(id)=>{
        set({isLoading:true});
        try{
            const res = await axiosInstance.get(`/message/${id}`);
            if(res.status==200){
                set({messages:res.data.messages});
            }
        }
        catch(e){
            toast.error(e?.response?.data?.message || "Unexpected error occured.");
        }
        finally{
            set({isLoading:false});
        }
    },
    setSelectedUser:(id)=>{
        set({selectedUser:id});
    },
    sendMessage:async({text,image})=>{
        set({isLoading:true});
        const {selectedUser,messages} = get();
        try{
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`,{text,image});
            if(res.status==201){
                toast.success("Message sent");
                set({ messages: [...messages, res.data.newMessage] });
            }
        }
        catch(e){
            console.log(e.message)
            toast.error(e?.response?.data?.message || "Unexpected error occured.");
        }
        finally{
            set({isLoading:false})
        }
    },
    subscribeToMessages:async()=>{
        const {selectedUser} = get();
        if(!selectedUser) return;
        const socket=useAuthStore.getState().socket;
        socket.on("newMessage",(newMessage)=>{
            if(selectedUser?._id!==newMessage.senderId) return; //if new message received is not from the selectedUser then it should not update the current messages array
            set({messages: [...get().messages, newMessage]});
        })
    },
    unsubscribeFromMessages:()=>{
        const socket=useAuthStore.getState().socket;
        socket.off("newMessage");
    }
}))