import {aiExplain} from "@/lib/service/AiService";

export async function POST(req: Request) {

    try {
        const reqJson = await req.json()
        const stream = await aiExplain(reqJson)
        console.log(stream)
        return new Response(stream)
    } catch (error: any) {
        if (error.response) {
            console.log(error.response.status)
            console.log(error.response.data)
        } else {
            console.log(error.message)
        }
    }
}


