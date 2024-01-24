import {respData} from "@/lib/util/resp";
import {createSudokuPuzzle, listSudokuPuzzle, updateSudokuPuzzle} from "@/lib/dal/SudokuPuzzleMapper";
import {IPuzzle} from "@/lib/model/Puzzle";


export async function PUT(req: Request) {
    const json: IPuzzle = await req.json();
    if (json.id) {
        return respData(await updateSudokuPuzzle(json));
    } else {
        return respData(await createSudokuPuzzle(json));
    }
}

export async function GET(req: Request) {
    const {} = await req.json();
    return respData(await listSudokuPuzzle());
}
