import Title from './Title'
import ChangeTheme from './ChangeTheme'
import useAppData from '../../data/hook/useAppData'
import UserAvatar from './UserAvatar'

interface HeaderProps {
    title: string
    subTitle: string
}

export default function Header(props: HeaderProps) {
    const { theme, changeTheme } = useAppData()

    return (
        <div className={`flex`}>
            <Title title={props.title} subTitle={props.subTitle} />
            <div className={`flex flex-grow justify-end items-center`}>
                <ChangeTheme theme={theme} changeTheme={changeTheme} />
                <UserAvatar className="ml-3" />
            </div>
        </div>
    )
}