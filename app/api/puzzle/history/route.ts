import {respData} from "@/app/lib/util/resp";
import {listSudokuPuzzleById} from "@/app/lib/dal/SudokuPuzzleMapper";

export async function GET(req: Request) {
    // const {} = await req.json();
    return respData(await listSudokuPuzzleById());
}
