import React from 'react';
import clsx from "clsx";


const versionDatas = [
    {
        versions: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        keyword: "正常数独",
        tooltip: "提供基础的数独游戏功能，包括9x9的格子展示，随机题目生成，以及玩家答题的正确性判断。"
    },
    {
        versions: [2, 3, 4, 5, 6, 7, 8, 9],
        keyword: "后端保存功能",
        tooltip: "记录并存储每个题目及其ID，保存玩家每一步的游戏记录和游戏结果。"
    },
    {
        versions: [3, 4, 5, 6, 7, 8, 9],
        keyword: "游戏重放",
        tooltip: "增加了游戏保存并下次继续，以及已完成游戏的步骤回放功能。"
    },
    {
        versions: [4, 5, 6, 7, 8, 9],
        keyword: "用户题目录入",
        tooltip: "允许用户手动输入数独题目并保存，以便后续游戏使用。"
    },
    {
        versions: [5, 6, 7, 8, 9],
        keyword: "JS自动解题",
        tooltip: "提供一键自动答题功能，通过JS实现数独解答算法。"
    },
    {
        versions: [6, 7, 8, 9],
        keyword: "GPT讲解",
        tooltip: "利用GPT接口，讲解自动解题算法的答题逻辑和原因。"
    },
    {
        versions: [7, 8, 9],
        keyword: "语音讲解",
        tooltip: "通过接入TTS，将GPT解题讲解实现语音输出。"
    },
    {
        versions: [8, 9],
        keyword: "视频合成",
        tooltip: "结合以上功能，录制并合成包含数独解题及讲解的视频。"
    },
    {
        versions: [9],
        keyword: "OCR识别",
        tooltip: "提供上传或拍摄照片输入数独题目，通过OCR识别并保存题目及其ID。"
    }
]

type PropTypes = {
    currentVersion: number
}

const VersionTable: React.FC<PropTypes> = ({currentVersion}) => {
    let cols = Array.from({length: versionDatas.length});

    return (
        <table className='w-full text-center  bg-gray-100 rounded-lg shadow'>
            <thead>
            <tr>
                <th className="p-2"/>
                {cols.map((version, index) => {
                    let columnHighlight = currentVersion === index + 1 ? 'bg-blue-50 ' : 'bg-gray-100';
                    return (
                        <th key={String(index + 1)}
                            className={clsx(`p-2`, columnHighlight)}>Version{String(index + 1)}</th>
                    );
                })}
            </tr>
            </thead>
            <tbody>
            {versionDatas.map((versionData) => (
                <tr key={versionData.keyword}>

                    <td className='p-2'>
                        <div className="group flex relative">
                            <span> {versionData.keyword}</span>
                            <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2
        -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">{versionData.tooltip}</span>
                        </div>
                    </td>
                    {cols.map((version, index) => {
                        const item = versionData.versions.find(
                            (version) => version === index + 1,
                        )

                        const hasKeyword = Boolean(item)
                        const color = hasKeyword ? 'text-green-600' : 'text-gray-400'
                        const symbol = hasKeyword ? '✓' : '×'
                        let cellHighlight = currentVersion === index + 1 ? 'bg-blue-50' : 'bg-gray-100';

                        return (
                            <td key={`${versionData.keyword}-${version}`} className={`p-2 ${color} ${cellHighlight}`}
                                data-tip={versionData.tooltip || ''}>
                                {symbol}
                            </td>
                        )
                    })}
                </tr>
            ))}
            </tbody>
            {/*<ReactTooltip effect="solid" />*/}
        </table>
    )
}

export default VersionTable
