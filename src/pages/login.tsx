import { useState } from "react"
import InputAuth from "../components/auth/InputAuth"
import { IconCaution } from "../components/icons"
import useAuth from "../data/hook/useAuth"

export default function Login() {

    const { register, login, loginGoogle } = useAuth()

    const [erro, setErro] = useState(null)
    const [mode, setMode] = useState<'login' | 'register'>('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function exibirErro(msg, tempoEmSegundos = 5) {
        setErro(msg)
        setTimeout(() => setErro(null), tempoEmSegundos * 1000)
    }

    async function submeter() {
        try {
            if (mode === 'login') {
                await login(email, password)
            } else {
                await register(email, password)
            }
        } catch(e) {
            exibirErro(e?.message ?? 'Erro desconhecido!')
        }
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="hidden md:block md:w-1/2 lg:w-2/3">
                <img 
                    src="https://source.unsplash.com/random"
                    alt="Imagem da Tela de Autenticação"
                    className="h-screen w-full object-cover" />
            </div>
            <div className="m-10 w-full md:w-1/2 lg:w-1/3">
                <h1 className={`text-3xl font-bold mb-5`}>
                    {mode === 'login' ? 'Entre com a Sua Conta' : 'Cadastre-se na Plataforma'}
                </h1>

                {erro ? (
                    <div className={`
                        flex items-center
                        bg-red-400 text-white py-3 px-5 my-2
                        border border-red-700 rounded-lg
                    `}>
                        {IconCaution()}
                        <span className="ml-3">{erro}</span>
                    </div>
                ) : false}
                
                <InputAuth
                    label="Email"
                    type="email"
                    value={email}
                    changedValue={setEmail}
                    required
                />
                <InputAuth
                    label="password"
                    type="password"
                    value={password}
                    changedValue={setPassword}
                    required
                />

                <button onClick={submeter} className={`
                    w-full bg-indigo-500 hover:bg-indigo-400
                    text-white rounded-lg px-4 py-3 mt-6
                `}>
                    {mode === 'login' ? 'Entrar' : 'Cadastrar'}
                </button>

                <hr className="my-6 border-gray-300 w-full" />

                <button onClick={loginGoogle} className={`
                    w-full bg-red-500 hover:bg-red-400
                    text-white rounded-lg px-4 py-3
                `}>
                    Entrar com Google
                </button>

                {mode === 'login' ? (
                    <p className="mt-8">
                        Novo por aqui?
                        <a onClick={() => setMode('register')} className={`
                            text-blue-500 hover:text-blue-700 font-semibold
                            cursor-pointer
                        `}> Crie um Conta Gratuitamente</a>
                    </p>
                ) : (
                    <p className="mt-8">
                        Já faz parte da nossa comunidade?
                        <a onClick={() => setMode('login')} className={`
                            text-blue-500 hover:text-blue-700 font-semibold
                            cursor-pointer
                        `}> Entre com a suas Credenciais</a>
                    </p>
                )}
            </div>
        </div>
    )
}