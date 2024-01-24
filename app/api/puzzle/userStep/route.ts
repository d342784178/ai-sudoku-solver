import {respData} from "@/lib/util/resp";
import {createUserStep} from "@/lib/dal/UserStepMapper";
import UserStep from "@/lib/model/UserStep";


export async function PUT(req: Request) {
    const json: UserStep = await req.json();
    return respData(await createUserStep(json));
}
