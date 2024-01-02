'use client';
import {useCallback} from 'react';
import {useCallbackState} from "@/app/ui/hook/useCallbackState";
import _ from "lodash";
import {Game} from "@/app/lib/model/model";
import {sudoku} from "@/app/lib/sudoku";

export function useSudoku() {
    //游戏数据
    const [game, setGame] = useCallbackState<Game>();

    const newGame = useCallback(() => {
        innerNewGame().then((newGame) => {
            setGame(newGame);
        });
    }, [setGame]);

    const recoverGame = useCallback((game: Game) => {
        console.log(typeof game)
        setGame(game);
    }, [setGame]);

    const makeMove = useCallback((row: number, col: number, value: number) => {
        game?.addUserStep(row * 9 + col, value).then((userStep) => {
            //更新game数据
            let newGame = Object.assign(Object.create(Object.getPrototypeOf(game)), game);
            setGame(newGame);

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
    }, [game]);

    return {
        game,//游戏数据
        newGame,//创建新游戏
        makeMove,//用户操作
        recoverGame,//创建新游戏
    };
}


async function innerNewGame(difficulty: number = 1): Promise<Game> {
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
