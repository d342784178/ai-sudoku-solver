import {PrismaClient, UserSteps, Prisma} from '@prisma/client'
import UserStepsCreateInput = Prisma.UserStepsCreateInput
import SortOrder = Prisma.SortOrder;

const prisma = new PrismaClient();

export async function createUserStep(puzzleId: number, cell: number, value: number): Promise<UserSteps> {
    return await prisma.userSteps.create({
        data: {
            puzzleId,
            cell,
            value
        } as UserStepsCreateInput,
    });
}

export async function getUserStepByPuzzleId(puzzleId: number): Promise<UserSteps[] | null> {
    return await prisma.userSteps.findMany({
        where: {puzzleId},
        orderBy: {
            createTime: SortOrder.desc
        }
    });
}


export async function getUserStepById(id: number): Promise<UserSteps | null> {
    return await prisma.userSteps.findUnique({
        where: {id},
    });
}

export async function deleteUserStepById(id: number): Promise<UserSteps> {
    return await prisma.userSteps.delete({
        where: {id},
    });
}