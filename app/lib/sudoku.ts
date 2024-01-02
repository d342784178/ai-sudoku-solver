const sudoku = {
    //总行数
    rowNum: 9,
    //总列数
    colNum: 9,
    //错误次数，过多表示死胡同
    errorNum: 0,
    //块级错误次数，过多需要向上回滚
    blockError: 0,
    //初始化方法
    init() {
        let sudoku: number[][] = [];
        for (let i = 0; i < this.rowNum; i++) {
            sudoku[i] = []
        }
        for (let x = 0; x < sudoku.length; x++) {
            let repeat = this.randomNum()
            for (let y = 0; y < this.colNum; y++) {
                if (this.blockError > 10) {
                    //回退
                    this.blockError = 0
                    this.errorNum = 0;
                    sudoku[x] = []
                    sudoku[x - 1] = []
                    x -= 2
                    break
                }
                if (this.errorNum > 10) {
                    //重置
                    y = -1
                    this.errorNum = 0;
                    repeat = this.randomNum()
                    sudoku[x] = []
                    continue
                }
                //随机数
                let num = this.random(repeat, 0, repeat.length - 1)
                //通过状态
                let status = this.isTrue(num, sudoku, x, y);
                if (status) {
                    this.errorNum = 0
                    this.blockError = 0
                    let index = repeat.indexOf(num);
                    repeat.splice(index, 1)
                    sudoku[x].push(num)
                } else {
                    y--
                }
            }
        }
        return sudoku;
    },
    /**
     * 根据所传数组，生成依据数组长度的随机数，返回数组下标数据
     * @param {Array} arr 依据数组
     * @param {Number} min 最小值
     * @param {Number} max 最大值
     * @returns {Number} 返回随机数
     **/
    random(arr: number[], min: number, max: number) {
        if (arr.length === 1) return arr[0]
        let num = Math.floor(Math.random() * (max - min + 1)) + min;
        return arr[num];
    },
    /**
     * 返回1到9的数组
     */
    randomNum() {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9];
    },
    /**
     * 检查数在二维数组中是否满足条件，返回布尔
     * @param {Number} num 要检查的数
     * @param {Array} sudoku 二维数组
     * @param {Number} x 行数，x轴
     * @param {Number} y 列数，y轴
     * @returns {Boolean} 返回布尔
     */
    isTrue(num: number, sudoku: number[][], x: number, y: number) {
        // console.log(x, y);
        if (sudoku[x].includes(num)) {
            // console.log('%c行重复', 'color: red');
            return false;
        }
        let y_data = [];
        for (let i = 0; i < sudoku.length; i++) {
            for (let j = 0; j < sudoku[i].length; j++) {
                if (j === y) {
                    y_data.push(sudoku[i][j])
                    break;
                }
            }
        }
        if (y_data.includes(num)) {
            this.errorNum++
            // console.log(JSON.stringify(y_data) + '%c列重复', 'color: red');
            return false;
        }
        let block_data = this.returnBlock(sudoku, x, y);
        if (block_data.includes(num)) {
            this.blockError++
            // console.log(JSON.stringify(block_data) + '%c块重复', 'color: red');
            return false;
        }
        return true;
        // console.log(x_data.toString())
        // console.log(y_data.toString())
        // console.log('----------------')
    },
    /**
     * 根据x轴和y轴在二维数组中获取3*3区域数据并返回
     * @param {Array} sudoku 二维数组
     * @param {Number} x 行数，x轴
     * @param {Number} y 列数，y轴
     * @returns {Array} 返回3*3区域数组
     */
    returnBlock(sudoku: number[][], x: number, y: number) {
        if (x === 0) return []
        let block = [];
        if (x < 3) {
            x = 3;
        } else if (x < 6) {
            x = 6;
        } else if (x < 9) {
            x = 9;
        }
        if (y < 3) {
            y = 3;
        } else if (y < 6) {
            y = 6;
        } else if (y < 9) {
            y = 9;
        }
        for (let i = x - 3; i < x; i++) {
            for (let j = y - 3; j < y; j++) {
                if (sudoku[i][j]) block.push(sudoku[i][j])
            }
        }
        // console.log(JSON.stringify(block));
        return block
    },
    /**
     * 将所传的数独棋盘根据难度等级挖孔并返回
     * @param {Array} sudoku 二维数组
     * @param {Number} difficulty 难度等级
     * @returns {Boolean} 返回数组
     */
    digHole(sudoku: number[][], difficulty = 1) {
        //难度等级
        difficulty = difficulty > 6 ? 6 : difficulty;
        //浮动区间
        const interval = this.random([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5], 0, 10)
        const level = difficulty * 10 + interval;
        let arr = [];
        for (let i = 0; i < 81; i++) {
            arr.push(i);
        }
        //产生随机去除的数位置
        let digArr: number[] = [];
        for (let i = 0; i < level; i++) {
            let num = this.random(arr, 0, arr.length - 1);
            arr.splice(arr.indexOf(num), 1);
            digArr.push(num);
        }
        //挖去相应位置的数
        for (let i = 0; i < digArr.length; i++) {
            let x = Math.floor(digArr[i] / this.rowNum);
            let y = digArr[i] - x * this.rowNum;
            sudoku[x][y] = -1;
        }
        return sudoku;
    }
}

function main() {
    let startDate = new Date()
    let puzzle = sudoku.init()
    puzzle = sudoku.digHole(puzzle, 1)
    // renderSudoku(sudoku)
    console.log(sudoku);
    console.log('耗时' + (new Date().getTime() - startDate.getTime()) + 'ms');
}
