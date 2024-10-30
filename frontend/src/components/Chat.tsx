import { useAuth } from "@/context/AuthContext"
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import { RiRobot3Fill } from "react-icons/ri";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import toast from "react-hot-toast";


const Chat = () => {

 
 

  interface Chat {
    id: string;
    role: string;
    content: string;
    _id: { $oid: string };
  }
  
  const [chats, setChats] = useState<Chat[]>([]);
  const [prompt, setPrompt] = useState("");

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
 
  useEffect(() => {
    const chathistory = async() => {
      const userdata = await axios.get('/chat/all', {
        withCredentials: true
      });
      // console.log(userdata);
      setChats(userdata.data.chats)
    }
    chathistory();    
  }, [])


  // useEffect(() => {
  //   if(textAreaRef.current){
  //     const textarea = textAreaRef.current;
  //     textarea.style.height = 'auto'; // Reset the height
  //     if (textarea.scrollHeight <= maxHeight) {
  //       textarea.style.height = `${textarea.scrollHeight}px`; // Adjust based on scrollHeight if within the max height
  //     } else {
  //       textarea.style.height = `${maxHeight}px`; // Set to maxHeight if scrollHeight exceeds maxHeight
  //       textarea.style.overflowY = 'auto'; // Enable vertical scrolling when maxHeight is reached
  //     }
  //   }
  // }, [prompt]);
 
  useEffect(() => {
    if(chatContainerRef.current){
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const user = useAuth();

  const handlePrompt = async() => {
    if(prompt.length !== 0){
      const localchat = {
        id: crypto.randomUUID(),
        role: "user",
        content: prompt,
        _id: { $oid: crypto.randomUUID() }
      }
      setPrompt("");
      setChats(prevChats => [...prevChats, localchat]);
      try{
        const res = await axios.post('/chat/new', {message: localchat.content}, {
          withCredentials: true
        });
        
        if(res.status === 200){
          const localaichat = {
            id: crypto.randomUUID(),
            role: res.data.role,
            content: res.data.response,
            _id: { $oid: crypto.randomUUID() }
          }
          setChats(prevChats => [...prevChats, localaichat]);
        }
      }catch(err){
        console.log(err);
      }
    }
  }

  const handleDelete = async() => {
    try{
      toast.loading("deleting Chat");
      const res = await axios.delete('/chat/delete', {
        withCredentials: true
      });
      // console.log(res);
      if(res.status === 200){
        setChats([]);
      }
      toast.dismiss();
      toast.success("deleted successfully");
    }catch(err){
      toast.dismiss();
      console.log(err);
      toast.error("failed to delete");
    }
  }


  // if(user?.loading) return <h1>loading....</h1>
  return (
    user?.isLoggedIn ? (
      <div className="flex mx-4 mb-4  flex-1">
        <div className="w-1/5 flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center pb-20">
            <p className="text-2xl font-bold">Hello, {user.user?.name}</p>
            <p className="text-sm text-center">Hope u r having a great day!!!</p>
          </div>
          {/* <button className="flex items-center hover:cursor-pointer"
                  onClick={handleDelete}>
            <MdOutlineDelete className="text-red-500 m-2"/>
            <p className="text-sm text-red-500">Delete Conversation</p>
          </button> */}
          <AlertDialog>
            <AlertDialogTrigger className="flex items-center hover:cursor-pointer">
              <MdOutlineDelete className="text-red-500 m-2"/>
              <p className="text-sm text-red-500">Delete Conversation</p>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-black">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will delete the chat history.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-gray-300 text-black">Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-black border border-red-600 text-red-500" onClick={handleDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex-1 w-full flex flex-col items-center py-6 gap-3 max-h-[80vh] overflow-auto scrollbar scrollbar-track-black scrollbar-thumb-zinc-700"
               ref={chatContainerRef}>
            {chats.length ? 
            chats.map((chat, index) => (
                <div key={index} className={`flex w-[80%] ${chat.role === 'model' ? 'justify-start' : 'justify-end'}`}>
                  {chat.role === 'model' && <RiRobot3Fill className="text-2xl m-1" />}
                  <p key={index} className='max-w-[80%] bg-white bg-opacity-10 p-3 rounded-xl'>{chat.content}</p>
                  {chat.role === 'user' && <FaPerson className="text-2xl m-1" />}
                </div>
            ))
            : <p className=" text-4xl text-white text-center font-bold">Start your <br></br> conversation</p>
            }
          </div>
          <div className="flex w-full justify-center items-center gap-3">
            <textarea 
              placeholder="ask your question"
              ref={textAreaRef}
              value={prompt}
              className="w-[80%] h-12 resize-none rounded-3xl border border-gray-300 bg-black text-gray-100 px-4 py-3 overflow-hidden focus:border focus:border-white focus:border-3"
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button onClick={handlePrompt}><FaRegPaperPlane className={`text-2xl ${prompt.length !== 0 ? 'text-white' : 'text-gray-400'}`}/></button>
          </div>
        </div>
      </div>
    ):
    <div className="flex-1 flex flex-col justify-center items-center">
      <div>
        <p className="text-xl">You must login to continue.<br></br>Or <br></br>Take me to</p>
        <Link to='/'><Button className="my-3">Home</Button></Link>
      </div>
    </div>
  )
}

export default Chat