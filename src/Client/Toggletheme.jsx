import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import darkColors from '../Theme/darkColors'
import lightColors from '../Theme/lightColors';


//persist serge as a local storage here !!
const useTheme = create(
  persist(
    (set, get) => ({
      isDark: true,
      colors: darkColors,

      toggleTheme: () => {
        const isDark = !get().isDark
        set({
          isDark,
          colors: isDark ? darkColors : lightColors,
        })
      },
    }),
    {
      name: 'cheddar-theme',
    }
  )
)

export default useTheme