import {respData} from "@/lib/util/resp";
import {listSudokuPuzzle} from "@/lib/dal/SudokuPuzzleMapper";

export async function GET(req: Request) {
    // const {} = await req.json();
    return respData(await listSudokuPuzzle());
}
