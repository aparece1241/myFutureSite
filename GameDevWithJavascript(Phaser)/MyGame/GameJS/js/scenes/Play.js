
/// <reference path = "../../typings/phaser.d.ts"/>

let score = 0;
let id;
let firstChoose;
let secondChoose;
let globalBol = true;
let yoy = false;
let F0 = [];
let F1 = [];
let F2 = [];
let F3 = [];
let F4 = [];
let frameArray = [F0, F1, F2, F3, F4];
class Play extends Phaser.Scene {

    constructor() {
        super("Play");
    }
    gems;
    PositionArray = [];
    create() {
        // this creates the platform of the game the color brown one
        this.platform = this.physics.add.staticGroup();


        //this makes the platform more bigger because the actual size of the image was small
        this.platform.create(400, 600, 'platform').setScale(5).refreshBody()
        let firstIdChoosen; //this variable stores the id of the first gem that is being clicked
        let ids = 0;// this variable will store the future ids of the gems
        this.gems = this.physics.add.group(); // this is the initialization of the group of gems put inside a variable named gems

        for (let i = 0; i < 10; i++) { // this loop will iterate 10 times and will initialize some variables
            let f = i;// this variables is resposible for storing the 'i' value, that is used to check if the second counter in the second loop reach greater than four
            let y = i; // this is to store the value of i 

            for (let b = 0; b < 10; b++) {// this loop is responsible for making the gema to iterate 100 times by the use of the first loop
                if (i > 5) {// this if statement will check if the i value exceeds 4 and will retutn the value to 0 (if it reach 5)
                    f = i - 5;
                }
                let frame = Phaser.Math.Between(0, 4);
                this.gem = this.add.sprite(200 + (35 * (y + 1)), 200 + (35 * (b + 1)), "diamonds", frames = frame);
                this.PositionArray.push({ x: 200 + (35 * (y + 1)), y: 200 + (35 * (b + 1)), f: frame, id: ids,sprite: this.gem})
                this.gems.add(this.gem);
                ids++;
            }
        }
        console.log(this.gems);


        this.physics.add.collider(this.gems, this.platform);
        this.gems.world.gravity.y = 0;

        this.input.on("pointerdown", function (pointer) {

            let counter = 0;

            this.PositionArray.forEach(element => {

                if (element.x - 16 <= pointer.position.x && element.x + 16 >= pointer.position.x) {

                    if (element.y - 16 <= pointer.position.y && element.y + 16 >= pointer.position.y) {
                        id = this.PositionArray[counter].id;

                        if (globalBol) {
                            firstChoose = id;
                            if (firstChoose != firstIdChoosen) {
                                globalBol = false;
                            }
                        } else {
                            firstIdChoosen = secondChoose;
                            secondChoose = id;
                            globalBol = true;
                            //call the function here
                            tween(firstChoose, secondChoose, this.PositionArray, this);
                            firstChoose = undefined;
                            secondChoose = undefined;

                        }
                        check(this.PositionArray);
                    }

                }
                counter++;
            });
        }, this);
    }

    update() {

    }
}


function addGems() {

}


function check(PositionArray) {
    let counter = 0;
    for (let ctr = 0; ctr < 5; ctr++) {
        for (let i = 0; i < PositionArray.length; i++) {
            if (ctr == PositionArray[i].f) {
                frameArray[ctr].push(PositionArray[i].id);
            }
        }
    }
    find(frameArray,PositionArray);

}
function find(frameArray,positionArray) {
    let counterx = 0;
    let countery = 0;
    for (let index = 0; index < frameArray.length; index++) {
        for (let ctr = 0; ctr < frameArray[index].length; ctr++) {
            // this is for the x axis of the game
            console.log("FrameArray Index",frameArray[index], index);
            let Counter = 1;
            let ByTen = frameArray[index][ctr] + 10;
            // while (true) {
            //     if (customizedIn(frameArray[index], ByTen)) {
            //         ByTen = ByTen + 10;
            //         Counter++;
            //     } else {
            //         break;
            //     }
            // }
            while (customizedIn(frameArray[index], ByTen)) {
                    ByTen = ByTen + 10;
                    Counter++;
            }
            if (Counter > 2) {
                tintChoosen(Counter,frameArray[index][ctr],positionArray,10);
                console.log("X Counter:", Counter, "id:", frameArray[index][ctr], "frame:", index);
            }

            //this is for the y axis of the game

            let yCounter = 1;
            let ByOne = frameArray[index][ctr] + 1;
            let boudary = [9,19,29,39,49,59,69,79,89,99];
            while (true) {
                if (customizedIn(frameArray[index], ByOne)) {
                    ByOne = ByOne + 1;
                    yCounter++;
                }
                else {
                    break;
                }
            }
            if (yCounter > 2) {
                tintChoosen(yCounter,frameArray[index][ctr],positionArray,1);
                console.log("Y Counter:", yCounter, "id:", frameArray[index][ctr], "frame:", index);
            }
        }
    }
}


function customizedIn(frame, val) {
    let returnValue = false;
    for (let fs of frame) {
        if (fs == val) {
            // return true;
            returnValue = true;
        }
    }    
    // return false;
    return returnValue;
}



function tintChoosen(counter,id,positionArray,by){
    for(let ctr = 0;ctr < counter;ctr++){
        positionArray[id].sprite.tint = 0x00000;
        id = id + by;
    }
}

function tween(first, second, PositionArray, game) {

    let sprite1 = PositionArray[first].sprite;
    let sprite2 = PositionArray[second].sprite;
    let Fx = PositionArray[first].x;
    let Fy = PositionArray[first].y;
    let Sx = PositionArray[second].x;
    let Sy = PositionArray[second].y;
    let Ff = PositionArray[first].f;
    let Sf = PositionArray[second].f;
    let Fid = PositionArray[first].id;
    let Sid = PositionArray[second].id;

    console.log("first:", first, "second:", second);

    game.add.tween({
        targets: [sprite1],
        x: Sx,
        y: Sy,
        duration: 250,
        ease: 'Linear',
        yoyo: yoy
    });

    game.add.tween({
        targets: [sprite2],
        x: Fx,
        y: Fy,
        duration: 250,
        ease: 'Linear',
        yoyo: yoy
    });

    PositionArray[first] = { x: Sx, y: Sy, f: Ff, id: Fid,sprite: sprite2}
    PositionArray[second] = { x: Fx, y: Fy, f: Sf, id: Sid,sprite: sprite1 }
    console.log("first:", PositionArray[first], "second:", PositionArray[second]);
}


    // https://phaser.io/examples/v3/view/game-objects/lights/spotlight


    // https://www.youtube.com/watch?v=VhgqYw6h9Bg