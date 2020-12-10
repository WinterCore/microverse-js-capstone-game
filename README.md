# Scuffed Cat
A javascript platformer game made with [Phaser3](https://phaser.io/phaser3)

# Table of Contents

- [Scuffed Cat](#scuffed-cat)
- [Table of Contents](#table-of-contents)
  - [Game Concept](#game-concept)
  - [Basic Gameplay](#basic-gameplay)
  - [How to Play](#how-to-play)
  - [Assets](#assets)
    - [Scuffed Cat (The main character)](#scuffed-cat-the-main-character)
    - [Coins](#coins)
    - [Platforms](#platforms)
  - [Scenes](#scenes)
    - [Main Menu](#main-menu)
    - [Guide](#guide)
    - [Options](#options)
    - [Credits](#credits)
    - [Leaderboard](#leaderboard)
    - [Gameplay](#gameplay)
    - [Gameover](#gameover)
  - [How to Run Locally](#how-to-run-locally)
  - [Running the Tests](#running-the-tests)
  - [Built With](#built-with)
  - [Acknowledgements](#acknowledgements)

## Game Concept

Scuffed cat is a platformer. In this game scuffed cat can jump over platforms and collect coins to achieve high scores.

## Basic Gameplay

- Players can get points by passing platforms and collecting coins.
- Game stage increases the more points you collect.
- Game stage affects the speed of the scrolling.

## How to Play

<img width="150px" style="margin: 0 10px;" src="public/assets/arrow_keys.png">

Use the left & right arrow keys to move left & right, and use the up arrow key to jump.
The player is allowed to jump twice.
Try to score as many points as possible without dying.

## Assets

### Scuffed Cat (The main character)
![](demo/character.png)

### Coins

![](demo/coins.png)

- Bronze coins (left) are worth 10 points.
- Silver coins (middle) are worth 20 points. 
- Gold coins (right) are worth 35 points.

### Platforms

![](demo/light_grass.png)
![](demo/snow.png)
![](demo/dark_grass.png)
![](demo/sand.png)

## Scenes

### Main Menu
> The main menu has buttons to access all the other scenes.

![](demo/main_menu.png)

### Guide
> This scene contains instructions on how to play the game.

![](demo/guide.png)

### Options
> This scene contains the game options, it has buttons to disable sound effects and background music.

![](demo/options.png)

### Credits
> A simple credits scene.

![](demo/credits.png)

### Leaderboard
> This scene contains the top 10 score submissions.

![](demo/leaderboard.png)

### Gameplay
> Main gameplay scene where the player has to jump over platforms and collect coins to gain points, and try to avoid the holes between the platforms.

![](demo/gameplay.png)

### Gameover
> The player is taken to this scene after dying so they can submit their score if they want to.

![](demo/gameover.png)

## How to Run Locally

- Install [Node.js](https://nodejs.org/en/download/)
- Clone this repository by running `git clone https://github.com/WinterCore/microverse-js-capstone-game.git`
- Change your current working directory to the project `cd microverse-js-capstone-game.git`
- Run `npm install`
- Run `npm start`
- Enjoy

## Running the Tests

- Complete the first 4 steps from [How to run locally](#how-to-run-locally)
- Run `npm test`

## Built With
- Typescript
- HTML
- CSS
- Phaser 3
- Webpack
- Jest
- Heroku
- Eslint

## Acknowledgements
- [Coin sound effect](https://opengameart.org/content/plingy-coin)
- [Main character (Cat)](https://opengameart.org/content/sergeant-cat)
- [Background music](https://opengameart.org/content/re-music) 
- [Clouds & Background](https://opengameart.org/content/background-land)
- [Buttons](https://opengameart.org/content/candy-button-pack)
- [Junegull font](https://www.dafont.com/junegull.font)
- [Mari Roque](https://github.com/MarilenaRoque) & [Michael Threels](https://github.com/mikethreels) for the inspiration.
- Microvese

