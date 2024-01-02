import React from 'react';
import {listSudokuPuzzleById} from "@/app/lib/dal/SudokuPuzzleMapper";
import Link from "next/link";
import {Game} from "@/app/lib/model/model";

export async function History({}: {}) {
    // const [historys, setHistorys] = useState<Game[]>()
    // useEffect(() => {
    const historys = await fetchGameHistory()
    // }, [])

    return (
        <div className="flex flex-col items-center  p-5 rounded-xl ">
            <h1 className="text-lg font-semibold mb-4">游戏记录</h1>
            <div className="overflow-auto h-64">
                {historys && historys.map((game, index) => (
                    <div key={index} className="flex mb-2 p-2 bg-base-300 rounded">
                        <div className="flex-1 cursor-pointer"
                             style={{display: 'flex', justifyContent: 'space-around'}}>
                            <div>时间: {game.create_time.toLocaleTimeString()}</div>
                            <div>难度: {game.difficulty}</div>
                            <div>状态: {game.state > 0 ? '成功' : game.state < 0 ? '失败' : '进行中'}</div>
                            <Link href={`/game/${game.id}`}>点击查看</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

async function fetchGameHistory() {
    return (await listSudokuPuzzleById()).map(d => Game.parse(d));
}
