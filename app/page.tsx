import Link from "next/link";
import React from "react";
import {GamePlace} from "@/components/gamePlace";
import {Header} from "@/components/Header";

export default function Home() {
    return (
        <main>
            <header className="text-gray-600 body-font">
                <Header/>
            </header>

            <section className="relatve">
                <div className="mx-auto w-full max-w-7xl px-4 mt-12 md:mt-8">
                    <div className="mx-auto w-full max-w-6xl text-center">
                        {/*<h1 className="text-3xl font-bold md:text-7xl">Sudoku AI Solver</h1>*/}
                        {/*<p className="mt-4 mb-4 md:mt-12 md:mb-8 text:lg md:text-4xl">*/}
                        {/*    build in public <span className="text-primary font-bold">with you</span>*/}
                        {/*</p>*/}
                        <h1 className="text-5xl font-bold text-blue-600 mb-4">Sudoku AI Solver</h1>
                        {/*<h2 className="text-2xl font-bold text-gray-500 my-2">Our Features</h2>*/}
                        {/*<p className="text-base text-gray-800 mb-4">Our AI Sudoku Solver leverages cutting-edge*/}
                        {/*    technology to tackle Sudoku puzzles.</p>*/}
                        {/*<p className="text-base text-gray-800 mb-4">It serves as an apt tool for both novice players and*/}
                        {/*    seasoned Sudoku experts, offering pertinent solutions to all.</p>*/}
                        {/*<h2 className="text-2xl font-bold text-gray-500 my-2">How to Use</h2>*/}
                        {/*<p className="text-base text-gray-800 mb-4">Just input your sudoku puzzle, and our AI will*/}
                        {/*    promptly provide a solution for you.</p>*/}
                    </div>
                </div>
                <img src="/bgstar.svg" alt=""
                     className="absolute bottom-[auto] left-[auto] right-0 top-24 -z-10 inline-block max-[767px]:hidden"/>
                <img src="/bgstar.svg" alt=""
                     className="absolute bottom-[auto] right-[auto] left-0 top-60 -z-10 inline-block max-[767px]:hidden"/>
            </section>

            {/*<main className={clsx("flex flex-col sm:flex-row md:mt-10 content-center justify-center")}>*/}
                {/*<div className={clsx("w-full sm:max-w-3/10 sm:w-3/5 p-4")}>*/}
                    <GamePlace/>
                {/*</div>*/}
                {/*<div className={clsx("w-full sm:max-w-2/5 sm:w-2/5 p-4")}>*/}
                {/*    <History/>*/}
                {/*</div>*/}
            {/*</main>*/}

            {/*<section>*/}
            {/*    <div className="mb-4 mx-auto justify-center flex ">*/}
            {/*        <Link className="btn my-2 bg-blue-400 " href={`/game`}>START GAME</Link>*/}
            {/*    </div>*/}
            {/*</section>*/}

            {/*<!-- 版本说明 */}
            {/*<section>*/}
            {/*    /!*<!-- Pricing Container-*!/*/}
            {/*    <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">*/}
            {/*        /!*<!-- Pricing Title -*!/*/}
            {/*        <div className="text-center">*/}
            {/*            <h2 className="text-xl font-bold md:text-5xl">Version Plan</h2>*/}
            {/*            <p className="mx-auto mb-8 mt-4 max-w-lg text-[#636262] md:mb-12 lg:mb-16">We embrace a step-by-step iterative method for functional evolution.</p>*/}
            {/*        </div>*/}
            {/*        <VersionTable currentVersion={2}/>*/}
            {/*    </div>*/}
            {/*</section>*/}

            <section className="mx-auto w-full max-w-6xl text-center">
                <h2 className="mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0">
                    <Link className={"text-blue-800 underline"} href={`/blog/what-is-sudoku`}>What is Sudoku</Link></h2>
                <p>Sudoku is a puzzle game that originated in Japan and has become popular worldwide.</p>
                <p>It consists of a 9x9 grid, divided into nine 3x3 sub-grids, and the goal is to fill the grid with
                    numbers from 1 to 9 in such a way that each row, column, and sub-grid contains each number only
                    once.</p>
                <p>Sudoku is a game of logic and deduction, requiring no calculations or math skills beyond basic
                    addition.</p>

                <h2 className="mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0">
                    <Link className={"text-blue-800 underline"} href={`/blog/how-does-sudoku-work`}>How Does Sudoku Work </Link></h2>
                <p>Sudoku works by providing a partially filled grid with numbers.</p>
                <p>Players must use logic to deduce where the remaining numbers should be placed, ensuring that each
                    number appears exactly once in each row, column, and sub-grid.</p>
                <p>The game relies on the principle of elimination and the ability to recognize patterns within the
                    grid.</p>

                <h2 className="mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0">
                    <Link className={"text-blue-800 underline"} href={`/blog/how-to-play-sudoku`}>How to Play Sudoku</Link></h2>
                <p>Sudoku is a logic-based number-placement puzzle. The objective is to fill a 9x9 grid with digits so
                    that each column, each row, and each of the nine 3x3 sub-grids contain all of the digits from 1 to
                    9.</p>
                <p>Start by identifying the numbers that are already given in the grid. Then, use logic to deduce which
                    numbers can be placed in the empty cells.</p>
                <p>Beginners can start by focusing on the most obvious placements and gradually work their way through
                    the more challenging cells.</p>

                <h2 className="mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0">How Do
                    You Play Sudoku</h2>
                <p>Begin by looking at the grid and identifying any numbers that are immediately obvious. These are
                    often in rows or columns where most of the numbers are already filled.</p>
                <p>Next, try to fill in the sub-grids. This can help you narrow down the possibilities for the remaining
                    cells.</p>
                <p>Use pencil marks to note down potential numbers for each empty cell, and then eliminate possibilities
                    as you go.</p>

                <h2 className="mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0">How to
                    Solve Sudoku</h2>
                <p>Solving Sudoku involves a combination of strategies, including scanning, cross-hatching, and advanced
                    techniques like X-Wing and Swordfish.</p>
                <p>Scan rows, columns, and sub-grids to identify where a certain number must be placed.</p>
                <p>Cross-hatching involves checking both rows and columns within a sub-grid to eliminate
                    possibilities.</p>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p>Advanced techniques are used when standard methods don't provide enough information to place a
                    number.</p>

                <h2 className="mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0">How to
                    Play Sudoku for Beginners</h2>
                <p>Beginners should start by learning the basic rules and how to identify the most obvious
                    placements.</p>
                <p>Focus on one sub-grid at a time, and try to fill in the numbers that are already present.</p>
                <p>Practice patience and persistence, as Sudoku can be challenging but rewarding.</p>

                <h2 className="mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0">How to
                    Do Sudoku</h2>
                <p>Do Sudoku by applying logical reasoning to fill in the grid. Start with the most obvious numbers and
                    work your way through the grid.</p>
                <p>Use pencil marks to help you keep track of potential numbers for each cell.</p>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p>As you progress, you'll need to use more advanced techniques to solve the puzzle.</p>



                <h2 className="mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0">How to
                    Solve Hard Sudoku</h2>
                <p>Solving hard Sudoku puzzles requires advanced techniques and strategies.</p>
                <p>These may include advanced scanning, cross-hatching, and techniques like X-Wing, Swordfish, and
                    Skyscraper.</p>
                <p>Patience and persistence are key, as well as the ability to think several steps ahead.</p>

                <h2 className="mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0">What
                    Does Sudoku Mean</h2>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p>The name "Sudoku" is a combination of the Japanese words "su" (meaning "number") and "doku" (meaning
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    "single" or "unique").</p>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p>Together, it translates to "single number" or "number place," reflecting the game's objective of
                    placing unique numbers in a grid.</p>

                <h2 className="mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0">How to
                    Solve Sudoku Puzzles</h2>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p>To solve Sudoku puzzles, you'll need to apply a variety of strategies, including basic number
                    placement, scanning, and more advanced techniques.</p>
                <p>Start with the most obvious placements and gradually fill in the grid, using logic to deduce the
                    correct numbers.</p>
                <p>As you progress, you may need to use pencil marks to help you keep track of possibilities and
                    eliminate options.</p>
            </section>
        </main>
    )
}
