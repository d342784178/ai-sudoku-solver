import {ChangeEvent, useEffect, useState} from 'react';
import {Game, History, useSudoku} from "@/app/ui/hook/useSudoku";
import {Cell} from "@/app/ui/cell";
import {Record} from "@/app/ui/record";
import {getSudokuPuzzleById} from "@/app/lib/dal/SudokuPuzzleMapper";
import {getUserStepByPuzzleId} from "@/app/lib/dal/UserStepMapper";

export function HistoryBoard({id}: { id: number }) {
    const [game, setGame] = useState<Game | null>(null);
    const [historyHover, setHistoryHover] = useState<History | null>(null)

    fetchGameHistory(id).then(game => {
        if (game) {
            setGame(game)
        } else {
            console.log("game不存在")
        }
    })

    // 渲染棋盘
    const renderBoard = game?.userSolution().map((row: (number | null)[], rowIndex: number) => (
        <div key={rowIndex}>
            {row.map(
                (value, colIndex) => (
                    <Cell key={colIndex} colIndex={colIndex} rowIndex={rowIndex} value={value}
                          highLight={historyHover && historyHover.row === rowIndex && historyHover.col === colIndex}/>
                )
            )
            }
        </div>
    ));

    return (
        <main>
            <div className="flex flex-col items-center  p-5 rounded-xl shadow-lg">
                {/*<button className="btn" onClick={checkGame}>检查结果</button>*/}
                <div
                    className={`shadow-xl rounded-xl ${game?.checkSolution() ? "border-4 border-green-300 " : "border-4 border-red-300"}`}>
                    {renderBoard}
                </div>
                <div>
                    <Record records={game ? game.historys : []}
                            onMouseEnterRecord={(record, index) => setHistoryHover(record)}
                            onMouseLeaveRecord={(record, index) => setHistoryHover(null)}/>
                </div>
            </div>
        </main>
    )
}

async function fetchGameHistory(id: number) {
    let game = await getSudokuPuzzleById(id);
    let userSteps = await getUserStepByPuzzleId(id);
    if (game != null) {
        let game1 = new Game(game.puzzle, game.difficulty, game.solution, game.createTime);
        game1.historys = userSteps ? userSteps.map(userStep => new History(userStep.cell, userStep.cell, userStep.value, userStep.createTime)) : [];
        return game1;
    } else {
        return null;
    }
}
