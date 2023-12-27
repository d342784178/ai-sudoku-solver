'use client';
import {ChangeEvent, useEffect, useState} from 'react';
import {History, useSudoku} from "@/app/ui/hook/useSudoku";
import {Cell} from "@/app/ui/cell";
import {Record} from "@/app/ui/record";

export default function Board() {
    const {
        gameData,
        newGame,
        makeMove,
        checkGame,
        moveHistory,
    } = useSudoku();
    const [historyHover, setHistoryHover] = useState<History | null>(null)


    useEffect(() => {
        newGame()
    }, []);

    // 当用户输入数据时更新棋盘
    const handleInput = (event: ChangeEvent<HTMLInputElement>, row: any, col: any) => {
        const value = Number(event.target.value);
        if (value >= 1 && value <= 9) {
            makeMove(row, col, value);
        }
    };
    // 渲染棋盘
    const renderBoard = gameData.map((row: (number | null)[], rowIndex: number) => (
        <div key={rowIndex}>
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
        <main>
            <div className="flex flex-col items-center  p-5 rounded-xl shadow-lg">
                <button className="btn" onClick={newGame}>创建新游戏</button>
                {/*<button className="btn" onClick={checkGame}>检查结果</button>*/}
                <div className={"shadow-xl rounded-xl"}>
                    {renderBoard}
                </div>
                <div>
                    <Record records={moveHistory}
                            onMouseEnterRecord={(record, index) => setHistoryHover(record)}
                            onMouseLeaveRecord={(record, index) => setHistoryHover(null)}/>
                </div>
            </div>
        </main>
    )
}
