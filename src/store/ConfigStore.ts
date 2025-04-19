import { create } from 'zustand';
import { combine } from 'zustand/middleware';

const useConfigStore = create(
    combine({
        language: "vi"
    },
        (set) => {
            return {
                setLanguage: (language: string) => {
                    set({ language: language })
                }
            }
        }
    )
)

export default useConfigStore;