import { createContext,useState,useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {dummyChats, dummyUserData} from "../assets/assets.js";


const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const navigate=useNavigate();
    const [user,setUser]=useState(null);
    const [chats,setChats]=useState([]);
    const [selectedChat,setSelectedChat]=useState(null);
    const[theme,setTheme]=useState(localStorage.getItem('theme') || 'light');

    // ṇow we create a function which will fetch the use when the user logins in and set the user state
    const fetchUser=async()=>{
        setUser();
    }

   /* The `useEffect` hook in the provided code snippet is used to perform side effects in function
   components. In this case, the `useEffect` hook is calling the `fetchUser` function when the
   component mounts for the first time. */
    useEffect(()=>{
        fetchUser();
    },[])


    const fetchUserChats=async()=>{
        // we will fetch the user chats from the backend and set the chats state
        setChats(dummyChats);
        setSelectedChat(dummyChats[0]);
    }

    useEffect(()=>{
        if(theme==='dark'){
            document.documentElement.classList.add('dark');
        }else{
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme',theme);
    },[theme])

    useEffect(()=>{
        if(user){
            fetchUserChats();
        }else{
            setChats([]);
            setSelectedChat(null);
        }
        },[user])

 


    const value = {
        navigate,
        user,
        setUser,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        theme,
        setTheme,
        fetchUser,
    };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);