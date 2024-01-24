import {Prisma, PrismaClient,} from '@prisma/client'
import {IPuzzle} from "@/lib/model/Puzzle";
import SortOrder = Prisma.SortOrder;


const prisma = new PrismaClient();

export async function createSudokuPuzzle(p: IPuzzle) {
    const result = await prisma.sudoku_puzzle.create({
        data: {
            puzzle: p.puzzle,
            difficulty: p.difficulty,
            solution: p.solution,
            create_time: p.create_time,
            state: p.state,
        },
    });
    return result as IPuzzle;
}

export async function updateSudokuPuzzle(p: IPuzzle) {
    const result = await prisma.sudoku_puzzle.update({
        data: {
            puzzle: p.puzzle,
            difficulty: p.difficulty,
            solution: p.solution,
            create_time: p.create_time,
            state: p.state,
        },
        where: {id: p.id},
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
