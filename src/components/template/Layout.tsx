import Sidebar from './Sidebar'
import Header from './Header'
import Content from './Content'
import RequiredAuth from '../auth/RequiredAuth'
import useAppData from '../../data/hook/useAppData'

interface LayoutProps {
    title: string
    subTitle: string
    children?: any
}

export default function Layout(props: LayoutProps) {
    const { theme } = useAppData()
    return (
        <RequiredAuth>
            <div className={`${theme} flex h-screen w-screen`}>
                <Sidebar />
                <div className={`
                flex flex-col w-full p-7 
                bg-gray-300 dark:bg-gray-800
            `}>
                    <Header title={props.title} subTitle={props.subTitle} />
                    <Content>
                        {props.children}
                    </Content>
                </div>
            </div>
        </RequiredAuth>
    )
}