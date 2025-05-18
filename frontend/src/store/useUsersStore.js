import { create } from 'zustand';

const useUsersStore = create((set) => ({
    users: [],
    
    updateUsersName: (Users) => set({users: Users})

}));

export default useUsersStore 

