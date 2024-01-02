import {db, sql} from "@vercel/postgres";
import * as dotenv from "dotenv";

dotenv.config({path: '../.env'}).parsed;

async function initDB() {
    let client = await db.connect();
    await sql`DROP TABLE sudoku_puzzle;`
    await sql`DROP TABLE user_step;`

    await sql`CREATE TABLE sudoku_puzzle (
            id SERIAL PRIMARY KEY,
            puzzle VARCHAR(200) NOT NULL,
            difficulty INTEGER NOT NULL,
            solution VARCHAR(200) NOT NULL,
            create_time TIMESTAMP
        );`
    await sql`CREATE TABLE user_step (
                id SERIAL PRIMARY KEY,
                puzzle_id INTEGER NOT NULL,
                cell INTEGER CHECK (cell >= 0 AND cell <= 80),
                value INTEGER CHECK (value >= 1 AND value <= 9),
                create_time TIMESTAMP
            );`
    console.log("创建库表成功")
    client.release();
}


async function main() {
    await initDB();
}


main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});