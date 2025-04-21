import {create} from 'zustand';
import { combine } from 'zustand/middleware';
import UserType from '@/types/UserType';
const accessToken = localStorage.getItem('access_token');
const useAuthStore = create(
    combine({
        accessToken: accessToken??"",
        user: null as UserType | null
    }, 
    (set)=>{
        return {
            setAccessToken: (newAccessToken: string)=>{
                set({accessToken: newAccessToken})
            },
            setUser: (newUser: UserType | null)=>{
                set({user: newUser})
            }
        }
    })
)

export default useAuthStore;