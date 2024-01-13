import {respData} from "@/lib/util/resp";
import {listSudokuPuzzleById} from "@/lib/dal/SudokuPuzzleMapper";

export async function GET(req: Request) {
    // const {} = await req.json();
    return respData(await listSudokuPuzzleById());
}
