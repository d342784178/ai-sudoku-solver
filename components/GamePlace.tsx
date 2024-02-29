'use client';
import {useEffect, useState} from 'react';
import {useSudoku} from "@/components/hook/useSudoku";
import {Board} from "@/components/board";
import {Step} from "@/components/step";
import clsx from 'clsx';
import {Tooltip} from 'antd';
import {SoundOutlined} from '@ant-design/icons';
import {GameHelper, IPuzzle} from "@/lib/model/Puzzle";
import DifficultySeletor from "@/components/DifficultySeletor";
import useNextRoute from "@/components/hook/useNextRoute";
import {useSession} from "next-auth/react"
import {IterableReadableStream} from '@/lib/util/commonUtil';

export function GamePlace({currentGame}: {
    currentGame?: IPuzzle
}) {
    const {
        game,
        gameLoading,
        moveLoading,
        newGame,
        makeMove,
        recoverGame,
        msgContextHolder,
        removeUserStep,
    } = useSudoku();

    useEffect(() => {
        if (currentGame) {
            let game1 = GameHelper.parseGame(currentGame);
            console.log(game1)
            recoverGame(game1)
        }
    }, [currentGame, recoverGame]);

    const [aiOutput, setAiOutput] = useState<boolean>(false)

    const [aiMessage, setAiMessage] = useState('')

    const {data: session, update} = useSession()

    useEffect(() => {
        const visibilityHandler = () => document.visibilityState === "visible" && update()
        window.addEventListener("visibilitychange", visibilityHandler, false)
        return () => window.removeEventListener("visibilitychange", visibilityHandler, false)
    }, [update])
    const resolveGame = async () => {
        // if (session) {
        const result = GameHelper.resolveGame(game!.userSolution())
        if (result) {
            console.log(result)

            const language = navigator.language
            console.log('language=', language)

            setAiOutput(true)
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'aplication/json',
                },
                body: JSON.stringify({
                    gameData: game!.userSolution(),
                    rowData: result.rowData, colData: result.colData, blockData: result.blockData,
                    row: result.row, col: result.col, value: result.value,
                    language: language
                }),
            })
            const responseBody = response.body;
            if (!responseBody) {
                return;
            }
            const reader = responseBody.getReader();
            var message = ''
            // 创建文本解码器并获取可读流
            const decoder = new TextDecoder();
            for await (const chunk of new IterableReadableStream(reader)) {
                if (chunk) {
                    // 解码并分割事件
                    const text = decoder.decode(chunk);
                    const events = text.split('\n');
                    message += text
                    setAiMessage(message)
                }
            }
            setAiOutput(false)
            makeMove(result.row, result.col, result.value, false, null);
        }
        // } else {
        //     // signIn();
        //     window.open(`/api/auth/signin?`, '_blank');
        // }
    }

    const toTTS = async (message: string) => {
        const language = navigator.language
        let u = new SpeechSynthesisUtterance();
        u.lang = language;
        u.text = message;
        window.speechSynthesis.speak(u);
    }

    let {router, pathname, queryParams, queryPut} = useNextRoute();

    const difficultyChange = (difficulty: number) => {
        router.push(pathname + '?' + queryPut('difficulty', difficulty.toString()))
        newGame(difficulty)
    }


    return (
        <main>
            <div className={clsx("flex flex-col sm:flex-row md:mt-10 content-center justify-center")}>
                {msgContextHolder}
                <div
                    className="flex flex-col items-center justify-center md:px-5 lg:px-0 rounded-xl  w-full sm:max-w-3/6 sm:w-3/6 p-2">

                    <div className="flex justify-center items-center">
                        {currentGame ? (
                            <div/>
                        ) : (
                            <div className="flex justify-center items-center">
                                <DifficultySeletor onDifficultyChange={difficultyChange}
                                                   defaultDiffuculty={queryParams.get("difficulty") ? Number(queryParams.get("difficulty")) : 1}/>
                                <button className="btn my-2 bg-blue-400 mr-2"
                                        onClick={() => newGame(queryParams.get("difficulty") ? Number(queryParams.get("difficulty")) : 1)}>
                                    New Game
                                </button>
                                {/*<Link className="mx-5 btn my-2 bg-yellow-400" href="/game/create">Define Your Game</Link>*/}
                            </div>
                        )}
                        <Tooltip title={'Figure out the next step in the game and use ai to explain why'}>
                            <button disabled={!game || game.state > 0 || aiOutput} className="btn my-2 bg-blue-400"
                                    onClick={resolveGame}>AI Resolve
                            </button>
                        </Tooltip>
                    </div>

                    <Board makeMove={makeMove} game={game} removeUserStep={removeUserStep}/>


                </div>
                <div className="w-full max-w-md py-8 stretch  sm:max-w-3/6 sm:w-2/6 p-2">
                    <div className="my-2 min-h-3">
                        <div className="flex w-full mb-1 text-center justify-center content-center">
                            <h3 className="text-lg font-bold text-center">AI Notice</h3>
                            {aiMessage.length > 0 && !aiOutput && <span onClick={() => {
                                toTTS(aiMessage)
                            }}> <SoundOutlined/></span>}
                        </div>

                        <span>{aiMessage}</span>
                    </div>
                    <div className="my-2">
                        <Step userSteps={game && game.userSteps}/>
                    </div>
                </div>
            </div>
        </main>

    )
}
