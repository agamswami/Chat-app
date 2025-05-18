'use client'            /**In Next.js app directory, files are Server Components by default. You have to explicitly opt in to client-side behavior by using "use client".

You're using:

useState, useEffect — client-only

socket.io-client — runs in the browser, so also client-only

So you absolutely need to make chat.jsx a client component. */

import React, { useEffect, useState ,useRef} from 'react'

import io from "socket.io-client"
import ChatMessage from './ChatMessage'
import useAuthStore from "../../store/useAuthStore.js"
import useUsersStore from "../../store/useUsersStore.js"
import useChatReceiverStore from "../../store/useChatReceiverStore.js"
import axios from 'axios'
import ChatUsers from '../_components/ChatUsers.jsx'
import useChatMsgsStore from '@/store/useChatMsgStore'
import JWTLogin from '../../../utils/loginJWTFunc'
import { useRouter } from 'next/navigation';
import Navbar from '../_components/Navbar'






// import dotenv from "dotenv"

// dotenv.config();



const Chat = () => {
    const [socket, setSocket] = useState(null);
    const [msg, setMsg] = useState('');
    const [msgs, setMsgs] = useState([]);
    const { authName , updateAuthName} = useAuthStore();
    const {updateUsersName} = useUsersStore();
    
    const {chatMsgs , updateChatMsgs} = useChatMsgsStore();
    const chatReceiver = useChatReceiverStore((state) => (state.chatReceiver));
    const router = useRouter();

    // console.log(authName);

    const getUserData = async () =>{
        console.log("port" , process.env.NEXT_PUBLIC_AUTH_PORT)
        const res = await axios.get(`http://localhost:8080/users`, 
        {
            withCredentials: true
        })

        updateUsersName(res.data)
        console.log(res.data);
    }

    


    const sendMsg = (e) => {
        console.log("button is pressed")
        e.preventDefault();
        
        const currtime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');

            const time24 = `${hours}:${minutes}`;
            return time24
        }

        const sentTime = currtime()

        const msgToBeSent = {
            text: msg,
            sender: authName,
            receiver: chatReceiver,
            sentTime: sentTime
        };
        if (socket) {
            console.log("socket connected")
            socket.emit('chat msg', msgToBeSent);
            const newMsg = {text : msg , sender: authName , sentTime : sentTime};
            updateChatMsgs([...chatMsgs , newMsg])
            // setMsgs(prevMsgs => [...prevMsgs, {text : msg , sentByCurrUser: true , sender: authName , sentTime : sentTime}]);
            setMsg('');
        }
    }

    const chatReceiverRef = useRef(chatReceiver);
    const chatMsgsRef = useRef(chatMsgs);
    useEffect(() => {
        chatReceiverRef.current = chatReceiver;
        chatMsgsRef.current = chatMsgs;
    }, [chatReceiver , chatMsgs]);


    useEffect(() => {           // making websoket connection on first load only
        JWTLogin(updateAuthName, router);

        console.log('authname' , authName);
        const newSocket = io('http://localhost:5000',{
            query:{
                username: authName
            }
        });
        // console.log(authName);
        setSocket(newSocket);

        console.log(chatReceiver , "first");
        // listen for incoming msgs
        newSocket.on('chat msg' , (msg) => {
            console.log('received msg on client ' + msg.text);
            const newMsg = {text : msg.text , sender: msg.sender , sentTime : msg.sentTime};
            console.log(JSON.stringify(newMsg));
            const currentReceiver = chatReceiverRef.current;

            console.log(currentReceiver);

            if(currentReceiver == msg.sender){
                
                updateChatMsgs([...chatMsgsRef.current , newMsg])
            }
            // setMsgs(prevMsgs => [...prevMsgs , {text : msg.text , sentByCurrUser: false , sender: msg.sender , sentTime : msg.sentTime}]);
        });
        
        getUserData();
        return () => newSocket.close();      // cleanup function
    }, []);



    return (
        <div className='h-screen'>
            <Navbar></Navbar>
            <div className='flex h-[calc(100vh-4rem)]'>
                <div className='w-1/5'>
                    <ChatUsers/>
                </div>
                <div className='w-4/5  flex flex-col'>
                    <div className='h-16'>
                        <h1>
                            {authName} is chatting with {chatReceiver}
                            {/* atul is chatting with agam */}
                        </h1>
                    </div>
                    <div className='flex-1 msgs-container overflow-y-auto overflow-x-hidden'>
                        {chatMsgs?.map((msg, index) => (
                            <div key={index} className={`msg flex m-3 ${msg.sender == authName ? 'justify-end' : 'justify-start'}`}>
                                {/* {msg.text} */}
                                <ChatMessage
                                    name={msg.sender}
                                    time={msg.sentTime}
                                    message={msg.text}
                                    status="Seen"
                                    avatar="https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png"
                                />
                            </div>
                        ))}
                    </div>
                    <div className='h-20 flex items-center justify-center'>
                        <form onSubmit={sendMsg} className="w-1/2">
                            <div className="relative">
                                <input type="text"
                                    value={msg}
                                    onChange={(e) => setMsg(e.target.value)}
                                    placeholder="Type your text here"
                                    required
                                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                <button type="submit"
                                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default Chat



//     return (
//         <div className='h-screen flex'>
//             <div className='w-1/5 '>
//                 <ChatUsers/>
//             </div>
//             <div className='msgs-container h-3/5 overflow-scroll'>
//                 <div className='msgs-container'>
//                     {msgs.map((msg, index) => (
//                         <div key={index} className={`msg flex m-3 ${msg.sentByCurrUser ? 'justify-end' : 'justify-start'}`}>
//                             {/* {msg.text} */}
//                             <ChatMessage 
//                                 name="Jese Leos"
//                                 time="12:01"
//                                 message= {msg.text}
//                                 status="Seen"
//                                 avatar="https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png"
//                             />
//                         </div>
//                     ))}
//                 </div>
//                 <form onSubmit={sendMsg} className="max-w-md mx-auto my-10">
//                     <div className="relative">
//                         <input type="text"
//                             value={msg}
//                             onChange={(e) => setMsg(e.target.value)}
//                             placeholder="Type your text here"
//                             required
//                             className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
//                         <button type="submit"
//                             className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                             Send
//                         </button>
//                     </div>
//                 </form>
//           </div>
//         </div>

//     )
// }

// export default Chat
