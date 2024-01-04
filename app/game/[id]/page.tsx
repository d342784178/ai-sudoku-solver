import React from "react";
import {getSudokuPuzzleById} from "@/app/lib/dal/SudokuPuzzleMapper";
import {getUserStepByPuzzleId} from "@/app/lib/dal/UserStepMapper";
import {Game, UserStep} from "@/app/lib/model/model";
import {Board} from "@/app/ui/board";

export default async function Home({params}: { params: { id: string } }) {
    const game = await fetchGameHistory(params.id)
    return (
        <main>
            <div>
            </div>
            <Board currentGame={game}/>
        </main>
    )
}

async function fetchGameHistory(id: string) {
    let gameJsonObject = await getSudokuPuzzleById(id);
    let userStepsJsonArray = await getUserStepByPuzzleId(id);
    if (gameJsonObject) {
        let game1 = Game.parse(gameJsonObject)
        game1.userSteps = userStepsJsonArray ? userStepsJsonArray.map(userStepJson => UserStep.parse(userStepJson)) : [];
        console.log(game1)
        return JSON.parse(JSON.stringify(game1));
    } else {
        return undefined;
    }
}

