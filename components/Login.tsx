'use client'
import Tooltip from "antd/es/tooltip"
import {signIn, signOut, useSession} from "next-auth/react"

export default function Component() {
    const {data: session} = useSession()
    if (session && session.user) {
        console.log("session", session)
        return (
            <>
                <button className="mr-1" onClick={() => signOut()}>LogOut</button>
                <Tooltip title={session.user.email}>
                    <img src={session.user.image || '/bgstar.svg'} alt="" className="round-full w-8"/>
                </Tooltip>
                {/* <span className="mr-1">{session.user.email}</span> */}
            </>
        )
    }
    return (
        <button onClick={() => signIn()}>LogIn</button>
        // <button></button>
    )
}