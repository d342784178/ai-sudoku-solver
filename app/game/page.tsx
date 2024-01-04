import {History} from "@/app/ui/history";
import {Board} from "../ui/board";
import React from "react";

export default function Home() {

    return (
        <main>
            <div>
                <Board/>
            </div>
            <div className="max-h-64 my-2">
                <section>
                    <History/>
                </section>
            </div>
        </main>
    )
}
