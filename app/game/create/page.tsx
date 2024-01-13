"use client"
import {useSudoku} from "@/components/hook/useSudoku";
import {Board} from "@/components/board";
import {useCallbackState} from "@/components/hook/useCallbackState";
import {Game} from "@/lib/model/model";
import {useRouter} from "next/navigation";
import {Header} from "@/components/Header";
import {useRef} from "react";

export default function Home() {
    const {saveAsGame, msgContextHolder} = useSudoku()
    const router = useRouter()
    const [boardData, setBoardData] = useCallbackState<number[][]>();
    const boardRef = useRef<{ initialBoardData: Function }>(null);

    const boardDataChange = (boardData: number[][]) => {
        setBoardData(boardData)
    }

    const save = () => {
        if (boardData) {
            saveAsGame(boardData).then((game) => {
                if (game instanceof Game) {
                    router.push(`/game/${game.id}`)
                }
            }).catch((msg: string) => {
                console.log(msg)
            });
        }
    }

    return (
        <div>
            <header className="text-gray-600 body-font">
                <Header/>
            </header>

            <main className="max-w-full h-full p-4 md:p-0">

                {msgContextHolder}
                <div className="flex flex-col items-center justify-center content-center md:px-5 lg:px-0 rounded-xl  max-w-full">
                    <div>
                        <button className="btn my-2 bg-blue-400"
                                onClick={() => boardRef.current?.initialBoardData()}>Init Game
                        </button>
                        <button className="btn my-2 bg-blue-400 mx-5" onClick={save}>Save Game</button>
                    </div>

                    <Board boardDataChange={boardDataChange} ref={boardRef}/>
                </div>
            </main>
        </div>
    )
}
