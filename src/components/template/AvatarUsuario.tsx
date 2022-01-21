import Link from 'next/link'
import useAuth from '../../data/hook/useAuth'

interface AvatarUsuarioProps {
    className?: string
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {
    const { usuario } = useAuth()
    
    return (
        <Link href="/perfil">
            <img
                src={usuario?.imagemUrl ?? '/images/avatar.svg'}
                alt="Usuário"
                className={`
                    h-10 w-10 rounded-full cursor-pointer dark:text-gray-200 items-center
                    ${props.className}
                `}
            />
        </Link>
    )
}