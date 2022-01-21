import useAuth from "../../data/hook/useAuth"
import useAppData from '../../data/hook/useAppData'
import { IconSettings, IconHome, IconExit, IconBell } from "../icons"
import Logo from "./Logo"
import MenuItem from "./MenuItem"

export default function Sidebar() {

    const { logout } = useAuth()
    const {  mobileMenu, sidebarMenu } = useAppData()

    const hiddenMenu = !mobileMenu || sidebarMenu ? "flex" : "hidden md:flex" 

    console.log("hiddenMenu")
    console.log("CSS")
    console.log(hiddenMenu)
    console.log(mobileMenu, sidebarMenu)


    // toggleSidebarMenu

    return (
        <aside className={`
            ${hiddenMenu} flex-col
            bg-gray-200 text-gray-700
            dark:bg-gray-900 
        `}>
            <div className={`
                flex flex-col items-center justify-center
                bg-gradient-to-r from-indigo-500 to-purple-800
                h-20 w-20
            `}>
                <Logo />
            </div>
            <ul className="flex-grow">
                <MenuItem url="/" text="Início" icon={IconHome()} />
                <MenuItem url="/ajustes" text="Ajustes" icon={IconSettings()} />
                <MenuItem url="/notificacoes" text="Notificações" icon={IconBell()} />
            </ul>
            <ul>
                <MenuItem
                    text="Sair" icon={IconExit()} 
                    onClick={logout}
                    className={`
                        text-red-600 dark:text-red-400
                        hover:bg-red-400 hover:text-white
                        dark:hover:text-white
                    `}
                />
            </ul>
        </aside>
    )
}