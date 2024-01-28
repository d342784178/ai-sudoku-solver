'use client'
import {signIn, signOut, useSession} from "next-auth/react"

export default function Component() {
    const {data: session} = useSession()
    if (session && session.user) {
        return (
            <>
                <span className="mr-1">{session.user.email}</span>
                <button onClick={() => signOut()}>登出</button>
            </>
        )
    }
    return (
        <button onClick={() => signIn()}>登录</button>
        // <button></button>
    )
}