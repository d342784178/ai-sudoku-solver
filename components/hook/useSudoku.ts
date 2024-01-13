'use client';
import {useCallback, useState} from 'react';
import {useCallbackState} from "@/components/hook/useCallbackState";
import _ from "lodash";
import {Game} from "@/lib/model/model";
import {sudoku} from "@/lib/sudoku";
import {message} from "antd";

export function useSudoku() {
    //游戏数据
    const [game, setGame] = useCallbackState<Game>();
    const [gameLoading, setGameLoading] = useState(false);
    const [moveLoading, setMoveLoading] = useState(false);
    const [messageApi, msgContextHolder] = message.useMessage();

    const newGame = useCallback(() => {
        let game1 = innerNewGame();
        setGame(game1);

        setGameLoading(true)
        fetch("/api/puzzle", {
            method: "PUT",
            body: JSON.stringify(game1),
        }).then(async resp => {
            if (resp.ok) {
                const res = await resp.json();
                if (res.data) {
                    game1.id = res.data.id;
                    console.log(game1)
                }
            }
            setGameLoading(false)
        });

    }, [setGame]);

    const recoverGame = useCallback((game: Game) => {
        setGame(game);
    }, [setGame]);

    const makeMove = useCallback((row: number, col: number, value: number) => {
        if (game) {
            if (!game.id) {
                console.log(game)
                messageApi.info('游戏正在保存到服务端,请稍后进行操作');
                return;
            }
            let userStep = game.addUserStep(row * 9 + col, value);
            //更新game数据
            let newGame = Object.assign(Object.create(Object.getPrototypeOf(game)), game);
            setGame(newGame);

            setMoveLoading(true)
            fetch("/api/puzzle/userStep", {
                method: "PUT",
                body: JSON.stringify(userStep),
            }).then(async (resp) => {
                if (resp.ok) {
                    const res = await resp.json();
                    if (res.data) {
                        userStep.id = res.data.id;
                    }
                }
                setMoveLoading(false)
            });

            //游戏结束
            if (game.state !== 0) {
                fetch("/api/puzzle", {
                    method: "PUT",
                    body: JSON.stringify(game),
                }).then(async resp => {
                    if (resp.ok) {
                        const res = await resp.json();
                        if (res.data) {
                            game.id = res.data.id;
                        }
                    }
                });
            }
        }
    }, [game]);
    const removeUserStep = useCallback((userStepIndex: number) => {
        if (game) {
            const originGameState=game.state
            let userStep = game.removeUserStep(userStepIndex);
            //更新game数据
            let newGame = Object.assign(Object.create(Object.getPrototypeOf(game)), game);
            console.log(newGame)
            setGame(newGame);

            setMoveLoading(true)
            fetch("/api/puzzle/userStep/" + userStep.id, {
                method: "DELETE",
            }).then(async (resp) => {
                if (resp.ok) {
                    const res = await resp.json();
                }
                setMoveLoading(false)
            });
            if(originGameState!==0) {//恢复到进行中状态
                fetch("/api/puzzle", {
                    method: "PUT",
                    body: JSON.stringify(game),
                }).then(async resp => {
                    if (resp.ok) {
                        const res = await resp.json();
                        if (res.data) {
                            game.id = res.data.id;
                        }
                    }
                });
            }
        }
    }, [game]);

    const saveAsGame = useCallback((puzzle: number[][]) => {
        return new Promise<Game | string>((resolve, reject) => {
            if (_.filter(_.flatten(puzzle), (value) => value !== -1).length < 60) {
                messageApi.warning("出题必须填充元素数量超过 60")
                reject("出题必须填充元素数量超过 60")
                return;
            }
            let solution = _.cloneDeep(puzzle);
            if (Game.solveSudoku(solution)) {
                let game = new Game(puzzle, 6, solution, new Date());

                fetch("/api/puzzle", {
                    method: "PUT",
                    body: JSON.stringify(game),
                }).then(async resp => {
                    if (resp.ok) {
                        const res = await resp.json();
                        if (res.data) {
                            game.id = res.data.id;
                            resolve(game)
                        }
                    }
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
    puzzle = sudoku.digHole(puzzle, difficulty)

    let game = new Game(puzzle, difficulty, solution, new Date());
    return game;
}
