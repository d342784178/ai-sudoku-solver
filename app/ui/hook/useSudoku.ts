'use client';
import {useCallback} from 'react';
import {useCallbackState} from "@/app/ui/hook/useCallbackState";
import _ from "lodash";
import {Game, UserStep} from "@/app/lib/model/model";
import {sudoku} from "@/app/lib/sudoku";

export function useSudoku() {
    //游戏数据
    const [game, setGame] =
        useCallbackState<Game | null>(null);

    //用户操作记录
    const [userSteps, setUserSteps] = useCallbackState<UserStep[]>([])
    const [gameState, setGameState] =
        useCallbackState<number>(0);

    const newGame = useCallback(() => {
        innerNewGame().then((newGame) => {
            setGame(newGame);
            setUserSteps(newGame.userSteps); //重置操作历史
            setGameState(newGame.state)
        });
    }, [setGame, setUserSteps, setGameState]);

    const recoverGame = useCallback((game: Game) => {
        console.log(typeof game)
        setGame(game);
        setUserSteps(game.userSteps); //重置操作历史
        setGameState(game.state)
    }, [setGame, setUserSteps, setGameState]);

    const makeMove = useCallback((row: number, col: number, value: number) => {
        game?.addUserStep(row * 9 + col, value).then((userStep) => {
            setUserSteps([
                ...game.userSteps,
            ]);
            setGameState(game?.state)

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
            });
        });
    }, [game, setUserSteps, setGameState]);

    const checkGame = useCallback(() => {
        return game ? game.checkSolution() : false;
    }, [game]);

    const userSolution = useCallback(() => {
        return game ? game.userSolution() : Array.from({length: 9}, () => new Array(9).fill(-1));
    }, [game]);

    return {
        game,//游戏数据
        newGame,//创建新游戏
        makeMove,//用户操作
        checkGame,//检查游戏结果
        userSteps, // 输出用户操作历史
        userSolution,///输出用户当前解法
        gameState,//游戏状态
        recoverGame,//创建新游戏
    };
}


async function innerNewGame(difficulty: number = 1): Promise<Game> {
    // // 一开始我们将全部填满1-9
    // const puzzle: (number)[][] = [
    //     [1, 2, 3, 4, 5, 6, 7, 8, 9],
    //     [4, 5, 6, 7, 8, 9, 1, 2, 3],
    //     [7, 8, 9, 1, 2, 3, 4, 5, 6],
    //     [2, 3, 4, 5, 6, 7, 8, 9, 1],
    //     [5, 6, 7, 8, 9, 1, 2, 3, 4],
    //     [8, 9, 1, 2, 3, 4, 5, 6, 7],
    //     [3, 4, 5, 6, 7, 8, 9, 1, 2],
    //     [6, 7, 8, 9, 1, 2, 3, 4, 5],
    //     [9, 1, 2, 3, 4, 5, 6, 7, 8],
    // ];
    //
    // let solution = _.cloneDeep(puzzle);
    // // 随机移除一部分数字
    // for (let i = 0; i < 9; i++) {
    //     for (let j = 0; j < 9; j++) {
    //         if (Math.random() > 0.98) {
    //             puzzle[i][j] = -1;
    //         }
    //     }
    // }


    let puzzle = sudoku.init();
    let solution = _.cloneDeep(puzzle);
    puzzle = sudoku.digHole(puzzle, difficulty)

    let game = new Game(puzzle, difficulty, solution, new Date());

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
    return game;
}
