import Board from "@/app/ui/board";
import React from "react";
import {HistoryBoard} from "@/app/ui/historyBoard";

export default function Home({params}: { params: { id: number } }) {

    return (
        <main>
            <div>
            </div>
            <HistoryBoard id={params.id}/>
        </main>
    )
}
