export default interface UserStep {
    id?: number;
    puzzle_id?: string;
    cell: number;
    value: number
    by_user: boolean;
    message: String | null;
    create_time: Date;
}

function createUserStep(cell: number, value: number, create_time: Date, by_user = true, message: String | null): UserStep {
    return {
        cell,
        value,
        create_time,
        by_user,
        message
    } as UserStep
}

function parseUserStep(d: {
    id: number, puzzle_id: string,
    cell: number, value: number, create_time: Date | string, by_user: boolean, message: string | null
}): UserStep {
    let userStep = createUserStep(d.cell, d.value, d.create_time instanceof Date ? d.create_time : new Date(d.create_time), d.by_user, d.message);
    userStep.id = d.id;
    userStep.puzzle_id = d.puzzle_id;

    return userStep;
}

export const UserStepHelper = {createUserStep, parseUserStep}
