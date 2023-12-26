import {PrismaClient, UserSteps} from '@prisma/client'

const prisma = new PrismaClient();

export async function createUserStep(puzzleId: number, stepNumber: number, cell: number, value: number): Promise<UserSteps> {
    return await prisma.userSteps.create({
        data: {
            puzzleId,
            stepNumber,
            cell,
            value
        },
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