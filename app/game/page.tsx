import {History} from "@/app/ui/history";
import {Board} from "../ui/board";
import React from "react";
import clsx from "clsx";

export default function Home() {

    return (
        <main className={clsx("flex flex-col sm:flex-row")}>
            <div className={clsx("w-full sm:max-w-3/10 sm:w-3/5 p-4")}>
                <Board/>
            </div>
            <div className={clsx("w-full sm:max-w-2/5 sm:w-2/5 p-4")}>
                <History/>
            </div>
        </main>
    );
}
