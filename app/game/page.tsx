import {History} from "@/app/ui/history";
import {Board} from "../ui/board";
import React from "react";

export default function Home() {

    return (
        <main style={{display: 'flex'}}>
            <div style={{flex: '30%', maxWidth: '30%'}}>
                <History/>
            </div>

            <div style={{flex: '70%', maxWidth: '70%'}}>
                <Board/>
            </div>

        </main>
    )
}
