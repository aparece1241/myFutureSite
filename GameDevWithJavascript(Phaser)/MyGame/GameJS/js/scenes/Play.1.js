
/// <reference path = "../../typings/phaser.d.ts"/>

let score = 0;
let level = 3;
let ball;
let Positions = [];
class Play extends Phaser.Scene {

    constructor() {
        super("Play1");
    }
    create() {

        this.add.image(0, 0, "background").setOrigin(0).setScale(1.5);
        prepareGlass(level, this, this.sys.game.canvas, level, Positions);
        ball = this.add.image(0, 450, "ball").setScale(1);
        shuffle(level, this, Positions);
        putIntheRightPos(shuffleArray(Positions),Positions);

        this.score = this.add.text(50, 50, "Score: " + score, { fill: "black", fontSize: 25 });
        this.level = this.add.text(50, 100, "Level: " + level, { fill: "black", fontSize: 25 });
        ball.x = Positions[0].x;

    }



}




function shuffle(level, game, positionArray) {
    trueLev = level;
    level = level + 2;

    let id1 = Phaser.Math.Between(0, trueLev);
    let id2 = Phaser.Math.Between(0, trueLev);

    if (id1 == id2) {
        while (id1 == id2) {
            id2 = Phaser.Math.Between(0, trueLev);
        }
    }

    this.firstTween = game.add.tween({
        targets: [positionArray[id1].sprite],
        x: positionArray[id2].x,
        y: 400,
        duration: 2000,
        ease: "power2",
        repeat: level,
        onRepeat: function (tween) {
            id1 = Phaser.Math.Between(0, trueLev);
            id2 = Phaser.Math.Between(0, trueLev);
            if (id1 == id2) {
                while (id1 == id2) {
                    id2 = Phaser.Math.Between(0, trueLev);
                }
            }
            tween.updateTo("targets",positionArray[id1].sprite);
            tween.updateTo("x",positionArray[id2].x);
        }

    });

    this.secondTween = game.add.tween({
        targets: [positionArray[id2].sprite],
        x: positionArray[id1].x,
        y: 400,
        duration: 2000,
        ease: "power2",
        repeat: level,
        onRepeat: function (tween) {
            tween.updateTo("targets",positionArray[id2].sprite);
            tween.updateTo("x",positionArray[id1].x);
        }

    });

}




function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
  

function putIntheRightPos(positionArray1,positionArray2){
    console.log(positionArray1,positionArray2);
    for(let ctr = 0; ctr < positionArray1.length; ctr++){
        positionArray1[ctr].sprite.x = positionArray2[ctr].x;
    }
}

// https://rexrainbow.github.io/phaser3-rex-notes/docs/site/tween/


function prepareGlass(level, game, position, trueLev, positionArray) {
    let scale = 4;
    let percent = .65;
    level = level + 1;
    let distance = position.width / level;
    let width = distance;

    if (trueLev > 1) {
        for (let ctr = 0; ctr < trueLev; ctr++) {
            if (level >= 6) {
                percent += .035;
            } else {
                percent += .05;
            }
        }
    }

    if (level >= 5) {
        for (let ctr = 0; ctr < (level - 4); ctr++) {
            scale -= .5;
        }
    }
    for (let i = 0; i < level; i++) {
        this.cup = game.add.image(width * percent, position.height - 200, "glass").setScale(scale).setInteractive();
        positionArray.push({ x: width * percent, y: position.height, id: i, sprite: this.cup });
        width += distance;
    }

}