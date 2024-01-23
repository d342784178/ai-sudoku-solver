import {Prisma, PrismaClient,} from '@prisma/client'
import {IPuzzle} from "@/lib/model/Puzzle";
import SortOrder = Prisma.SortOrder;


const prisma = new PrismaClient();

export async function createSudokuPuzzle(puzzle: string, difficulty: number, solution: string, create_time: Date, state: number) {
    const result = await prisma.sudoku_puzzle.create({
        data: {
            puzzle,
            difficulty,
            solution,
            create_time,
            state,
        },
    });
    return result as IPuzzle;
}

export async function updateSudokuPuzzle(id: string, puzzle?: string, difficulty?: number, solution?: string, create_time?: Date, state?: number) {
    const result = await prisma.sudoku_puzzle.update({
        data: {
            puzzle,
            difficulty,
            solution,
            create_time,
            state,
        },
        where: {id},
    });
    return result as IPuzzle;
}

export async function getSudokuPuzzleById(id: string) {
    const result = await prisma.sudoku_puzzle.findUnique({
        where: {id},
    });
    return result as IPuzzle;
}

export async function deleteSudokuPuzzleById(id: string) {
    const result = await prisma.sudoku_puzzle.delete({
        where: {id},
    });
    return result as IPuzzle
}


export async function listSudokuPuzzleById() {
    const result = await prisma.sudoku_puzzle.findMany({
        where: {},
        orderBy: {
            create_time: SortOrder.desc
        }
    });
    return result as IPuzzle[];
}
