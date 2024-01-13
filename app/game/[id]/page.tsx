import React from "react";
import {getSudokuPuzzleById} from "@/lib/dal/SudokuPuzzleMapper";
import {getUserStepByPuzzleId} from "@/lib/dal/UserStepMapper";
import {Game, UserStep} from "@/lib/model/model";
import {GamePlace} from "@/components/gamePlace";
import {Header} from "@/components/Header";

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
    let userStepsJsonArray: {
        id: number, puzzle_id: string,
        cell: number, value: number, create_time: Date | string
    }[] = await getUserStepByPuzzleId(id);
    if (gameJsonObject) {
        let game1 = Game.parse(gameJsonObject)
        game1.userSteps = userStepsJsonArray ? userStepsJsonArray.map(userStepJson => UserStep.parse(userStepJson)) : [];
        console.log(game1)
        return JSON.parse(JSON.stringify(game1));
    } else {
        return undefined;
    }
}

