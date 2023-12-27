'use client';
import {useState, useCallback} from 'react';
import {useCallbackState} from "@/app/ui/hook/useCallbackState";
import _ from "lodash";

export function useSudoku() {
    //游戏数据
    const [gameData, setGameData] =
        useCallbackState<Game|null>(null);

    //用户操作记录
    const [historys, setHistorys] = useCallbackState<History[]>([])
    const [gameState, setGameState] =
        useCallbackState<boolean>(false);

    const newGame = useCallback(() => {
        const newGame = innerNewGame();
        setGameData(newGame);
        setHistorys([]); //重置操作历史
        setGameState(false)
    }, [setGameData]);

    const makeMove = useCallback((row: number, col: number, value: number) => {
        //增加用户操作
        console.log('makeMove')
        //增加操作记录
        setHistorys(moveHistory => [
            ...moveHistory,
            {row, col, value, timestamp: Date.now()} as History,
        ], (newMoveHistory) => {
            setGameState(innerCheckSolution(innerUserSolution(gameData,newMoveHistory)))
        });
    }, [gameData]);

    const checkGame = useCallback(() => {
        return innerCheckSolution(userSolution());
    }, [gameData, historys]);

    const userSolution = useCallback(() => {
        return innerUserSolution(gameData,historys)
    }, [gameData, historys]);

    return {
        // gameData,//游戏数据
        newGame,//创建新游戏
        makeMove,//用户操作
        checkGame,//检查游戏结果
        historys, // 输出用户操作历史
        userSolution,///输出用户当前解法
        gameState,//游戏状态
    };
}

//根据plzzle和history生成solution
function innerUserSolution(gameData: Game|null, historys: History[]) {
    if(gameData!=null){
        let puzzle = gameData.puzzle;
        let solution = _.cloneDeep(puzzle);
        historys.map(history => {
            solution[history.row][history.col] = history.value;
        })
        return solution;
    }else{
        return Array.from({length: 9}, () => new Array(9).fill(null));
    }
}


function innerCheckSolution(solution: (number | null)[][]) {
    function isValidSection(section: (number | null)[]) {
        //检查一行，一列或一个区块是否合法（即是否包含所有1-9的数字，没有重复）
        const numbers = section.filter(num => num !== null);
        const set = new Set(numbers);
        return set.size === 9;
    };
    //检查solution是否正确
    //1. 检查所有行
    for (let i = 0; i < 9; i++) {
        if (!isValidSection(solution[i])) {
            console.log('行')
            console.log(solution[i])
            return false;
        }
    }

    //2.检查所有列
    for (let i = 0; i < 9; i++) {
        const column = solution.map(row => row[i]);
        if (!isValidSection(column)) {
            console.log("列")
            console.log(column)
            return false;
        }
    }

    //3. 检查所有9个3x3区块
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            const block = [];
            for (let k = 0; k < 3; k++) {
                for (let l = 0; l < 3; l++) {
                    block.push(solution[i + k][j + l]);
                }
            }
            if (!isValidSection(block)) {
                console.log("block")
                console.log(block)
                return false;
            }
        }
    }
    console.log('true')
    return true;
}

function innerNewGame(): Game {
    // 一开始我们将全部填满1-9
    const puzzle: (number | null)[][] = [
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
            if (Math.random() > 0.99) {
                puzzle[i][j] = null;
            }
        }
    }

    return new Game(puzzle, '1', solution);
}

export class Game {
    public puzzle: (number | null)[][];
    public difficulty: string | null
    public solution: (number | null)[][];


    constructor(puzzle: (number | null)[][], difficulty: string | null, solution: (number | null)[][]) {
        this.puzzle = puzzle;
        this.difficulty = difficulty;
        this.solution = solution;
    }
}

export class History {
    public row: number;
    public col: number;
    public value: number | null
    public timestamp: number
    public gameResult?: boolean

    constructor(row: number, col: number, value: number | null, timestamp: number, gameResult: boolean) {
        this.row = row;
        this.col = col;
        this.value = value;
        this.timestamp = timestamp;
        this.gameResult = gameResult;
    }
}