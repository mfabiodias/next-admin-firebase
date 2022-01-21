import { createContext, useEffect, useState } from "react";

// type Theme = 'dark' | ''

interface AppContextProps {
    theme?: string
    changeTheme?: () => void
}

const AppContext = createContext<AppContextProps>({})

export function AppProvider(props) {
    const [theme, setTheme] = useState('dark')

    function changeTheme() {
        const novoTheme = theme === '' ? 'dark' : ''
        setTheme(novoTheme)
        localStorage.setItem('theme', novoTheme)
    }

    useEffect(() => {
        const themeSalvo = localStorage.getItem('theme')
        setTheme(themeSalvo)
    }, [])

    return (
        <AppContext.Provider value={{
            theme,
            changeTheme
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext