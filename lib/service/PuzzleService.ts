import {createSudokuPuzzle, getSudokuPuzzleById, updateSudokuPuzzle} from "@/lib/dal/SudokuPuzzleMapper";
import {getUserStepByPuzzleId} from "@/lib/dal/UserStepMapper";
import {GameHelper, IPuzzle} from "@/lib/model/Puzzle";

export async function loadPuzzle(id: string) {
    let gameJsonObject = await getSudokuPuzzleById(id);
    let userStepsJsonArray = await getUserStepByPuzzleId(id);
    if (gameJsonObject) {
        let game1 = GameHelper.parseGame(gameJsonObject)
        game1.userSteps = userStepsJsonArray ? userStepsJsonArray : [];
        return game1;
    } else {
        return undefined;
    }
}

export async function putPuzzle(puzzle: IPuzzle) {
    if (puzzle.id) {
        return await updateSudokuPuzzle(puzzle);
    } else {
        return await createSudokuPuzzle(puzzle);
    }
}