import {respData} from "@/app/lib/util/resp";
import {createSudokuPuzzle, getSudokuPuzzleById, listSudokuPuzzleById} from "@/app/lib/dal/SudokuPuzzleMapper";


export async function PUT(req: Request) {
    const {puzzle, difficulty, solution, createTime} = await req.json();
    return respData(await createSudokuPuzzle(puzzle, difficulty, solution, createTime));
}

export async function GET(req: Request) {
    const {} = await req.json();
    return respData(await listSudokuPuzzleById());
}
