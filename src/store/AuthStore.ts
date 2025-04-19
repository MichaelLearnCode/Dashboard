import {create} from 'zustand';
import { combine } from 'zustand/middleware';

const useAuthStore = create(
    combine({
        accessToken: ""
    }, 
    (set)=>{
        return {
            setAccessToken: (newAccessToken: string)=>{
                set({accessToken: newAccessToken})
            }
        }
    })
)

export default useAuthStore;