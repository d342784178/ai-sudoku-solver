import {respData} from "@/lib/util/resp";
import {createSudokuPuzzle, updateSudokuPuzzle} from "@/lib/dal/SudokuPuzzleMapper";
import {createUserStep, deleteUserStepById} from "@/lib/dal/UserStepMapper";


export async function DELETE(
    req: Request,
    {params}: { params: { id: string } }
) {
    return respData(await deleteUserStepById(Number(params.id)));
}
