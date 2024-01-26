'use client';
import {useEffect, useState} from 'react';
import {useSudoku} from "@/components/hook/useSudoku";
import {Board} from "@/components/board";
import {Step} from "@/components/step";
import clsx from 'clsx';
import {Tooltip} from 'antd';
import {SoundOutlined} from '@ant-design/icons';
import {GameHelper, IPuzzle} from "@/lib/model/Puzzle";
import {aiExplain} from "@/lib/service/AiService";
import DifficultySeletor from "@/components/DifficultySeletor";
import useNextRoute from "@/components/hook/useNextRoute";


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
    const resolveGame = async () => {
        if (game) {
            const result = GameHelper.resolveGame(game.userSolution())
            if (result) {
                console.log(result)

                const language = navigator.language
                console.log('language=', language)
                const aiResult = await aiExplain(game.userSolution(), result.rowData, result.colData, result.blockData, result.row, result.col, result.value, language)

                let message = '';

                setAiOutput(true)
                for await (const chunk of aiResult) {
                    message = message + chunk;
                    setAiMessage(message)
                }
                setAiOutput(false)

                makeMove(result.row, result.col, result.value, false, null);
                // makeMove(result.index[0], result.index[1], result.value, false,result.message);
            }
        }
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
                            <button disabled={!game || game.state > 0} className="btn my-2 bg-blue-400"
                                    onClick={resolveGame}>AI Resolve
                            </button>
                        </Tooltip>
                    </div>

                    <Board makeMove={makeMove} game={game} removeUserStep={removeUserStep}/>


                </div>
                <div className="w-full max-w-md py-8 stretch  sm:max-w-3/6 sm:w-2/6 p-2">
                    <div className="my-2 min-h-3">
                        <div className="flex w-full mb-1 text-center justify-center content-center" >
                            <h3 className="text-lg font-bold text-center">AI Notice</h3>
                            {aiMessage.length > 0 && !aiOutput && <span onClick={() => {toTTS(aiMessage)}}> <SoundOutlined/></span>}
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