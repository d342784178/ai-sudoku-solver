'use client';
import {useCallback, useState} from 'react';
import {useCallbackState} from "@/components/hook/useCallbackState";
import _ from "lodash";
import {sudoku} from "@/lib/sudoku";
import {message} from "antd";
import {Puzzle} from "@/lib/model/Puzzle";
import {ProxyHub} from "@/app/api/proxy/route";

export function useSudoku() {
    //游戏数据
    const [game, setGame] = useCallbackState<Puzzle>();
    const [gameLoading, setGameLoading] = useState(false);
    const [moveLoading, setMoveLoading] = useState(false);
    const [messageApi, msgContextHolder] = message.useMessage();

    const newGame = useCallback((difficulty:number=1) => {
        let game1 = innerNewGame(difficulty);
        setGame(game1);

        setGameLoading(true)
        ProxyHub.putPuzzle.invoke(game1).then(async resp => {
            game1.id = resp.id;
            console.log(game1)
            setGameLoading(false)
        });

    }, [setGame]);

    const recoverGame = useCallback((game: Puzzle) => {
        setGame(game);
    }, [setGame]);

    const makeMove = useCallback((row: number, col: number, value: number, by_user = true, message: string | null) => {
        if (game) {
            if (!game.id) {
                console.log(game)
                messageApi.info('游戏正在保存到服务端,请稍后进行操作');
                return;
            }
            let userStep = game.addUserStep(row * 9 + col, value, by_user, message);
            //更新game数据
            let newGame = Object.assign(Object.create(Object.getPrototypeOf(game)), game);
            setGame(newGame);

            setMoveLoading(true)
            ProxyHub.createUserStep.invoke(userStep).then(async (resp) => {
                userStep.id = resp.id;
                setMoveLoading(false)
            });

            //游戏结束
            if (game.state !== 0) {
                ProxyHub.putPuzzle.invoke(game).then(async resp => {
                    game.id = resp.id;
                });
            }
        }
    }, [game]);
    const removeUserStep = useCallback((userStepIndex: number) => {
        if (game) {
            const originGameState = game.state
            let userStep = game.removeUserStep(userStepIndex);
            //更新game数据
            let newGame = Object.assign(Object.create(Object.getPrototypeOf(game)), game);
            console.log(newGame)
            setGame(newGame);

            setMoveLoading(true)
            // @ts-ignore
            ProxyHub.deleteUserStepById.invoke(userStep.id).then(async (resp) => {
                setMoveLoading(false)
            });
            if (originGameState !== 0) {//恢复到进行中状态
                ProxyHub.putPuzzle.invoke(game).then(async resp => {
                    game.id = resp.id;
                });
            }
        }
    }, [game]);

    const saveAsGame = useCallback((puzzle: number[][]) => {
        return new Promise<Puzzle | string>((resolve, reject) => {
            if (_.filter(_.flatten(puzzle), (value) => value !== -1).length < 60) {
                messageApi.warning("出题必须填充元素数量超过 60")
                reject("出题必须填充元素数量超过 60")
                return;
            }
            let solution = _.cloneDeep(puzzle);
            if (Puzzle.haveResolution(solution)) {
                let game = new Puzzle(puzzle, 6, solution, new Date());

                ProxyHub.putPuzzle.invoke(game).then(async resp => {
                    game.id = resp.id;
                    resolve(game)
                });
                console.log(game)
            } else {
                messageApi.warning("此题无解,请检查题目数据")
                reject("此题无解,请检查题目数据")
            }
        })
    }, [setGame]);
    return {
        game,//游戏数据
        gameLoading,
        moveLoading,
        newGame,//创建新游戏
        makeMove,//用户操作
        recoverGame,//创建新游戏
        saveAsGame,//保存为新游戏,
        msgContextHolder,
        removeUserStep
    };
}


function innerNewGame(difficulty: number = 1) {
    let puzzle = sudoku.init();
    let solution = _.cloneDeep(puzzle);
    puzzle = sudoku.digHole(puzzle, difficulty+2)

    let game = new Puzzle(puzzle, difficulty, solution, new Date());
    return game;
}
