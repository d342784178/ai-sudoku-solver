import {respData} from "@/app/lib/util/resp";
import {createSudokuPuzzle, listSudokuPuzzleById} from "@/app/lib/dal/SudokuPuzzleMapper";


export async function PUT(req: Request) {
    const {puzzle, difficulty, solution, create_time, state} = await req.json();
    return respData(await createSudokuPuzzle(puzzle, difficulty, solution, create_time, state));
}

export async function GET(req: Request) {
    const {} = await req.json();
    return respData(await listSudokuPuzzleById());
}
