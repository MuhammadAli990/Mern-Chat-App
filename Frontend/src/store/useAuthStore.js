import { create } from "zustand";
import { axiosInstance } from "../lib/Axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";


export const useAuthStore = create((set,get)=>({
    user:null,
    isCheckingAuth:true,
    isLoading:false,
    socket:null,
    onlineUsers:[],

    checkAuth:async()=>{
        try{
            const res = await axiosInstance.get('/auth/check');
            if(res.status==200){
                set({user:res.data.user});
                get().connectSocket();
            }
        }
        catch(e){
            console.log(e)
            set({user:null});
        }
        finally{
            set({isCheckingAuth:false})
        }
    },
    signUp:async(data)=>{
        set({isLoading:true});
        try{
            const res = await axiosInstance.post('/auth/signup',data);
            if(res.status==201){
                set({user:res.data.user});
                toast.success("Account created successfully.");
                get().connectSocket();
                return true;
            }
        }
        catch(e){
            toast.error(e?.response?.data?.message || "Unexpected error occured.");;
            set({user:null});
            return false;
        }
        finally{
            set({isLoading:false});
        }
    },
    logout:async()=>{
        try{
            const res = await axiosInstance.post('/auth/signout');
            if(res.status==200){
                set({user:null});
                get().disconnectSocket();
                toast.success("Logged out successfully.");
            }
        }
        catch(e){
            toast.error(e?.response?.data?.message || "Unexpected error occured.");;
        }
    },
    signin:async(data)=>{
        set({isLoading:true});
        try{
            const res = await axiosInstance.post('auth/signin',data);
            if(res.status==200){
                set({user:res.data.user});
                toast.success("Logged-in successfully.");
                get().connectSocket();
                return true;
            }
        }
        catch(e){
            toast.error(e?.response?.data?.message || e.message);;
            set({user:null});
            return false;
        }
        finally{
            set({isLoading:false});
        }
    },
    updateProfile:async(data)=>{
        set({isLoading:true});
        try{
            const res = await axiosInstance.put('auth/update-profile-pic',data);
            if(res.status==200){
                set({user:res.data.user});
                toast.success("Profile image updated successfully.");
            }
        }
        catch(e){
            toast.error(e?.response?.data?.message || "Unexpected error occured.");;
        }
        finally{
            set({isLoading:false});
        }
    },
    connectSocket:()=>{
        const {user,socket} = get();
        if(!user || socket?.connected) return;
        const socketIo = io(import.meta.env.VITE_SERVER_URL,{
            query:{
                userId:user._id
            }
        });
        socketIo.connect();
        set({socket:socketIo});
        socketIo.on("getOnlineUsers",(onlineUserIds)=>{
            set({onlineUsers:onlineUserIds})
        })
    },
    disconnectSocket:()=>{
        const {socket} = get();
        if(!socket?.connected) return;
        socket.disconnect();
    }
}))