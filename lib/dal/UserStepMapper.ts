import {Prisma, PrismaClient} from '@prisma/client'
import IUserStep from "@/lib/model/IUserStep";
import SortOrder = Prisma.SortOrder;

const prisma = new PrismaClient();


export async function createUserStep(p: IUserStep): Promise<IUserStep> {
    const result = await prisma.user_step.create({
        data: {
            puzzle_id: p.puzzle_id,
            cell: p.cell,
            value: p.value,
            by_user: p.by_user,
            message: p.message,
            create_time: p.create_time,
        },
    });
    return result;
}

export async function getUserStepByPuzzleId(puzzle_id: string): Promise<IUserStep[] | null> {
    const result = await prisma.user_step.findMany({
        where: {puzzle_id},
        orderBy: {
            create_time: SortOrder.asc
        }
    });

    return result;
}


export async function getUserStepById(id: number): Promise<IUserStep | null> {
    const result = await prisma.user_step.findUnique({
        where: {id},
    });
    return result;
}

export async function deleteUserStepById(id: number): Promise<IUserStep | null> {
    const result = await prisma.user_step.delete({
        where: {id},
    });
    return result;
}