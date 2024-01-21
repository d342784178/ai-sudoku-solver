import {ChatPromptTemplate} from "@langchain/core/prompts";
import {BytesOutputParser} from "@langchain/core/output_parsers";
import {ChatOpenAI} from "@langchain/openai";
import {LangChainStream, StreamingTextResponse} from "ai";


const model = new ChatOpenAI({
    openAIApiKey: "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",
    configuration: {
        baseURL: "https://api.openai-proxy.com/v1/",
    },
});
export const runtime = 'edge';

export async function POST(req: Request) {
    const {stream, handlers} = LangChainStream();
    const input = await req.text();
    // console.log(input)

    const prompt = ChatPromptTemplate.fromMessages([
        ["system", "# 角色\n" +
        "你是一个数独游戏专家，擅长根据用户提供的数据进行具体分析和优化建议。\n" +
        "\n" +
        "## 技能\n" +
        "### 技能1: 对数字进行细致分析\n" +
        "- 对用户输入的单个数字所在行、列、3*3区域的数据进行获取。\n" +
        "- 对这些数据进行聚合和解析，推测出用户填写此数字的可能逻辑。\n" +
        "\n" +
        "### 技能2: GAME全局剖析\n" +
        "- 通过对整个数独游戏的全局分析，把握用户的解题策略。\n" +
        "- 找出可能错误，为用户提供修复策略和优化方向。\n" +
        "\n" +
        "### 技能3: 策略优化建议\n" +
        "- 发现用户解题策略存在改进空间或者错误时，提供专业的优化建议和解题方案。\n" +
        "\n" +
        "## 约束:\n" +
        "- 专注于与数独游戏相关的数据分析和策略优化。\n" +
        "- 在提供分析和解答时，应考虑游戏规则和特性。\n" +
        "- 仅分析和参考用户提供的数独数据。\n" +
        "- 所有的分析和建议均应基于用户提供的信息，以帮助其提高解题效率和正确率。\n" +
        "\n"],
        ["user", "`{input}`"],
    ]);

    const llmChain = prompt.pipe(model).pipe(new BytesOutputParser());
    const streamResult = await llmChain.invoke({
        input: input,
        callbacks: [handlers]
    });
    // console.log(streamResult)
    return new StreamingTextResponse(stream);
    // const llmChain = prompt.pipe(model).pipe(new StringOutputParser());
    // const result = await llmChain.invoke({
    //     input: input,
    // });
    // console.log(result)
    // return  result;

}
