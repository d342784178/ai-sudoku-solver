'use client';
import {useCallback} from 'react';
import {useCallbackState} from "@/app/ui/hook/useCallbackState";
import _ from "lodash";
import {Prisma,} from '@prisma/client'
import sudoku_puzzleCreateInput = Prisma.sudoku_puzzleCreateInput;
import {Game, UserStep} from "@/app/lib/model/model";

export function useSudoku() {
    //游戏数据
    const [game, setGame] =
        useCallbackState<Game | null>(null);

    //用户操作记录
    const [userSteps, setUserSteps] = useCallbackState<UserStep[]>([])
    const [gameState, setGameState] =
        useCallbackState<boolean>(false);

    const newGame = useCallback(() => {
        innerNewGame().then((newGame) => {
            setGame(newGame);
            setUserSteps([]); //重置操作历史
            setGameState(false)
        });
    }, [setGame]);

    const recoverGame = useCallback((game: Game) => {
        console.log(typeof  game)
        setGame(game);
        setUserSteps(game.userSteps); //重置操作历史
        setGameState(false)
    }, [setGame]);


    const makeMove = useCallback((row: number, col: number, value: number) => {
        game?.addUserStep(new UserStep(row * 9 + col, value, new Date())).then((newUserSteps) => {
            setUserSteps(newUserSteps, (newMoveHistory) => {
                setGameState(game ? game.checkSolution() : false)
            });
        });
    }, [game]);

    const checkGame = useCallback(() => {
        return game ? game.checkSolution() : false;
    }, [game, userSteps]);

    const userSolution = useCallback(() => {
        return game ? game.userSolution() : Array.from({length: 9}, () => new Array(9).fill(-1));
    }, [game, userSteps]);

    return {
        // game,//游戏数据
        newGame,//创建新游戏
        makeMove,//用户操作
        checkGame,//检查游戏结果
        userSteps, // 输出用户操作历史
        userSolution,///输出用户当前解法
        gameState,//游戏状态
        recoverGame,//创建新游戏
    };
}


async function innerNewGame(): Promise<Game> {
    // 一开始我们将全部填满1-9
    const puzzle: (number)[][] = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [9, 1, 2, 3, 4, 5, 6, 7, 8],
    ];

    let solution = _.cloneDeep(puzzle);
    // 随机移除一部分数字
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (Math.random() > 0.98) {
                puzzle[i][j] = -1;
            }
        }
    }

    let game = new Game(puzzle, '1', solution, new Date());
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
