import _ from "lodash";

export class Game {
    public id?: string;
    public puzzle: string;
    public difficulty: number
    public solution: string;
    public create_time: Date;
    public userSteps: UserStep[] = [];
    public state: number = 0;

    constructor(puzzle: number[][] | string, difficulty: number, solution: number[][] | string, create_time: Date | string) {
        this.puzzle = typeof puzzle === 'string' ? puzzle : _.flatten(puzzle).join(",");
        this.difficulty = difficulty;
        this.solution = typeof solution === 'string' ? solution : _.flatten(solution).join(",");
        this.create_time = typeof create_time === 'string' ? new Date(create_time) : create_time;
    }

    static parse(d: {
        id: string,
        puzzle: string
        difficulty: number
        solution: string
        create_time: Date | string,
        userSteps?: {
            id: number, puzzle_id: string,
            cell: number, value: number, create_time: Date | string, by_user: boolean, message: string|null
        }[],
        state: number,
    }) {
        let game = new Game(d.puzzle, d.difficulty, d.solution, d.create_time);
        game.id = d.id;
        game.userSteps = d.userSteps?.map(UserStep.parse) ?? [];
        game.state = d.state
        return game;
    }

    public userStepIndex(cell: number) {
        return _.findIndex(this.userSteps, (userStep) => userStep.cell === cell);
    }

    static haveResolution(data: number[][]) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (data[i][j] == -1) {
                    for (let num = 1; num <= 9; num++) {
                        if (isSafe(data, i, j, num)) {
                            data[i][j] = num;
                            if (this.haveResolution(data)) {
                                return true;
                            } else {
                                data[i][j] = -1;
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    public removeUserStep(index: number) {
        const remove = this.userSteps[index]
        this.userSteps.splice(index, 1);
        this.state = 0;
        return remove;
    }

    //根据puzzle和history生成solution
    public userSolution() {
        const puzzleData = _.chunk(this.puzzle.split(",").map(numStr => Number(numStr)), 9)
        this.userSteps.map(history => {
            puzzleData[Math.floor(history.cell / 9)][history.cell % 9] = history.value;
        })
        return puzzleData;
    }

    //根据算法得出下一步解
    static resolve(data: number[][]) {
        //遍历行列,然后填写1-9,判断游戏是否失败,失败则回滚
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (data[i][j] == -1) {
                    for (let num = 1; num <= 9; num++) {
                        if (isSafe(data, i, j, num)) {
                            data[i][j] = num;
                            if (this.haveResolution(data)) {
                                data[i][j] = -1;
                                return {row:i, col:j, num, ...this.aaaData(data, i, j)};
                            } else {
                                data[i][j] = -1;
                            }
                        }
                    }
                }
            }
        }
    }

    static aaaData(data: number[][], row: number, col: number) {
        let rowData = data[row].slice();
        let colData = data.map((row) => row[col]);

        let blockData = [];
        let startRow = Math.floor(row / 3) * 3;
        let startCol = Math.floor(col / 3) * 3;
        for (let k = 0; k < 3; k++) {
            for (let l = 0; l < 3; l++) {
                blockData.push(data[startRow + k][startCol + l]);
            }
        }

        return {
            rowData,
            colData,
            blockData
        };
    }

    public addUserStep(cell: number, value: number, byUser = true, message: string|null) {
        let userStep = new UserStep(cell, value, new Date(), byUser, message);
        userStep.puzzle_id = this.id;
        this.userSteps=[...this.userSteps,userStep];
        this.state = this.checkSolution()
        return userStep;
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
            return true
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

function isSafe(board: number[][], row: number, col: number, num: number) {
    // Checking the row
    for (let x = 0; x <= 8; x++) {
        if (board[row][x] == num) {
            return false;
        }
    }

    // Checking the column
    for (let x = 0; x <= 8; x++) {
        if (board[x][col] == num) {
            return false;
        }
    }

    // Checking the box
    let startRow = row - row % 3, startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] == num) {
                return false;
            }
        }
    }
    return true;
}

export class UserStep {
    public id?: number;
    public puzzle_id?: string;
    public cell: number;
    public value: number
    public by_user: boolean;
    public message: String|null;
    public create_time: Date

    constructor(cell: number, value: number, create_time: Date, by_user = true, message: String|null) {
        this.cell = cell;
        this.value = value;
        this.create_time = create_time;
        this.by_user = by_user;
        this.message = message;
    }

    static parse(d: {
        id: number, puzzle_id: string,
        cell: number, value: number, create_time: Date | string, by_user: boolean, message: string|null
    }) {
        let userStep = new UserStep(d.cell, d.value, d.create_time instanceof Date ? d.create_time : new Date(d.create_time), d.by_user, d.message);
        userStep.id = d.id;
        userStep.puzzle_id = d.puzzle_id;

        return userStep;
    }
}