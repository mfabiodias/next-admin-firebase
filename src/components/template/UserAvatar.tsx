import Link from 'next/link'
import useAuth from '../../data/hook/useAuth'

interface UserAvatarProps {
    className?: string
}

export default function UserAvatar(props: UserAvatarProps) {
    const { user } = useAuth()
    
    return (
        <Link href="/perfil">
            <img
                src={user?.imageUrl ?? '/images/avatar.svg'}
                alt="Usuário"
                className={`
                    h-10 w-10 rounded-full cursor-pointer dark:text-gray-200 items-center
                    ${props.className}
                `}
            />
        </Link>
    )
}