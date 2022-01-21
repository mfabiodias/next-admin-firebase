import Link from 'next/link'
import useAppData from '../../data/hook/useAppData'

interface MenuItemProps {
    text: string
    icon: any
    url?: string
    className?: string
    onClick?: (evento: any) => void
}

export default function MenuItem(props: MenuItemProps) {
    const { mobileMenu, toggleSidebarMenu } = useAppData()

    const onClick = () => {

        if(mobileMenu) toggleSidebarMenu(false);

        return props.onClick
    }

    function renderizarLink() {
        return (
            <a className={`
                    flex flex-col justify-center items-center
                    h-20 w-20
                    dark:text-gray-200
                    ${props.className}
                `}>
                {props.icon}
                <span className={`text-xs font-light`}>
                    {props.text}
                </span>
            </a>
        )
    }
    return (
        <li onClick={onClick} className={`
            hover:bg-gray-100 dark:hover:bg-gray-800
            cursor-pointer
        `}>
            {props.url ? (
                <Link href={props.url}>
                    {renderizarLink()}
                </Link>
            ) : (
                renderizarLink()
            )}
        </li>
    )
}