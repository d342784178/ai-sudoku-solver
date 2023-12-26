'use client';
import {useState, useCallback} from 'react';
import {useCallbackState} from "@/app/hook/useCallbackState";

export function useSudoku() {
    //游戏数据
    const [gameData, setGameData] =
        useCallbackState<(number | null)[][]>(Array.from({length: 9}, () => new Array(9).fill(null)));

    //用户操作记录
    const [moveHistory, setMoveHistory] = useState<History[]>([])

    const newGame = useCallback(() => {
        const newGame = generateSudokuGame();
        setGameData(newGame);
        setMoveHistory([]); //重置操作历史
    }, [setGameData]);

    const makeMove = useCallback((row: number, col: number, value: number) => {
        //增加用户操作
        console.log('makeMove')
        setGameData((game) => {
            const newGame = game.slice();
            newGame[row][col] = value;
            return newGame;
        }, (newData) => {
            //检查游戏结果
            let gameResult = checkSudokuSolution(newData);
            //增加操作记录
            setMoveHistory(moveHistory => [
                ...moveHistory,
                {row, col, value, timestamp: Date.now(), gameResult} as History,
            ]);
        });

    }, [setGameData]);

    const checkGame = useCallback(() => {
        return checkSudokuSolution(gameData);
    }, [gameData]);

    return {
        gameData,//游戏数据
        newGame,//创建新游戏
        makeMove,//用户操作
        checkGame,//检查游戏结果
        moveHistory, // 输出用户操作历史
    };
}


function checkSudokuSolution(solution: (number | null)[][]) {
    console.log('checkSudokuSolution')
    // 检查一行，一列或一个区块是否合法（即是否包含所有1-9的数字，没有重复）
    const isValidSection = (section: (number | null)[]) => {
        const numbers = section.filter(num => num !== null);
        const set = new Set(numbers);
        return set.size === 9;
    };

    // 检查所有行
    for (let i = 0; i < 9; i++) {
        if (!isValidSection(solution[i])) {
            // console.log('行')
            // console.log(solution[i])
            return false;
        }
    }

    // 检查所有列
    for (let i = 0; i < 9; i++) {
        const column = solution.map(row => row[i]);
        if (!isValidSection(column)) {
            // console.log("列")
            // console.log(column)
            return false;
        }
    }

    // 检查所有9个3x3区块
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            const block = [];
            for (let k = 0; k < 3; k++) {
                for (let l = 0; l < 3; l++) {
                    block.push(solution[i + k][j + l]);
                }
            }
            if (!isValidSection(block)) {
                // console.log("block")
                // console.log(block)
                return false;
            }
        }
    }

    return true;
}

function generateSudokuGame(): (number | null)[][] {
    // 一开始我们将全部填满1-9
    const baseGrid: (number | null)[][] = [
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

    // 随机移除一部分数字
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (Math.random() > 0.995) {
                baseGrid[i][j] = null;
            }
        }
    }

    return baseGrid;
}


export class History {
    public row: number;
    public col: number;
    public value: number | null
    public timestamp: number
    public gameResult: boolean

    constructor(row: number, col: number, value: number | null, timestamp: number, gameResult: boolean) {
        this.row = row;
        this.col = col;
        this.value = value;
        this.timestamp = timestamp;
        this.gameResult = gameResult;
    }
}