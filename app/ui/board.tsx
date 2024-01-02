'use client';
import {useEffect, useState} from 'react';
import {useSudoku} from "@/app/ui/hook/useSudoku";
import {Cell} from "@/app/ui/cell";
import {Step} from "@/app/ui/step";
import {Game, UserStep} from "@/app/lib/model/model";

export function Board({currentGame}: {
    currentGame?: {
        id: number,
        puzzle: string
        difficulty: number
        solution: string
        create_time: Date
        userSteps: {
            id: number;
            puzzle_id: number;
            cell: number;
            value: number
            create_time: Date
        }[],
        state: number
    }
}) {
    const {
        game,
        newGame,
        makeMove,
        recoverGame,
    } = useSudoku();
    const [userStepHover, setUserStepHover] = useState<UserStep | null>(null)

    useEffect(() => {
        if (currentGame) {
            let game1 = Game.parse(currentGame);
            console.log(game1)
            recoverGame(game1)
        }
    }, [currentGame, recoverGame]);

    // 当用户输入数据时更新棋盘
    const handleInput = (inputNumber: number, row: any, col: any) => {
        const value = Number(inputNumber);
        if (value >= 1 && value <= 9) {
            makeMove(row, col, value);
        }
    };
    // 渲染棋盘
    const renderBoard = (game ? game.userSolution() : Array.from({length: 9}, () => new Array(9).fill(-1)))
        .map((row: number[], rowIndex: number) => (
            <div className="grid grid-cols-9 gap-1" key={rowIndex}>
                {row.map(
                    (value, colIndex) => (
                        <Cell key={colIndex} colIndex={colIndex} rowIndex={rowIndex} value={value}
                              handleInput={handleInput}
                              highLight={userStepHover && userStepHover.cell == rowIndex * 9 + colIndex}
                              userStepIndex={game ? game.userStepIndex(rowIndex * 9 + colIndex) + 1 : 0}/>
                    )
                )
                }
            </div>
        ));

    return (
        <main className="max-w-full h-full p-4 md:p-0">
            <div className="flex flex-col items-center justify-center md:px-5 lg:px-0 rounded-xl shadow-lg max-w-full">
                {currentGame ? (<div/>) : (<button className="btn my-2" onClick={newGame}>创建新游戏</button>)}
                {/* <button className="btn my-2">检查结果</button> */}
                <div
                    className={`overflow-auto border-4 shadow-xl rounded-xl my-4 md:my-2 ${game && game.state > 0 ? "border-green-300 " : game && game.state < 0 ? "border-red-300" : "border-gray-300"}`}>
                    {renderBoard}
                </div>
                <div className="max-h-64 my-2">
                    <Step userSteps={game && game.userSteps}
                          onMouseEnterRecord={(userStep, index) => setUserStepHover(userStep)}
                          onMouseLeaveRecord={(userStep, index) => setUserStepHover(null)}/>
                </div>
            </div>
        </main>
    )
}
