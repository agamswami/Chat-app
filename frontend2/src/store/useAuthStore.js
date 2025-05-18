import { create } from 'zustand';

const useAuthStore = create((set) => ({
    isLogin: true,
    toggleAuth: () => set((state) => ({ isLogin: !state.isLogin })),
    authName: '',
    updateAuthName: (name) => set({authName: name})

}));

export default useAuthStore;
