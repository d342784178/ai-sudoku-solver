'use client';
import {useEffect, useState} from 'react';
import {useSudoku} from "@/components/hook/useSudoku";
import {Game} from "@/lib/model/model";
import {Board} from "@/components/board";
import {aiExplain} from "@/lib/ai";
import {Step} from "@/components/step";
import clsx from 'clsx';
import {Tooltip} from 'antd';
import {SoundOutlined} from '@ant-design/icons';


export function GamePlace({currentGame}: {
    currentGame?: {
        id: string,
        puzzle: string
        difficulty: number
        solution: string
        create_time: Date
        userSteps: {
            id: number, puzzle_id: string,
            cell: number, value: number, create_time: Date | string, by_user: boolean, message: string|null
        }[],
        state: number
    }
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
            let game1 = Game.parse(currentGame);
            console.log(game1)
            recoverGame(game1)
        }
    }, [currentGame, recoverGame]);


    const [aiMessage, setAiMessage] = useState('')
    const resolveGame = async () => {
        if (game) {
            const result = Game.resolve(game.userSolution())
            if (result) {
                console.log(result)

                const language = navigator.language
                console.log('language=',language)
                const aiResult = await aiExplain(game.userSolution(), result.rowData, result.colData, result.blockData, result.row, result.col,language)

                let message = '';
                for await (const chunk of aiResult) {
                    message = message + chunk;
                    setAiMessage(message)
                }

                makeMove(result.row, result.col, result.num, false,null);
                // makeMove(result.index[0], result.index[1], result.value, false,result.message);
            }
        }
    }

    const toTTS = async (message:string) => {
        const msg = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(msg);
    }


    return (
        <main>
            <div className={clsx("flex flex-col sm:flex-row md:mt-10 content-center justify-center")}>
                {msgContextHolder}
                <div className="flex flex-col items-center justify-center md:px-5 lg:px-0 rounded-xl  w-full sm:max-w-3/6 sm:w-3/6 p-2">

                    <div className="flex justify-center items-center">
                        {currentGame ? (
                            <div/>
                        ) : (
                            <div>
                                <button className="btn my-2 bg-blue-400 mr-2" onClick={newGame}>New Game</button>
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
                    <div className="my-2">
                        <h3 className="text-lg font-bold  mb-1 w-full text-center">AI Notice</h3>
                        <span>{aiMessage}</span>
                        {aiMessage.length>0&& <span onClick={() => toTTS(aiMessage)}><SoundOutlined /></span>}
                    </div>
                    <div className="my-2">
                        <Step userSteps={game && game.userSteps}/>
                    </div>
                </div>
            </div>
        </main>

    )
}
