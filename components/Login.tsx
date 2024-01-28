'use client'
import {signIn, signOut, useSession} from "next-auth/react"

export default function Component() {
    const {data: session} = useSession()
    if (session && session.user) {
        console.log("session", session)
        return (
            <>
                <button className="mr-1" onClick={() => signOut()}>LogOut</button>
                <img src={session.user.image||'/bgstar.svg'} alt="" className="round-full w-8"/>
                {/* <span className="mr-1">{session.user.email}</span> */}
            </>
        )
    }
    return (
        <button onClick={() => signIn()}>LogIn</button>
        // <button></button>
    )
}