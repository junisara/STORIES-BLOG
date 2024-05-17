import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type SidebarState = {
  open: boolean
  setOpen: (opn?: boolean) => void
}

export const useSidebarStore = create<SidebarState>()(set => ({
  open: false,
  setOpen: opn => set(state => ({ open: opn })),
}))

/**
 * 테마 설정 (light, dark)
 * persist : persist로 감싸면 브라우저 스토리지에 저장을 하기 때문에 리프레쉬를 해도 값이 유지됨
 */
type ThemeModeState = {
  themeMode: string
  setThemeMode: (themeMode?: string) => void
}

export const useThemeModeStore = create<ThemeModeState>()(
  persist(
    (set, get) => ({
      themeMode: 'light',
      // setThemeMode: (mode) => set({ themeMode: get().themeMode === 'light' ? 'dark' : 'light' }),
      setThemeMode: mode => set(state => ({ themeMode: mode })),
    }),
    {
      name: 'theme-mode', // name of the item in the storage (must be unique)
      // storage: createJSONStorage(() => sessionStorage), // (optional)이기 때문에 해당 줄을 적지 않으면 'localStorage'가 기본 저장소로 사용된다.
    },
  ),
)
