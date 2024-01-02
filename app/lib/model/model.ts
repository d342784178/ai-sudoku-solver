import _ from "lodash";

export class Game {
    public id?: number;
    public puzzle: string;
    public difficulty: number
    public solution: string;
    public create_time: Date;
    public userSteps: UserStep[] = [];
    public state: number = 0;

    constructor(puzzle: number[][] | string, difficulty: number, solution: number[][] | string, create_time: Date) {
        this.puzzle = typeof puzzle === 'string' ? puzzle : _.flatten(puzzle).join(",");
        this.difficulty = difficulty;
        this.solution = typeof solution === 'string' ? solution : _.flatten(solution).join(",");
        this.create_time = create_time;
    }

    static parse(d: {
        id: number,
        puzzle: string
        difficulty: number
        solution: string
        create_time: Date,
        userSteps?: {
            id: number;
            puzzle_id: number;
            cell: number;
            value: number
            create_time: Date
        }[],
        state: number,
    }) {
        let game = new Game(d.puzzle, d.difficulty, d.solution, d.create_time);
        game.id = d.id;
        game.userSteps = d.userSteps?.map(UserStep.parse) ?? [];
        game.state = d.state
        return game;
    }

    public async addUserStep(cell: number, value: number) {
        let userStep = new UserStep(cell, value, new Date());
        userStep.puzzle_id = this.id;
        this.userSteps.push(userStep);
        this.state = this.checkSolution()
        return userStep;
    }

    //根据puzzle和history生成solution
    public userSolution() {
        const puzzleData = _.chunk(this.puzzle.split(",").map(numStr => Number(numStr)), 9)
        this.userSteps.map(history => {
            puzzleData[Math.floor(history.cell / 9)][history.cell % 9] = history.value;
        })
        return puzzleData;
    }


    public checkSolution() {
        function gameResultCheck() {
            function isValidSection(section: (number | null)[]) {
                //检查一行，一列或一个区块是否合法（即是否包含所有1-9的数字，没有重复）
                const numbers = section.filter(num => num !== null);
                const set = new Set(numbers);
                return set.size === 9;
            }

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
        }

        const solution = this.userSolution();
        //检查solution中是否存在-1, 是表示正在进行中
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (solution[i][j] == -1) {
                    return 0;
                }
            }
        }
        return gameResultCheck() ? 1 : -1;
    }
}

export class UserStep {
    public id?: number;
    public puzzle_id?: number;
    public cell: number;
    public value: number
    public create_time: Date

    constructor(cell: number, value: number, create_time: Date) {
        this.cell = cell;
        this.value = value;
        this.create_time = create_time;
    }

    static parse(d: {
        id: number, puzzle_id: number,
        cell: number, value: number, create_time: Date | string
    }) {
        let userStep = new UserStep(d.cell, d.value, d.create_time instanceof Date ? d.create_time : new Date(d.create_time));
        userStep.id = d.id;
        userStep.puzzle_id = d.puzzle_id;
        return userStep;
    }
}