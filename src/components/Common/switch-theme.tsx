'use client'

import React from 'react'
import { Button } from '../ui/button'
import { Moon, Sun } from 'lucide-react'
import { useThemeModeStore } from '@/stores/common-store'

const SwitchTheme = () => {
  const { themeMode, setThemeMode } = useThemeModeStore()

  return (
    <div>
      <Button variant="ghost" size="icon" onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}>
        {themeMode === 'light' && <Sun className="h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />}
        {themeMode === 'dark' && <Moon className="absolute h-[1.4rem] w-[1.4rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />}
      </Button>
    </div>
  )
}

export default SwitchTheme

// "use client";

// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Dot, LucideIcon, Monitor, Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";

// const ThemeSwitch = () => {
//   const [mounted, setMounted] = useState(false);
//   const { theme, setTheme } = useTheme();
//   let Icon:string;

//   function toggleTheme() {
//     if(theme === "light") {
//       setTheme("dark");

//     } else {
//       setTheme("light");

//     }
//   }

//   // useEffect only runs on the client, so now we can safely show the UI
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return null;
//   }

//   return (
//         <Button variant="ghost" size="icon" onClick={() => toggleTheme()} >
//           {theme === "light" && <Sun className="h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />}
//           {theme === "dark" && <Moon className="absolute h-[1.4rem] w-[1.4rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />}
//         </Button>
//   );
// };

// export default ThemeSwitch;
