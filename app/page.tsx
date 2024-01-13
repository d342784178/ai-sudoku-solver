import Link from "next/link";
import React from "react";
import clsx from "clsx";
import {History} from "@/app/ui/history";
import {GamePlace} from "@/app/ui/gamePlace";

export default function Home() {
    return (
        <main>
            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                             className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span className="ml-3 text-xl">AI-Sudoku</span>
                    </a>
                    {/*<nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">*/}
                    {/*    <a href="https://chat.openai.com/g/g-EBKM6RsBl-gpts-works" target="_blank"*/}
                    {/*       className="mr-5 hover:text-gray-900">导航1</a>*/}
                    {/*    <a href="https://github.com/all-in-aigc/gpts-works" target="_blank"*/}
                    {/*       className="mr-5 hover:text-gray-900">*/}
                    {/*        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16"*/}
                    {/*             className="text-xl" height="1em" width="1em"*/}
                    {/*             xmlns="http://www.w3.org/2000/svg">*/}
                    {/*            <path*/}
                    {/*                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z">*/}
                    {/*            </path>*/}
                    {/*        </svg>*/}
                    {/*    </a>*/}
                    {/*    <a href="https://x.com/idoubicc" target="_blank" className="mr-5 hover:text-gray-900">*/}
                    {/*        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16"*/}
                    {/*             className="text-xl" height="1em" width="1em"*/}
                    {/*             xmlns="http://www.w3.org/2000/svg">*/}
                    {/*            <path*/}
                    {/*                d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z">*/}
                    {/*            </path>*/}
                    {/*        </svg>*/}
                    {/*    </a>*/}
                    {/*    <a href="https://www.buymeacoffee.com/idoubi" target="_blank">*/}
                    {/*        <svg width="27" height="39" viewBox="0 0 27 39" fill="none"*/}
                    {/*             xmlns="http://www.w3.org/2000/svg"*/}
                    {/*             className="mr-5 hover:text-gray-900">*/}
                    {/*            <path*/}
                    {/*                d="M14.3206 17.9122C12.9282 18.5083 11.3481 19.1842 9.30013 19.1842C8.44341 19.1824 7.59085 19.0649 6.76562 18.8347L8.18203 33.3768C8.23216 33.9847 8.50906 34.5514 8.95772 34.9645C9.40638 35.3776 9.994 35.6069 10.6039 35.6068C10.6039 35.6068 12.6122 35.7111 13.2823 35.7111C14.0036 35.7111 16.1662 35.6068 16.1662 35.6068C16.776 35.6068 17.3635 35.3774 17.8121 34.9643C18.2606 34.5512 18.5374 33.9846 18.5876 33.3768L20.1046 17.3073C19.4267 17.0757 18.7425 16.9219 17.9712 16.9219C16.6372 16.9214 15.5623 17.3808 14.3206 17.9122Z"*/}
                    {/*                fill="#FFDD00">*/}
                    {/*            </path>*/}
                    {/*            <path*/}
                    {/*                d="M26.6584 10.3609L26.4451 9.28509C26.2537 8.31979 25.8193 7.40768 24.8285 7.05879C24.5109 6.94719 24.1505 6.89922 23.907 6.66819C23.6634 6.43716 23.5915 6.07837 23.5351 5.74565C23.4308 5.13497 23.3328 4.52377 23.2259 3.91413C23.1336 3.39002 23.0606 2.80125 22.8202 2.32042C22.5073 1.6748 21.858 1.29723 21.2124 1.04743C20.8815 0.923938 20.5439 0.819467 20.2012 0.734533C18.5882 0.308987 16.8922 0.152536 15.2328 0.0633591C13.241 -0.046547 11.244 -0.0134338 9.25692 0.162444C7.77794 0.296992 6.22021 0.459701 4.81476 0.971295C4.30108 1.15851 3.77175 1.38328 3.38115 1.78015C2.90189 2.26775 2.74544 3.02184 3.09537 3.62991C3.34412 4.06172 3.7655 4.3668 4.21242 4.56862C4.79457 4.82867 5.40253 5.02654 6.02621 5.15896C7.76282 5.54279 9.56148 5.6935 11.3356 5.75765C13.302 5.83701 15.2716 5.77269 17.2286 5.56521C17.7126 5.51202 18.1956 5.44822 18.6779 5.37382C19.2458 5.28673 19.6103 4.54411 19.4429 4.02678C19.2427 3.40828 18.7045 3.16839 18.0959 3.26173C18.0062 3.27581 17.917 3.28885 17.8273 3.30189L17.7626 3.31128C17.5565 3.33735 17.3503 3.36169 17.1441 3.38429C16.7182 3.43018 16.2913 3.46773 15.8633 3.49693C14.9048 3.56368 13.9437 3.59445 12.9831 3.59602C12.0391 3.59602 11.0947 3.56942 10.1529 3.50736C9.72314 3.4792 9.29447 3.44339 8.86684 3.39993C8.67232 3.37959 8.47832 3.35821 8.28432 3.33422L8.0997 3.31076L8.05955 3.30502L7.86816 3.27738C7.47703 3.21845 7.0859 3.15066 6.69895 3.06878C6.6599 3.06012 6.62498 3.03839 6.59994 3.0072C6.57491 2.976 6.56127 2.9372 6.56127 2.8972C6.56127 2.85721 6.57491 2.81841 6.59994 2.78721C6.62498 2.75602 6.6599 2.73429 6.69895 2.72563H6.70625C7.04158 2.65418 7.37951 2.59317 7.71849 2.53997C7.83148 2.52224 7.94482 2.50486 8.05851 2.48782H8.06164C8.27389 2.47374 8.48718 2.43567 8.69839 2.41064C10.536 2.2195 12.3845 2.15434 14.231 2.2156C15.1275 2.24168 16.0234 2.29435 16.9157 2.38509C17.1076 2.40491 17.2985 2.42577 17.4894 2.44923C17.5624 2.4581 17.6359 2.46853 17.7094 2.47739L17.8575 2.49878C18.2893 2.56309 18.7189 2.64115 19.1462 2.73293C19.7793 2.87061 20.5923 2.91546 20.8739 3.60906C20.9636 3.82913 21.0043 4.07371 21.0538 4.30474L21.1169 4.59939C21.1186 4.60467 21.1198 4.61008 21.1206 4.61555C21.2697 5.31089 21.4191 6.00623 21.5686 6.70157C21.5795 6.75293 21.5798 6.80601 21.5693 6.85748C21.5589 6.90895 21.5379 6.95771 21.5078 7.00072C21.4776 7.04373 21.4389 7.08007 21.3941 7.10747C21.3493 7.13487 21.2993 7.15274 21.2473 7.15997H21.2431L21.1519 7.17248L21.0617 7.18448C20.7759 7.22168 20.4897 7.25644 20.2033 7.28878C19.639 7.3531 19.0739 7.40872 18.5079 7.45566C17.3831 7.54918 16.2562 7.61055 15.127 7.63975C14.5516 7.65505 13.9763 7.66217 13.4013 7.66113C11.1124 7.65933 8.82553 7.5263 6.55188 7.2627C6.30574 7.2335 6.05959 7.20221 5.81344 7.1704C6.00431 7.19491 5.67472 7.15162 5.60797 7.14224C5.45152 7.12033 5.29506 7.09756 5.13861 7.07392C4.61346 6.99517 4.09144 6.89817 3.56733 6.81317C2.9337 6.70887 2.32771 6.76102 1.75458 7.07392C1.28413 7.33136 0.903361 7.72614 0.663078 8.20558C0.415886 8.71665 0.342354 9.2731 0.231796 9.82224C0.121237 10.3714 -0.0508594 10.9622 0.0143284 11.526C0.154613 12.7427 1.00518 13.7314 2.22863 13.9525C3.37959 14.1611 4.5368 14.3301 5.69714 14.474C10.2552 15.0323 14.8601 15.0991 19.4325 14.6733C19.8048 14.6385 20.1767 14.6006 20.548 14.5596C20.6639 14.5468 20.7813 14.5602 20.8914 14.5987C21.0016 14.6372 21.1017 14.6998 21.1845 14.782C21.2673 14.8642 21.3307 14.9639 21.37 15.0737C21.4093 15.1836 21.4235 15.3009 21.4116 15.4169L21.2958 16.5423C21.0625 18.8164 20.8292 21.0903 20.596 23.3641C20.3526 25.7519 20.1077 28.1395 19.8612 30.5269C19.7916 31.1993 19.7221 31.8715 19.6526 32.5436C19.5858 33.2054 19.5764 33.888 19.4507 34.542C19.2526 35.5704 18.5564 36.2019 17.5405 36.433C16.6098 36.6448 15.659 36.756 14.7045 36.7646C13.6464 36.7704 12.5888 36.7234 11.5307 36.7292C10.4011 36.7354 9.01755 36.6311 8.1456 35.7905C7.37951 35.052 7.27365 33.8958 7.16935 32.8961C7.03028 31.5725 6.89243 30.2491 6.75579 28.9259L5.98918 21.568L5.49324 16.8072C5.48489 16.7285 5.47655 16.6508 5.46873 16.5715C5.40927 16.0036 5.0072 15.4477 4.37357 15.4764C3.83121 15.5004 3.21479 15.9614 3.27841 16.5715L3.64607 20.1011L4.40642 27.4021C4.62302 29.4759 4.8391 31.5501 5.05465 33.6247C5.09637 34.022 5.13548 34.4205 5.17929 34.8179C5.41762 36.9894 7.07599 38.1596 9.12967 38.4892C10.3291 38.6822 11.5578 38.7218 12.775 38.7416C14.3353 38.7667 15.9113 38.8267 17.4461 38.544C19.7203 38.1268 21.4267 36.6082 21.6702 34.2526C21.7398 33.5725 21.8093 32.8923 21.8788 32.2119C22.11 29.9618 22.3409 27.7115 22.5714 25.4611L23.3255 18.1079L23.6713 14.7379C23.6885 14.5708 23.759 14.4137 23.8725 14.2898C23.986 14.1659 24.1363 14.0819 24.3012 14.0501C24.9515 13.9233 25.5732 13.7069 26.0357 13.212C26.7721 12.424 26.9187 11.3967 26.6584 10.3609ZM2.19525 11.0879C2.20516 11.0832 2.18691 11.1682 2.17909 11.2079C2.17752 11.1479 2.18065 11.0947 2.19525 11.0879ZM2.25836 11.5761C2.26357 11.5724 2.27921 11.5933 2.29538 11.6183C2.27087 11.5953 2.25523 11.5781 2.25783 11.5761H2.25836ZM2.32041 11.6579C2.34284 11.696 2.35483 11.72 2.32041 11.6579V11.6579ZM2.44505 11.7591H2.44818C2.44818 11.7627 2.45392 11.7664 2.456 11.7701C2.45255 11.766 2.4487 11.7624 2.44453 11.7591H2.44505ZM24.271 11.6079C24.0373 11.83 23.6853 11.9333 23.3375 11.9849C19.4366 12.5638 15.479 12.8569 11.5354 12.7275C8.71299 12.6311 5.92035 12.3176 3.12613 11.9229C2.85234 11.8843 2.55561 11.8342 2.36735 11.6324C2.01273 11.2517 2.18691 10.4851 2.27921 10.0251C2.3637 9.60373 2.52536 9.04207 3.02653 8.9821C3.80878 8.89031 4.71724 9.22042 5.49115 9.33776C6.4229 9.47996 7.35813 9.59382 8.29683 9.67935C12.303 10.0444 16.3765 9.98755 20.3649 9.45354C21.0919 9.35584 21.8163 9.24233 22.538 9.11299C23.181 8.99774 23.8939 8.78132 24.2825 9.44728C24.5489 9.90098 24.5844 10.508 24.5432 11.0207C24.5305 11.244 24.4329 11.4541 24.2705 11.6079H24.271Z"*/}
                    {/*                fill="#0D0C22">*/}
                    {/*            </path>*/}
                    {/*        </svg>*/}
                    {/*    </a>*/}
                    {/*</nav>*/}
                </div>
            </header>

            <section className="relatve">
                <div className="mx-auto w-full max-w-7xl px-4 mt-12 md:mt-24">
                    <div className="mx-auto w-full max-w-6xl text-center">
                        {/*<h1 className="text-3xl font-bold md:text-7xl">Sudoku AI Solver</h1>*/}
                        {/*<p className="mt-4 mb-4 md:mt-12 md:mb-8 text:lg md:text-4xl">*/}
                        {/*    build in public <span className="text-primary font-bold">with you</span>*/}
                        {/*</p>*/}
                        <h1 className="text-5xl font-bold text-blue-600 mb-4">Welcome to Sudoku AI Solver</h1>
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

            <main className={clsx("flex flex-col sm:flex-row")}>
                <div className={clsx("w-full sm:max-w-3/10 sm:w-3/5 p-4")}>
                    <GamePlace/>
                </div>
                <div className={clsx("w-full sm:max-w-2/5 sm:w-2/5 p-4")}>
                    <History/>
                </div>
            </main>
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
                <h2 className="mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0 text-blue-800 underline"><Link
                    href={`/blog/how-to-play-sudoku`}>How to Play Sudoku</Link></h2>
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

                <h2 className="mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0">What is
                    Sudoku</h2>
                <p>Sudoku is a puzzle game that originated in Japan and has become popular worldwide.</p>
                <p>It consists of a 9x9 grid, divided into nine 3x3 sub-grids, and the goal is to fill the grid with
                    numbers from 1 to 9 in such a way that each row, column, and sub-grid contains each number only
                    once.</p>
                <p>Sudoku is a game of logic and deduction, requiring no calculations or math skills beyond basic
                    addition.</p>

                <h2 className="mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0">How
                    Does Sudoku Work</h2>
                <p>Sudoku works by providing a partially filled grid with numbers.</p>
                <p>Players must use logic to deduce where the remaining numbers should be placed, ensuring that each
                    number appears exactly once in each row, column, and sub-grid.</p>
                <p>The game relies on the principle of elimination and the ability to recognize patterns within the
                    grid.</p>

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
