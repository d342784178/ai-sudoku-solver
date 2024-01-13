'use client';
import {useEffect, useRef, useState} from 'react';
import {useSudoku} from "@/app/ui/hook/useSudoku";
import {Cell} from "@/app/ui/cell";
import {Step} from "@/app/ui/step";
import {Game, UserStep} from "@/app/lib/model/model";
import _ from "lodash";
import clsx from "clsx";
import {Board} from "@/app/ui/board";
import Link from "next/link";

export function GamePlace({currentGame}: {
    currentGame?: {
        id: string,
        puzzle: string
        difficulty: number
        solution: string
        create_time: Date
        userSteps: {
            id: number;
            puzzle_id: string;
            cell: number;
            value: number
            create_time: Date
        }[],
        state: number
    }
}) {
    const {
        game,
        gameLoading,
        moveLoading,
        newGame,
        makeMove,
        recoverGame,
        msgContextHolder,
        removeUserStep,
    } = useSudoku();
    const [userStepHover, setUserStepHover] = useState<UserStep | null>(null)

    useEffect(() => {
        if (currentGame) {
            let game1 = Game.parse(currentGame);
            console.log(game1)
            recoverGame(game1)
        }
    }, [currentGame, recoverGame]);


    return (
        <main className="max-w-full h-full p-4 md:p-0">
            {msgContextHolder}
            <div className="flex flex-col items-center justify-center md:px-5 lg:px-0 rounded-xl  max-w-full">
                {/*{currentGame ? (<div/>) : (<button className="btn my-2" onClick={newGame}>创建新游戏</button>)}*/}

                {currentGame ? (<div/>) : (<div>
                        <button className="btn my-2 bg-blue-400" onClick={newGame}>生成新游戏</button>
                        <Link className="btn my-2 bg-yellow-400" href="/game/create">自定义游戏</Link>
                    </div>
                )}

                <Board makeMove={makeMove} game={game} removeUserStep={removeUserStep}/>

                {/*<div className="max-h-64 my-2">*/}
                {/*    <Step userSteps={game && game.userSteps}*/}
                {/*          onMouseEnterRecord={(userStep, index) => setUserStepHover(userStep)}*/}
                {/*          onMouseLeaveRecord={(userStep, index) => setUserStepHover(null)}/>*/}
                {/*</div>*/}
            </div>
        </main>
    )
}
