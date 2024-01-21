import {ChatOpenAI} from "@langchain/openai";
import {ChatPromptTemplate} from "@langchain/core/prompts";
import {StringOutputParser} from "@langchain/core/output_parsers";
import _ from "lodash";

const model = new ChatOpenAI({
    openAIApiKey: process.env.OPEN_AI_KEY,
    configuration: {
        baseURL: "https://api.openai-proxy.com/v1/",
    },
});


export async function aiExplain(gameData: number[][], rowData: number[], colData: number[], blockData: number[], row: number, col: number,language:string) {
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
        "## 约束:\n" +
        // "- 专注于与数独游戏相关的数据分析和策略优化。\n" +
        // "- 在提供分析和解答时，应考虑游戏规则和特性。\n" +
        // "- 所有的分析和建议均应基于用户提供的信息，以帮助其提高解题效率和正确率。\n" +
        "- 精简你的回答,字数控制在 120 字以内!\n" +
        "\n"],
        ["user", "`{input}`"],
    ]);


    const input = `${_.join(_.flatten(gameData), ",")}
我有一个数独游戏数据如上 , 我通过回溯可得出下一步可以在第${row + 1}行第${col + 1}列位置填3. 
其所在第 ${row + 1} 行数据为: ${_.join(rowData, ",")}
所在第 ${col + 1} 列数据为: ${_.join(colData, ",")}
其所在 3*3 块数据为: ${_.join(blockData, ",")} 

请你帮我按照人工推算的思路,分析为什么做这一步, 给出你的思路.
 
注意1: 精简你的回答,字数控制在 120 字以内!
注意2: 请以语言:${language},返回你的回答
`;
    const llmChain = prompt.pipe(model).pipe(new StringOutputParser());
    const result = await llmChain.stream({
        input: input,
    });
    return result
}

export async function aiTTs(gameData: number[][], rowData: number[], colData: number[], blockData: number[], row: number, col: number,language:string) {
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
        "## 约束:\n" +
        // "- 专注于与数独游戏相关的数据分析和策略优化。\n" +
        // "- 在提供分析和解答时，应考虑游戏规则和特性。\n" +
        // "- 所有的分析和建议均应基于用户提供的信息，以帮助其提高解题效率和正确率。\n" +
        "- 精简你的回答,字数控制在 120 字以内!\n" +
        "\n"],
        ["user", "`{input}`"],
    ]);


    const input = `${_.join(_.flatten(gameData), ",")}
我有一个数独游戏数据如上 , 我通过回溯可得出下一步可以在第${row + 1}行第${col + 1}列位置填3. 
其所在第 ${row + 1} 行数据为: ${_.join(rowData, ",")}
所在第 ${col + 1} 列数据为: ${_.join(colData, ",")}
其所在 3*3 块数据为: ${_.join(blockData, ",")} 

请你帮我按照人工推算的思路,分析为什么做这一步, 给出你的思路.
 
注意1: 精简你的回答,字数控制在 120 字以内!
注意2: 请以语言:${language},返回你的回答
`;
    const llmChain = prompt.pipe(model).pipe(new StringOutputParser());
    const result = await llmChain.stream({
        input: input,
    });
    return result
}