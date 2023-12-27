import {respData} from "@/app/lib/util/resp";
import {createSudokuPuzzle} from "@/app/lib/dal/SudokuPuzzleMapper";
import {createUserStep} from "@/app/lib/dal/UserStepMapper";


export async function PUT(req: Request) {
    const {puzzle_id, row, col, value, create_time} = await req.json();
    const cell = row * 9 + col;
    return respData(await createUserStep(puzzle_id, cell, value,create_time));
}
