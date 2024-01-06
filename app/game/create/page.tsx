"use client"
import {History} from "@/app/ui/history";
import clsx from "clsx";
import {useSudoku} from "@/app/ui/hook/useSudoku";
import Link from "next/link";
import {Board} from "@/app/ui/board";
import {useCallbackState} from "@/app/ui/hook/useCallbackState";
import {Game} from "@/app/lib/model/model";
import {useRouter} from "next/navigation";

export default function Home() {
    const {saveAsGame, msgContextHolder} = useSudoku()
    const router = useRouter()


    const [boardData, setBoardData] = useCallbackState<number[][]>();
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
        <main className="max-w-full h-full p-4 md:p-0">
            {msgContextHolder}
            <div className="flex flex-col items-center justify-center md:px-5 lg:px-0 rounded-xl  max-w-full">
                <div>
                    <button className="btn my-2 bg-blue-400" onClick={save}>保存</button>
                </div>

                <Board boardDataChange={boardDataChange}/>
            </div>
        </main>
    )
}
