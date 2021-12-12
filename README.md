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

<details>
  <summary>2015</summary>

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

</details>

<details>
  <summary>2016</summary>

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

</details>

<details>
  <summary>2017</summary>

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
| 20  |   S/M    | find stable/filter collisions   |
| 21  |   M/M    | iterate grid                    |
| 22  |   S/S    | infinite grid                   |
| 23  |   S/H    | cpu/assembly to filter primes   |
| 24  |   S/S    | dfs                             |
| 25  |   S/-    | turing machine                  |

</details>

<details>
  <summary>2018</summary>

| day | hardness | keywords                        |
| --- |:--------:| -------------------------------:|
|  1  |   S/S    | iteration                       |
|  2  |   S/S    | filter strings/sort then diff   |
|  3  |   S/S    | rectangles overlap              |
|  4  |   M/M    | simulation                      |
|  5  |   S/S    | merge with stack                |
|  6  |   M/S    | simulation                      |
|  7  |   S/M    | typology sorting/simulation     |
|  8  |   S/S    | string parsing/recursion        |
|  9  |   S/M    | simulation                      |
| 10  |   M/S    | auto scale                      |
| 11  |   S/M    | find the max sum rectangle      |
| 12  |   S/S    | simulation/find loop            |
| 13  |   S/S    | simulation                      |
| 14  |   S/S    | iteration/string match          |
| 15  |   M/S    | simulation/find bound           |
| 16  |   S/S    | cpu                             |
| 17  |   M/S    | water simulation                |
| 18  |   S/S    | simulation/find loop            |
| 19  |   S/S    | cpu/find logic                  |
| 20  |   S/S    | parse regexp and bfs            |
| 21  |   S/S    | cpu to find logic               |
| 22  |   S/M    | dp/bfs                          |
| 23  |   S/H    | filter/max clique               |
| 24  |   S/S    | simulation/find bound           |
| 25  |   S/-    | bfs                             |

</details>

<details>
  <summary>2019</summary>

| day | hardness | keywords                        |
| --- |:--------:| -------------------------------:|
|  1  |   S/S    | iteration                       |
|  2  |   S/S    | cpu                             |
|  3  |   M/S    | line cross                      |
|  4  |   S/S    | filter numbers                  |
|  5  |   S/S    | cpu                             |
|  6  |   S/S    | bfs/nearest common ancestor     |
|  7  |   S/M    | cpu/generators                  |
|  8  |   S/S    | count numbers/print and see     |
|  9  |   M/S    | big numbers cpu                 |
| 10  |   M/M    | check connectivity/sort by k    |
| 11  |   S/S    | cpu count visited/print and see |
| 12  |   S/M    | n-object simulation/lcm         |
| 13  |   S/H    | cpu output map/game simulation  |
| 14  |   S/S    | typology sorting/binary search  |
| 15  |   S/S    | bfs                             |
| 16  |   S/M    | fft simulation                  |
| 17  |   S/M    | find intersections/cut routes   |
| 18  |   M/H    | shortest path                   |
| 19  |   S/S    | count/find                      |
| 20  |   M/M    | shortest path                   |
| 21  |   M/H    | boolean cpu programming         |
| 22  |   S/H    | shuffle simulation/number theory|
| 23  |   M/M    | multiple cpus                   |
| 24  |   S/S    | life game simulation            |
| 25  |   M/-    | cpu rpg                         |

Different scripts for day 25,

- day25.js, normal program but has `-i` option to load commands
- day25-map.js, searching for all rooms
- day25-input.txt, according to the rooms map, collect items and go to the checkpoint room 
- day25-drop.js, try each possible combinations of items to pass the weight check

</details>

<details>
  <summary>2020</summary>

| day | hardness | keywords                        |
| --- |:--------:| -------------------------------:|
|  1  |   S/S    | 2 sum/3 sum                     |
|  2  |   S/S    | filter strings                  |
|  3  |   S/S    | count                           |
|  4  |   S/S    | filter strings                  |
|  5  |   S/S    | iteration/print and see         |
|  6  |   S/S    | count                           |
|  7  |   S/S    | bfs                             |
|  8  |   S/S    | cpu                             |
|  9  |   S/S    | filter/two points               |
| 10  |   S/S    | sort and count/dp               |
| 11  |   S/S    | life games simulation           |
| 12  |   S/S    | moving iteration                |
| 13  |   S/M    | find min/number theory          |
| 14  |   S/S    | bits iteration                  |
| 15  |   S/S    | iteration                       |
| 16  |   S/S    | filter/match                    |
| 17  |   S/S    | 3d/4d life games simulation     |
| 18  |   S/S    | arithmetic ast                  |
| 19  |   S/M    | regexp tree/special convertion  |
| 20  |   S/H    | picture matching/pattern search |
| 21  |   M/S    | analyze insets                  |
| 22  |   S/S    | cards array iteration           |
| 23  |   S/S    | array iteration                 |
| 24  |   S/S    | hex flip/life game simulation   |
| 25  |   S/-    | number iteration                |

</details>

### 2021

| day | hardness | keywords                        |
| --- |:--------:| -------------------------------:|
|  1  |   S/S    | iteration                       |
|  2  |   S/S    | iteration                       |
|  3  |   S/S    | count and filter strings        |
|  4  |   S/S    | simulate game                   |
|  5  |   S/S    | count grid points               |
|  6  |   S/M    | simulate list/calculate         |
|  7  |   S/S    | midpoint/find best position     |
|  8  |   S/M    | filter length/analyse mapping   |
|  9  |   S/S    | filter points/bfs               |
| 10  |   S/S    | brackets matching               |
| 11  |   S/S    | simulate grid                   |

## Bonus

Released at [reddit](https://www.reddit.com/r/adventofcode/comments/72aizu/bonus_challenge/). You can download `input.txt` directly from [here](https://gist.githubusercontent.com/topaz/15518587415ccd0468767aed4192bfd3/raw/c5bfd6a7d40eabe1ae8b9a0fb36a939cb0c5ddf4/bonuschallenge.txt).

- `YEAR=2016 node index.js 26 < input.txt > bonus.out.1`
- `YEAR=2016 node index.js 8 2 < bonus.out.1`

## Thanks to

- [petertseng](https://github.com/petertseng), first met in [reddit](https://www.reddit.com/r/adventofcode/comments/5hoia9/2016_day_11_solutions/db1v1ws/) for 2016/day11, who also has full solutions in Ruby/Haskell/Rust/D.
- [sguest](https://github.com/sguest/advent-of-code), for solving 2018/day22, with Javascript solutions of each year.
- [albertobastos](https://github.com/albertobastos/advent-of-code-2018-nodejs), for solving 2018/day15, with partial solutions of 2018 in Javascript.
- [kufii](https://github.com/kufii/Advent-Of-Code-2019-Solutions), provides a cool [website](https://kufii.github.io/Advent-Of-Code-2019-Solutions/) to show 2019 Javascript solutions.
- [mcpower](https://github.com/mcpower/adventofcode), also met in [reddit](https://www.reddit.com/r/adventofcode/comments/ee0rqi/2019_day_22_solutions/fbnkaju/) for 2019/day22, and has solutions for 2016(partial)/17/18/19 in Python/Rust.
