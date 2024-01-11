import {respData} from "@/app/lib/util/resp";
import {createSudokuPuzzle, updateSudokuPuzzle} from "@/app/lib/dal/SudokuPuzzleMapper";
import {createUserStep, deleteUserStepById} from "@/app/lib/dal/UserStepMapper";


export async function DELETE(
    req: Request,
    {params}: { params: { id: string } }
) {
    return respData(await deleteUserStepById(Number(params.id)));
}
