import { defineStore } from "pinia";



export const useUserStore = defineStore('user', {
    state: () => ({
        userInfo: null as null | { id: string; name: string; phone: string },
        token: localStorage.getItem('token') || '',
        loading: false
    }),
    
    getters:{
        isLogin():boolean{
            return !!this.token
        }
    },
    actions: {
        setUser(user: any) {
            this.userInfo = user;
        },
    },
});