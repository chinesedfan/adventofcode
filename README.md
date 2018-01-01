## Introduction

This project contains solutions for [Advent of Code](http://adventofcode.com/).

The difficulty of these puzzles is much less than Online Judge problems'. Even you can calculate the answer by a pencil and paper. Test cases are very simple and examples include nearly everything that you need to care about.

And the author provides a very interesting website!

ps.  
- Remember to call `parseInt` when parsing the input by regular expressions.  
- Do not try to find answers by binary search. The server will reject your submission after you have failed too much times.  
- Solve puzzles by brute force searching if it is hard to find reasonable algorithms. Or go to [reddit](https://www.reddit.com/r/adventofcode/)

## How to run

By default, `part` is `1`, and `YEAR` is the current year.

- `[YEAR=2015] node index.js <day> [part] < input.txt`
- `[YEAR=2015] node index.js <day> [part] -f input.txt`

## Summary

For hardness: S(Simple), M(Middle), H(Hard).

### 2015

| day | hardness | keywords                        |
| --- |:--------:| -------------------------------:|
|  1  |   S/S    | iteration                       |
|  2  |   S/S    | iteration                       |
|  3  |   S/S    | simulation                      |
|  4  |   S/S    | md5                             |
|  5  |   S/S    | filter strings                  |
|  6  |   S/S    | simulation                      |
|  7  |   M/M    | post-order tree traveling       |
|  8  |   S/S    | string replacement              |
|  9  |   S/S    | permutation                     |
| 10  |   S/S    | iteration                       |
| 11  |   S/S    | filter strings                  |
| 12  |   S/S    | recursion                       |
| 13  |   S/S    | permutation                     |
| 14  |   S/S    | simulation                      |
| 15  |   S/S    | permutation                     |
| 16  |   S/S    | filter                          |
| 17  |   M/M    | dynamic programming             |
| 18  |   S/S    | simulation                      |
| 19  |   S/H    | iteration/special laws          |
| 20  |   M/M    | find bound                      |
| 21  |   M/M    | permutation                     |
| 22  |   H/H    | dfs                             |
| 23  |   S/S    | cpu                             |
| 24  |   M/M    | dynamic programming             |
| 25  |   S/-    | iteration                       |

### 2016

| day | hardness | keywords                        |
| --- |:--------:| -------------------------------:|
|  1  |   S/S    | simulation                      |
|  2  |   S/S    | simulation                      |
|  3  |   S/S    | filter                          |
|  4  |   S/S    | filter                          |
|  5  |   S/S    | md5                             |
|  6  |   S/S    | array operations                |
|  7  |   S/S    | filter                          |
|  8  |   S/S    | simulation                      |
|  9  |   S/S    | string replacement/recursion    |
| 10  |   S/S    | simulation                      |
| 11  |   H/H    | bfs, optimization               |
| 12  |   S/S    | cpu                             |
| 13  |   H/H    | bfs                             |
| 14  |   S/S    | md5                             |
| 15  |   S/S    | iteration                       |
| 16  |   S/S    | iteration                       |
| 17  |   M/M    | md5, bfs                        |
| 18  |   S/S    | iteration                       |
| 19  |   H/H    | find laws/dynamic programming   |
| 20  |   M/M    | merge intervals                 |
| 21  |   S/S    | simulation                      |
| 22  |   S/H    | filter/bfs with special laws    |
| 23  |   S/M    | cpu/optimization                |
| 24  |   M/M    | bfs, permutation                |
| 25  |   S/-    | cpu, find first                 |

### 2017

| day | hardness | keywords                        |
| --- |:--------:| -------------------------------:|
|  1  |   S/S    | iteration                       |
|  2  |   S/S    | iteration                       |
|  3  |   S/M    | find laws/infinite grid         |
|  4  |   S/S    | filter strings                  |
|  5  |   S/S    | iteration                       |
|  6  |   S/S    | simulation                      |
|  7  |   S/S    | tree simulation/recursion       |
|  8  |   S/S    | simple cpu simulation           |
|  9  |   S/S    | iteration                       |
| 10  |   S/S    | simulation                      |
| 11  |   S/S    | find laws/simulation            |
| 12  |   S/S    | bfs                             |
| 13  |   S/S    | simulation/find first           |
| 14  |   S/M    | iteration/bfs                   |
| 15  |   S/S    | iteration                       |
| 16  |   S/M    | simulation/find laws            |
| 17  |   S/S    | iteration                       |
| 18  |   S/M    | cpu                             |
| 19  |   S/S    | simulation                      |
| 21  |   M/M    | iterate grid                    |
| 22  |   S/S    | infinite grid                   |

## Bonus

Download `input.txt` [here](https://gist.githubusercontent.com/topaz/15518587415ccd0468767aed4192bfd3/raw/c5bfd6a7d40eabe1ae8b9a0fb36a939cb0c5ddf4/bonuschallenge.txt).

- `YEAR=2016 node index.js 26 < input.txt > bonus.out.1`
- `YEAR=2016 node index.js 8 2 < bonus.out.1`
