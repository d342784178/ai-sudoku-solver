import {respData} from "@/lib/util/resp";
import {createSudokuPuzzle, listSudokuPuzzleById, updateSudokuPuzzle} from "@/lib/dal/SudokuPuzzleMapper";


export async function PUT(req: Request) {
    const {id, puzzle, difficulty, solution, create_time, state} = await req.json();
    if (id) {
        return respData(await updateSudokuPuzzle(id, puzzle, difficulty, solution, create_time, state));
    } else {
        return respData(await createSudokuPuzzle(puzzle, difficulty, solution, create_time, state));
    }
}

export async function GET(req: Request) {
    const {} = await req.json();
    return respData(await listSudokuPuzzleById());
}
