import {db, sql} from "@vercel/postgres";
import * as dotenv from "dotenv";

dotenv.config({path: '../.env'}).parsed;

async function initDB() {
    let client = await db.connect();
    // await sql`DROP TABLE SudokuPuzzles;`
    // await sql`DROP TABLE UserSteps;`

    await sql`CREATE TABLE SudokuPuzzles (
            id SERIAL PRIMARY KEY,
            puzzle VARCHAR(81) NOT NULL,
            difficulty VARCHAR(20) NOT NULL,
            solution VARCHAR(81) NOT NULL,
            createTime TIMESTAMP
        );`
    await sql`CREATE TABLE UserSteps (
                id SERIAL PRIMARY KEY,
                puzzleId INTEGER,
                cell INTEGER CHECK (cell >= 0 AND cell <= 80),
                value INTEGER CHECK (value >= 1 AND value <= 9),
                createTime TIMESTAMP
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