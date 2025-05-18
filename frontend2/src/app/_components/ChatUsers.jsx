import React , {useEffect}from 'react';
import { CheckCheck, Check } from "lucide-react";

import useUsersStore from "../../store/useUsersStore.js"
import useChatReceiverStore from "../../store/useChatReceiverStore.js"
import useChatMsgsStore from '@/store/useChatMsgStore.js';
import axios from 'axios'
import useAuthStore from '@/store/useAuthStore.js';

// const contacts = [
//   {
//     name: "Miku Jio",
//     time: "00:54",
//   },
//   {
//     name: "Darpan Khatri",
//     time: "00:49",
//   },
//   {
//     name: "à K Jos (You)",
//     time: "08-04-2025",
//   },

//   // You can duplicate entries for scroll testing
// ];

const ChatUsers = () => {



  const {users} = useUsersStore();
  const contacts = users;
  

  const { chatReceiver ,updateChatReceiver } = useChatReceiverStore();

  const { updateChatMsgs} = useChatMsgsStore();

  const {authName} = useAuthStore();


  const setChatReceiver = (user) => {
    console.log("updated chatReciever to ", user.username);
    updateChatReceiver(user.username);
  }

  useEffect(() => {
    const getMsgs = async () => {
        const res = await axios.get('http://localhost:5001/msgs',
            {
                params: {
                    'sender': authName,
                    'receiver': chatReceiver
                }
            },
            {
                withCredentials: true
            });
        if (res.data.length !== 0) {
            updateChatMsgs(res.data);
        } else {
            updateChatMsgs([]);
        }
    }
    if(chatReceiver) {
        getMsgs();
    }
}, [chatReceiver])
 
  return (
    <div className="w-full max-w-xs bg-gray-900 text-white h-screen">
      <div className="p-2 text-lg font-bold border-b border-gray-700">Chats</div>
      <div className="group h-[calc(100vh-48px)] overflow-y-auto
  scrollbar-thin
  [&::-webkit-scrollbar]:w-0
  group-hover:[&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
  space-y-1">
        {contacts.map((contact, index) => (
          <div
            onClick={() => {setChatReceiver(contact)}}
            key={index}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-xl">
                {contact.username[0]}
              </div>
              <div>
                <p className="font-semibold">{contact.username}</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">{contact.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatUsers;
