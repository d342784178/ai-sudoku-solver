'use client';
import {ChangeEvent, useState} from 'react';
import {History, useSudoku} from "@/app/hook/useSudoku";
import {Cell} from "@/app/component/cell";
import {Record} from "@/app/component/record";

export default function Board() {
    const {
        gameData,
        newGame,
        makeMove,
        checkGame,
        moveHistory,
    } = useSudoku();
    const [historyHover, setHistoryHover] = useState<History | null>(null)

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
            <div>
                <button className="btn" onClick={newGame}>创建新游戏</button>
                <button className="btn" onClick={checkGame}>检查结果</button>
                <div>
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
