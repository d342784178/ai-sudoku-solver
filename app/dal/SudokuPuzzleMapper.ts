import {PrismaClient, SudokuPuzzles} from '@prisma/client'

const prisma = new PrismaClient();

export async function createSudokuPuzzle(puzzle: string, difficulty: string, solution: string): Promise<SudokuPuzzles> {
    return await prisma.sudokuPuzzles.create({
        data: {
            puzzle,
            difficulty,
            solution
        },
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
