'use client';
import {ChangeEvent, useEffect, useState} from 'react';
import {useSudoku} from "@/app/ui/hook/useSudoku";
import {Cell} from "@/app/ui/cell";
import {Step} from "@/app/ui/step";
import {useDebounce} from "react-use";
import {Game, UserStep} from "@/app/lib/model/model";

export function Board({game}: {
    game?: {
        id: number,
        puzzle: string
        difficulty: string
        solution: string
        create_time: Date
        userSteps: {
            id: number;
            puzzle_id: number;
            cell: number;
            value: number
            create_time: Date
        }[]
    }
}) {
    const {
        // game,
        newGame,
        makeMove,
        checkGame,
        userSteps,
        userSolution,
        gameState,
        recoverGame,
    } = useSudoku();
    const [userStepHover, setUserStepHover] = useState<UserStep | null>(null)

    useEffect(() => {
        if (game) {
            let game1 = Game.parse(game);
            console.log(game1)
            recoverGame(game1)
        }
    }, [game]);

    // 当用户输入数据时更新棋盘
    const handleInput = (inputNumber: number, row: any, col: any) => {
        const value = Number(inputNumber);
        if (value >= 1 && value <= 9) {
            makeMove(row, col, value);
        }
    };
    // 渲染棋盘
    const renderBoard = userSolution().map((row: number[], rowIndex: number) => (
        <div className="grid grid-cols-9 gap-1" key={rowIndex}>
            {row.map(
                (value, colIndex) => (
                    <Cell key={colIndex} colIndex={colIndex} rowIndex={rowIndex} value={value} handleInput={handleInput}
                          highLight={userStepHover && userStepHover.cell == rowIndex * 9 + colIndex}/>
                )
            )
            }
        </div>
    ));

    return (
        <main className="max-w-full h-full p-4 md:p-0">
            <div className="flex flex-col items-center justify-center md:px-5 lg:px-0 rounded-xl shadow-lg max-w-full">
                {game ? (<div/>) : (<button className="btn my-2" onClick={newGame}>创建新游戏</button>)}
                {/* <button className="btn my-2">检查结果</button> */}
                <div
                    className={`overflow-auto border-4 shadow-xl rounded-xl my-4 md:my-2 ${gameState ? "border-green-300 " : "border-red-300"}`}>
                    {renderBoard}
                </div>
                <div className="max-h-64 my-2">
                    <Step userSteps={userSteps}
                          onMouseEnterRecord={(userStep, index) => setUserStepHover(userStep)}
                          onMouseLeaveRecord={(userStep, index) => setUserStepHover(null)}/>
                </div>
            </div>
        </main>
    )
}
