import { create } from "zustand";
import IUser from "../models/IUser";
import { devtools, persist } from "zustand/middleware"
import axios from "axios";
import BACKEND_URL from "../../config";

interface UserState {
    isAuth: boolean,
    user: IUser,
    setUser: (email: string, password: string) => void,
    auth: () => void,
    setLogout: () => void,
}

const useUserStore = create<UserState>()(devtools((set => ({
    isAuth: false,
    user: {
        id: 0,
        email: '',
        fio: '',
        phone: undefined,
        role: 'USER',
        usedSpace: 0,
        maxSpace: undefined,
        folderId: 0,
        files: [],
        createAt: '',
        updateAt: '',
        history: []
    },
    setUser: async (email: string, password: string) => {
        try {
            const res = await axios.post(`${BACKEND_URL}/user/login`, {
                email: email,
                password: password
            });
            localStorage.setItem('token', await res.data.token)
            set({ user: await res.data.user, isAuth: true })
        } catch (e: any) {
            console.log(e.response.data.message);
        }

    },
    auth: async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/user/auth`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            localStorage.setItem('token', await res.data.token)
            set({ user: await res.data.user, isAuth: true })
        } catch (e: any) {
            console.log(e.response.data.message);
            localStorage.removeItem('token')
            set ({
                user: {
                    id: 0,
                    email: '',
                    fio: '',
                    phone: undefined,
                    role: 'USER',
                    usedSpace: 0,
                    maxSpace: undefined,
                    folderId: 0,
                    files: [],
                    createAt: '',
                    updateAt: '',
                    history: []
                },
                isAuth: false
            })
        }
    },
    setLogout: () => set(state => {
        localStorage.removeItem('token')
        return {
            user: {
                id: 0,
                email: '',
                fio: '',
                phone: undefined,
                role: 'USER',
                usedSpace: 0,
                maxSpace: undefined,
                folderId: 0,
                files: [],
                createAt: '',
                updateAt: '',
                history: []
            },
            isAuth: false
        }
    })
}))))

export default useUserStore;