import {respData} from "@/lib/util/resp";
import {createUserStep} from "@/lib/dal/UserStepMapper";
import IUserStep from "@/lib/model/IUserStep";


export async function PUT(req: Request) {
    const json: IUserStep = await req.json();
    return respData(await createUserStep(json));
}
