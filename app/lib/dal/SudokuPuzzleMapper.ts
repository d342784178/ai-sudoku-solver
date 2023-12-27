import {Prisma, PrismaClient, SudokuPuzzles,} from '@prisma/client'
import SortOrder = Prisma.SortOrder;
import SudokuPuzzlesCreateInput = Prisma.SudokuPuzzlesCreateInput;


const prisma = new PrismaClient();

export async function createSudokuPuzzle(puzzle: string, difficulty: string, solution: string, createTime: Date): Promise<SudokuPuzzles> {
    return await prisma.sudokuPuzzles.create({
        data: {
            puzzle,
            difficulty,
            solution,
            createTime,
        } as SudokuPuzzlesCreateInput,
    });
}

export async function getSudokuPuzzleById(id: number): Promise<SudokuPuzzles | null> {
    return await prisma.sudokuPuzzles.findUnique({
        where: {id},
    });
}

export async function deleteSudokuPuzzleById(id: number): Promise<SudokuPuzzles> {
    return await prisma.sudokuPuzzles.delete({
        where: {id},
    });
}


export async function listSudokuPuzzleById(): Promise<SudokuPuzzles[]> {
    return await prisma.sudokuPuzzles.findMany({
        where: {},
        orderBy: {
            createTime: SortOrder.desc
        }
    });
}
