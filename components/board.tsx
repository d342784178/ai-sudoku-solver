'use client';
import {useEffect, useRef, useState} from 'react';
import {useSudoku} from "@/components/hook/useSudoku";
import {Cell} from "@/components/cell";
import {Step} from "@/components/step";
import {Game, UserStep} from "@/lib/model/model";
import _ from "lodash";
import clsx from "clsx";
import {sudoku} from "@/lib/sudoku";

export function Board({game, makeMove, removeUserStep, boardDataChange}: {
    game?: Game
    makeMove?: Function,
    removeUserStep?: Function
    boardDataChange?: Function
}) {
    const [userStepHover, setUserStepHover] = useState<UserStep | null>(null)

    let [initBoardData, setInitBoardData] = useState<number[][]>(Array.from({length: 9}, () => new Array(9).fill(-1)));
    // TODO 生成一些初始数据调试用
    useEffect(() => {
        if (boardDataChange) {
            let puzzle = sudoku.init();
            puzzle = sudoku.digHole(puzzle, 4)
            setInitBoardData(puzzle)
            boardDataChange(puzzle)
            console.log('生成一些初始数据调试用')
        }
    }, [])

    // 当用户输入数据时更新棋盘
    const handleInput = (inputNumber: number, row: any, col: any) => {
        const value = Number(inputNumber);
        if (game) {
            makeMove && makeMove(row, col, value);
        } else {
            initBoardData[row][col] = value
            let newBoardData = [...initBoardData];
            setInitBoardData(newBoardData)
            boardDataChange && boardDataChange(newBoardData)
        }
    };

    return (
        <div className={clsx(`overflow-auto border-4 shadow-xl rounded-xl my-4 md:my-2`,
            game && game.state > 0 ? "border-green-300 " : game && game.state < 0 ? "border-red-300" : "border-gray-300")}>

            {(game ? game.userSolution() : initBoardData).map((row: number[], rowIndex: number) => (
                <div className="grid grid-cols-9 gap-1" key={rowIndex}>
                    {row.map(
                        (value, colIndex) => (
                            <Cell key={colIndex} colIndex={colIndex} rowIndex={rowIndex} value={value}
                                  handleInput={handleInput}
                                  highLight={userStepHover && userStepHover.cell == rowIndex * 9 + colIndex}
                                  userStepIndex={game ? game.userStepIndex(rowIndex * 9 + colIndex) + 1 : 0}
                                  removeUserStep={(userStepIndex: number) => {
                                      removeUserStep && removeUserStep(userStepIndex - 1)
                                  }}/>
                        )
                    )
                    }
                </div>
            ))}
        </div>
    )
}
