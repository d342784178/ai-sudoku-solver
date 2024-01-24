export default interface IUserStep {
    id?: number;
    puzzle_id: string;
    cell: number;
    value: number
    by_user: boolean;
    message: string | null;
    create_time: Date;
}

function createUserStep(cell: number, value: number, create_time: Date, by_user = true, message: String | null): IUserStep {
    return {
        cell,
        value,
        create_time,
        by_user,
        message
    } as IUserStep
}

export const UserStepHelper = {createUserStep}
