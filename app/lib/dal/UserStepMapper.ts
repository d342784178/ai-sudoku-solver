import {PrismaClient, Prisma} from '@prisma/client'
import SortOrder = Prisma.SortOrder;

const prisma = new PrismaClient();

export async function createUserStep(puzzle_id: number, cell: number, value: number, create_time: Date) {
    return await prisma.user_step.create({
        data: {
            puzzle_id,
            cell,
            value,
            create_time,
        },
    });
}

export async function getUserStepByPuzzleId(puzzle_id: number) {
    return await prisma.user_step.findMany({
        where: {puzzle_id},
        orderBy: {
            create_time: SortOrder.desc
        }
    });
}


export async function getUserStepById(id: number) {
    return await prisma.user_step.findUnique({
        where: {id},
    });
}

export async function deleteUserStepById(id: number) {
    return await prisma.user_step.delete({
        where: {id},
    });
}