import {create} from 'zustand';


const useChatMsgsStore = create( (set) => ({
   chatMsgs: [],
   updateChatMsgs: (chatMsgs) => set({chatMsgs: chatMsgs})
}));


export default useChatMsgsStore;