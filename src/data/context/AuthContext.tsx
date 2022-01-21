import route from 'next/router'
import { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import firebase from '../../firebase/config'
import UserModel from '../../model/UserModel'

interface AuthContextProps {
    user?: UserModel
    loading?: boolean
    register?: (email: string, password: string) => Promise<void>
    login?: (email: string, password: string) => Promise<void>
    loginGoogle?: () => Promise<void>
    logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

async function userTemplate(firebaseUser: firebase.User): Promise<UserModel> {
    const token = await firebaseUser.getIdToken()
    return {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        token,
        provider: firebaseUser.providerData[0].providerId,
        imageUrl: firebaseUser.photoURL
    }
}

function cookieManager(logged: boolean) {
    if (logged) {
        Cookies.set('admin-template-cod3r-auth', logged, {
            expires: 7
        })
    } else {
        Cookies.remove('admin-template-cod3r-auth')
    }
}

export function AuthProvider(props) {
    const [loading, setLoading] = useState(true)
    const [user, setuser] = useState<UserModel>(null)

    async function setSession(firebaseUser) {
        if (firebaseUser?.email) {
            const user = await userTemplate(firebaseUser)
            setuser(user)
            cookieManager(true)
            setLoading(false)
            return user.email
        } else {
            setuser(null)
            cookieManager(false)
            setLoading(false)
            return false
        }
    }

    async function login(email, password) {
        try {
            setLoading(true)
            const resp = await firebase.auth()
                .signInWithEmailAndPassword(email, password)
    
            await setSession(resp.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
    }

    async function register(email, password) {
        try {
            setLoading(true)
            const resp = await firebase.auth()
                .createUserWithEmailAndPassword(email, password)
    
            await setSession(resp.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
    }

    async function loginGoogle() {
        try {
            setLoading(true)
            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )
    
            await setSession(resp.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
    }

    async function logout() {
        try {
            setLoading(true)
            await firebase.auth().signOut()
            await setSession(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(Cookies.get('admin-template-cod3r-auth')) {
            const cancelar = firebase.auth().onIdTokenChanged(setSession)
            return () => cancelar()
        } else {
            setLoading(false)
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            loginGoogle,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContext