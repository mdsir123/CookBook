import { createContext, useContext, useState } from "react";

const ThemeStore = createContext(null)

const ThemeController = ({children}) =>{

    const [theme, setTheme] = useState(localStorage.getItem("theme") ||'light')
    return (
        <ThemeStore.Provider value= {{theme, setTheme}}>
            {children}
        </ThemeStore.Provider>
    )
}

export {ThemeStore,ThemeController}  

