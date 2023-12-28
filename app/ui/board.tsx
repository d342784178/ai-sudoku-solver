'use client';
import {ChangeEvent, useEffect, useState} from 'react';
import {UserStep, useSudoku} from "@/app/ui/hook/useSudoku";
import {Cell} from "@/app/ui/cell";
import {Record} from "@/app/ui/record";
import {useDebounce} from "react-use";

export default function Board() {
    const {
        // game,
        newGame,
        makeMove,
        checkGame,
        historys,
        userSolution,
        gameState,
    } = useSudoku();
    const [historyHover, setHistoryHover] = useState<UserStep | null>(null)

    // useEffect(() => {
    //     newGame()
    // }, []);

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
                          highLight={historyHover && historyHover.row === rowIndex && historyHover.col === colIndex}/>
                )
            )
            }
        </div>
    ));

    return (
        <main className="max-w-full h-full p-4 md:p-0">
            <div className="flex flex-col items-center justify-center md:px-5 lg:px-0 rounded-xl shadow-lg max-w-full">
                <button className="btn my-2" onClick={newGame}>创建新游戏</button>
                {/* <button className="btn my-2">检查结果</button> */}
                <div
                    className={`overflow-auto border-4 shadow-xl rounded-xl my-4 md:my-2 ${gameState ? "border-green-300 " : "border-red-300"}`}>
                    {renderBoard}
                </div>
                <div className="max-h-64 my-2">
                    <Record records={historys}
                            onMouseEnterRecord={(record, index) => setHistoryHover(record)}
                            onMouseLeaveRecord={(record, index) => setHistoryHover(null)}/>
                </div>
            </div>
        </main>
    )
}
