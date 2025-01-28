# FooBooLoo Challenge
Technologies used:
- Vite
- TypeScript
- ReactJS
- shadcn-ui
- Tailwind CSS

## Description
A mini game off Fizz-Buzz like game based on the same fundamental rules. For instance, X defines a new game called “FooBooLoo”, it is composed of three rules, 1. replace any number divisible by 7 with “Foo”, 2. replace any number divisible by 11 with “Boo”, 3. replace any number divisible by 103 with “Loo”; if the number is divisible by any two or three numbers, replace the number with the associated words. The range of numbers can be defined as well. Negative numbers are not permitted. When a new game is invented, it needs to be persisted with a unique game name, and the creator can pick any game name he/she likes to be stored as the author.
At the start of the game the rules should be displayed in the UI. The player gets to decide how long the game lasts, e.g., 60 seconds. When the game starts, the server needs to send a random number to the UI, the player needs to input the answer and submit to the server. The server verifies the answer and responds, then server continues to serve another random number to the UI and the game continues until the time runs out. At the end of the game, the UI displays the score, e.g., total numbers of correct and incorrect answers. Duplicated random numbers cannot be displayed within the same game session.