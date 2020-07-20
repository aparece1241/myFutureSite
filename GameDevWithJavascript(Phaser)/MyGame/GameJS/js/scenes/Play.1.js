
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
        console.log(Positions);
        ball = this.add.image(0, 450, "ball").setScale(1);
        shuffle(level, this, Positions);

        this.score = this.add.text(50, 50, "Score: " + score, { fill: "black", fontSize: 25 });
        this.level = this.add.text(50, 100, "Level: " + level, { fill: "black", fontSize: 25 });
        ball.x = Positions[0].x;


        this.input.on('pointerdown',function(pointer){
            getTheCup(pointer,Positions);
        });

    }



}



// this part is to shuffle the cups

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
        },
        onComplete: function(){
            putIntheRightPos(positionArray)
        }

    });

}

    

// this part is to set the in a good positions no cup is above on the other

function putIntheRightPos(positionArray1){
    console.log("Im here");
        for(let i = 0; i < positionArray1.length; i++){
            positionArray1[i].sprite.x = positionArray1[i].x;
        }
}

// https://rexrainbow.github.io/phaser3-rex-notes/docs/site/tween/


// this is to get the cup that is being clicked
function getTheCup(pointerPos,positionArray){
    let id = 0;
    let width = positionArray[0].sprite.width/2;
    let height = positionArray[0].sprite.height/2;
    positionArray.forEach(element => {
        if(element.x + width < pointerPos.x && pointerPos.x > element.x - width ){
            if(element.y + height > pointerPos.y && pointerPos.y < element.y - height){
                console.log(width,height,element.x,element.y,pointerPos.x,pointerPos.y,id);
            }
        }
        id++;
    });
    
}



// this is to prepare the glass or cups
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