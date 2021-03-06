import Image from 'next/image'
import router from 'next/router'
import useAuth from '../../data/hook/useAuth'

interface UserAvatarProps {
    className?: string
}

export default function UserAvatar(props: UserAvatarProps) {
    const { user } = useAuth()

    function goToProfile() {
        router.push('/perfil')
    }

    return (
        <Image src={user?.imageUrl ?? '/images/avatar.svg'} width="40" height="40" 
            className={`
                rounded-full cursor-pointer mx-10
                dark:text-gray-200 ${props.className}
            `}
            onClick={goToProfile}
        />
    )
}