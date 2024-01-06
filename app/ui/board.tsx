'use client';
import {useEffect, useRef, useState} from 'react';
import {useSudoku} from "@/app/ui/hook/useSudoku";
import {Cell} from "@/app/ui/cell";
import {Step} from "@/app/ui/step";
import {Game, UserStep} from "@/app/lib/model/model";
import _ from "lodash";
import clsx from "clsx";

export function Board({currentGame}: {
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
        saveAsGame,
        msgContextHolder,
    } = useSudoku();
    const [userStepHover, setUserStepHover] = useState<UserStep | null>(null)

    useEffect(() => {
        if (currentGame) {
            let game1 = Game.parse(currentGame);
            console.log(game1)
            recoverGame(game1)
        }
    }, [currentGame, recoverGame]);
    let initBoardData = useRef<number[][]>(Array.from({length: 9}, () => new Array(9).fill(-1)));

    // 当用户输入数据时更新棋盘
    const handleInput = (inputNumber: number, row: any, col: any) => {
        const value = Number(inputNumber);
        if (value >= 1 && value <= 9) {
            makeMove(row, col, value);
        }
    };
    // 渲染棋盘
    const renderBoard = (game ? game.userSolution() : initBoardData.current)
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

    function gameStartButton() {
        if (currentGame) {
            return (<div/>);
        } else {
            if (game) {
                return (<button className="btn my-2 bg-blue-400" onClick={newGame}>创建新游戏</button>)
            } else if (_.findIndex(_.flatten(initBoardData.current), (d) => d > -1) > 0) {
                return (<button className="btn my-2 bg-yellow-300"
                                onClick={() => saveAsGame(initBoardData.current)}>保存为新游戏</button>);
            } else {
                return (<button className="btn my-2 bg-blue-400" onClick={newGame}>创建新游戏</button>);
            }
        }
    }

    return (
        <main className="max-w-full h-full p-4 md:p-0">
            {msgContextHolder}
            <div className="flex flex-col items-center justify-center md:px-5 lg:px-0 rounded-xl  max-w-full">
                {/*{currentGame ? (<div/>) : (<button className="btn my-2" onClick={newGame}>创建新游戏</button>)}*/}
                {gameStartButton()}
                <div className={clsx(`overflow-auto border-4 shadow-xl rounded-xl my-4 md:my-2`,
                        game && game.state > 0 ? "border-green-300 " : game && game.state < 0 ? "border-red-300" : "border-gray-300")}>
                    {renderBoard}
                </div>
                {/*<div className="max-h-64 my-2">*/}
                {/*    <Step userSteps={game && game.userSteps}*/}
                {/*          onMouseEnterRecord={(userStep, index) => setUserStepHover(userStep)}*/}
                {/*          onMouseLeaveRecord={(userStep, index) => setUserStepHover(null)}/>*/}
                {/*</div>*/}
            </div>
        </main>
    )
}
