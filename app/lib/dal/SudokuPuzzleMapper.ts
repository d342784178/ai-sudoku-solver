import {Prisma, PrismaClient,} from '@prisma/client'
import SortOrder = Prisma.SortOrder;


const prisma = new PrismaClient();

export async function createSudokuPuzzle(puzzle: string, difficulty: number, solution: string, create_time: Date, state: number) {
    return await prisma.sudoku_puzzle.create({
        data: {
            puzzle,
            difficulty,
            solution,
            create_time,
            state,
        },
    });
}

export async function updateSudokuPuzzle(id: number, puzzle?: string, difficulty?: number, solution?: string, create_time?: Date, state?: number) {
    return await prisma.sudoku_puzzle.update({
        data: {
            puzzle,
            difficulty,
            solution,
            create_time,
            state,
        },
        where: {id},
    });
}

export async function getSudokuPuzzleById(id: number) {
    return await prisma.sudoku_puzzle.findUnique({
        where: {id},
    });
}

export async function deleteSudokuPuzzleById(id: number) {
    return await prisma.sudoku_puzzle.delete({
        where: {id},
    });
}


export async function listSudokuPuzzleById() {
    return await prisma.sudoku_puzzle.findMany({
        where: {},
        orderBy: {
            create_time: SortOrder.desc
        }
    });
}
