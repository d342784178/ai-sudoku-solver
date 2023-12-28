'use client';
import {useCallback} from 'react';
import {useCallbackState} from "@/app/ui/hook/useCallbackState";
import _ from "lodash";

export function useSudoku() {
    //游戏数据
    const [game, setGame] =
        useCallbackState<Game | null>(null);

    //用户操作记录
    const [historys, setHistorys] = useCallbackState<UserStep[]>([])
    const [gameState, setGameState] =
        useCallbackState<boolean>(false);

    const newGame = useCallback(() => {
        innerNewGame().then((newGame) => {
            setGame(newGame);
            setHistorys([]); //重置操作历史
            setGameState(false)
        });
    }, [setGame]);

    const makeMove = useCallback((row: number, col: number, value: number) => {
        game?.addHistory({row, col, value, create_time: new Date()} as UserStep).then((newHistorys) => {
            setHistorys(newHistorys, (newMoveHistory) => {
                setGameState(game ? game.checkSolution() : false)
            });
        });
    }, [game]);

    const checkGame = useCallback(() => {
        return game ? game.checkSolution() : false;
    }, [game, historys]);

    const userSolution = useCallback(() => {
        return game ? game.userSolution() : Array.from({length: 9}, () => new Array(9).fill(-1));
    }, [game, historys]);

    return {
        // game,//游戏数据
        newGame,//创建新游戏
        makeMove,//用户操作
        checkGame,//检查游戏结果
        historys, // 输出用户操作历史
        userSolution,///输出用户当前解法
        gameState,//游戏状态
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
    const resp = await fetch("/api/puzzle", {
        method: "PUT",
        body: JSON.stringify(game),
    });
    if (resp.ok) {
        const res = await resp.json();
        if (res.data) {
            game.id = res.data.id;
        }
    }
    return game;
}

export class Game {
    public id?: number;
    public puzzle: string;
    public difficulty: string | null
    public solution: string;
    public create_time: Date;
    public historys: UserStep[] = [];

    constructor(puzzle: number[][] | string, difficulty: string | null, solution: number[][] | string, create_time: Date) {
        this.puzzle = typeof puzzle === 'string' ? puzzle : _.flatten(puzzle).join(",");
        this.difficulty = difficulty;
        this.solution = typeof solution === 'string' ? solution : _.flatten(solution).join(",");
        this.create_time = create_time;
    }

    public async addHistory(history: UserStep) {
        history.puzzle_id = this.id;
        //TODO 异步保存操作记录
        fetch("/api/puzzle/history", {
            method: "PUT",
            body: JSON.stringify(history),
        }).then(async (resp) => {
            if (resp.ok) {
                const res = await resp.json();
                if (res.data) {
                    history.id = res.data.id;
                }
            }
        });
        this.historys = [
            ...this.historys,
            history
        ]
        return this.historys
    }

    //根据plzzle和history生成solution
    public userSolution() {
        const puzzleData = _.chunk(this.puzzle.split(",").map(numStr => Number(numStr)), 9)
        this.historys.map(history => {
            puzzleData[history.row][history.col] = history.value;
        })
        return puzzleData;
    }


    public checkSolution() {
        function isValidSection(section: (number | null)[]) {
            //检查一行，一列或一个区块是否合法（即是否包含所有1-9的数字，没有重复）
            const numbers = section.filter(num => num !== null);
            const set = new Set(numbers);
            return set.size === 9;
        }
        const solution = this.userSolution();
        //检查solution是否正确
        //1. 检查所有行
        for (let i = 0; i < 9; i++) {
            if (!isValidSection(solution[i])) {
                // console.log('行')
                // console.log(solution[i])
                return false;
            }
        }

        //2.检查所有列
        for (let i = 0; i < 9; i++) {
            const column = solution.map(row => row[i]);
            if (!isValidSection(column)) {
                // console.log("列")
                // console.log(column)
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
                    // console.log("block")
                    // console.log(block)
                    return false;
                }
            }
        }
        return true;
    }
}

export class UserStep {
    public id?: number;
    public puzzle_id?: number;
    public row: number;
    public col: number;
    public value: number
    public create_time: Date

    constructor(row: number, col: number, value: number, create_time: Date) {
        this.row = row;
        this.col = col;
        this.value = value;
        this.create_time = create_time;
    }
}