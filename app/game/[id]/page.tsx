'use client'
import React, {useEffect, useState} from "react";
import {GamePlace} from "@/components/gamePlace";
import {Header} from "@/components/Header";
import {ProxyHub} from "@/app/api/proxy/route";
import {Puzzle} from "@/lib/model/Puzzle";
import {message} from "antd";

export default function Home({params}: { params: { id: string } }) {
    const [messageApi, contextHolder] = message.useMessage();

    const [game, setGame] = useState<Puzzle>()
    useEffect(() => {
        messageApi.open({
            type: 'loading',
            content: 'Loading Game..',
            duration: 0,
        });
        ProxyHub.loadPuzzle.invoke(params.id).then((result) => {
            setGame(result)
            messageApi.destroy()
        });
    }, [params.id]);
    return (
        <main>
            {contextHolder}
            <header className="text-gray-600 body-font">
                <Header/>
            </header>
            <GamePlace currentGame={game}/>
        </main>
    )
}

