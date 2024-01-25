import {Prisma, PrismaClient,} from '@prisma/client'
import {IPuzzle} from "@/lib/model/Puzzle";
import SortOrder = Prisma.SortOrder;


const prisma = new PrismaClient();

export async function createSudokuPuzzle(p: IPuzzle): Promise<IPuzzle> {
    const result = await prisma.sudoku_puzzle.create({
        data: {
            puzzle: p.puzzle,
            difficulty: p.difficulty,
            solution: p.solution,
            create_time: p.create_time,
            state: p.state,
        },
    });
    return result;
}

export async function updateSudokuPuzzle(p: IPuzzle): Promise<IPuzzle> {
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
    return result;
}

export async function getSudokuPuzzleById(id: string): Promise<IPuzzle | null> {
    const result = await prisma.sudoku_puzzle.findUnique({
        where: {id},
    });
    return result;
}

export async function deleteSudokuPuzzleById(id: string): Promise<IPuzzle | null> {
    const result = await prisma.sudoku_puzzle.delete({
        where: {id},
    });
    return result
}


export async function listSudokuPuzzle(): Promise<IPuzzle[]> {
    const result = await prisma.sudoku_puzzle.findMany({
        where: {},
        orderBy: {
            create_time: SortOrder.desc
        },
        take: 10,
    });
    return result;
}
