import React from "react";
import {getSudokuPuzzleById} from "@/lib/dal/SudokuPuzzleMapper";
import {getUserStepByPuzzleId} from "@/lib/dal/UserStepMapper";
import {GamePlace} from "@/components/gamePlace";
import {Header} from "@/components/Header";
import {GameHelper} from "@/lib/model/Puzzle";

export default async function Home({params}: { params: { id: string } }) {
    const game = await fetchGameHistory(params.id)
    return (
        <main>
            <header className="text-gray-600 body-font">
                <Header/>
            </header>
            <GamePlace currentGame={game}/>
        </main>
    )
}

async function fetchGameHistory(id: string) {
    let gameJsonObject = await getSudokuPuzzleById(id);
    let userStepsJsonArray = await getUserStepByPuzzleId(id);
    if (gameJsonObject) {
        let game1 = GameHelper.parseGame(gameJsonObject)
        game1.userSteps = userStepsJsonArray ? userStepsJsonArray : [];
        console.log(game1)
        return JSON.parse(JSON.stringify(game1));
    } else {
        return undefined;
    }
}

