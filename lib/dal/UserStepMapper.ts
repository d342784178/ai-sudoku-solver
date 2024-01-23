import {Prisma, PrismaClient} from '@prisma/client'
import UserStep from "@/lib/model/UserStep";
import SortOrder = Prisma.SortOrder;

const prisma = new PrismaClient();


export async function createUserStep(puzzle_id: string, cell: number, value: number, create_time: Date, by_user = true, message?: string) {
    const result = await prisma.user_step.create({
        data: {
            puzzle_id,
            cell,
            value,
            by_user,
            message,
            create_time,
        },
    });
    return result as UserStep;
}

export async function getUserStepByPuzzleId(puzzle_id: string) {
    const result = await prisma.user_step.findMany({
        where: {puzzle_id},
        orderBy: {
            create_time: SortOrder.asc
        }
    });

    return result as UserStep[];
}


export async function getUserStepById(id: number) {
    const result = await prisma.user_step.findUnique({
        where: {id},
    });
    return result as UserStep;
}

export async function deleteUserStepById(id: number) {
    const result = await prisma.user_step.delete({
        where: {id},
    });
    return result as UserStep;
}