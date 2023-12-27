'use client';
import React, {MouseEvent, MouseEventHandler} from 'react';
import {useState} from "react";
import {Game, UserStep} from "@/app/ui/hook/useSudoku";
import Link from "next/link";

export function GameHistory({}: {}) {
    const [gameHisotry, setGameHistory] = useState<Game[] | null>(null)

    fetch("/api/puzzle", {
        method: "GET",
    }).then(async (resp) => {
        if (resp.ok) {
            const res = await resp.json();
            if (res.data) {
                setGameHistory(res.data)
            }
        }
    });


    return (
        <div className="flex flex-col items-center  p-5 rounded-xl ">
            <h1 className="text-lg font-semibold mb-4">游戏记录</h1>
            <div className="overflow-auto h-64">
                {gameHisotry?.map((game, index) => (
                    <div key={index} className="flex mb-2 p-2 bg-base-300 rounded">
                        <div className="flex-1 cursor-pointer"
                             style={{display: 'flex', justifyContent: 'space-around'}}>
                            <div>时间: {game.create_time.toLocaleTimeString()}</div>
                            <div>难度: {game.difficulty}</div>
                            <div><Link href={`/game/${game.id}`}>点击查看w</Link></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
