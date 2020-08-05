
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
let PositionArray = [];
class Play extends Phaser.Scene {

    constructor() {
        super("Play");
    }
    loaded = false;
    gems;
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
                PositionArray.push({ x: 200 + (35 * (y + 1)), y: 200 + (35 * (b + 1)), f: frame, id: ids, sprite: this.gem})
                this.gems.add(this.gem);
                ids++;
            }
        }
        this.loaded = true;
        // console.log(this.gems);


        this.physics.add.collider(this.gems, this.platform);
        this.gems.world.gravity.y = 0;


        /**
         * this part here gets the mouse and calculate
         * if it hits one of the gems 
         * 
         * and if it does, then it will save the info of the click gems
         * 
         * 
         * params @pointer
         */

        this.input.on("pointerdown", function (pointer) {

            let counter = 0;

            /**
             * this loop will check if the mouse input is clicking
             * some of the 
             * gems 
            */

            PositionArray.forEach(element => {
                if (element.x - 16 <= pointer.position.x && element.x + 16 >= pointer.position.x) {

                    if (element.y - 16 <= pointer.position.y && element.y + 16 >= pointer.position.y) {
                        id = PositionArray[counter].id;

                        /**
                         * this consecutive if else statement is responsible for checking 
                         * the clicked input to be exact.
                         * 
                         * 
                         * It also check if the choosen variable
                         */


                        if (globalBol) {

                            firstChoose = id;
                            if (firstChoose == firstIdChoosen) {
                                firstChoose = undefined;
                                globalBol = true;
                            } else {
                                secondChoose = undefined;
                                globalBol = false;
                            }

                        } else {

                            secondChoose = id;
                            if (secondChoose != firstChoose) {
                                firstIdChoosen = secondChoose;
                                globalBol = true;
                            } else {
                                secondChoose = undefined;
                            }

                        }
                        console.log(PositionArray[id]);
                        // console.log("first:", firstChoose, "second:", secondChoose, globalBol);
                        if (firstChoose != undefined && secondChoose != undefined) {
                            console.log(firstChoose, secondChoose);
                            tween(firstChoose, secondChoose,PositionArray, this);
                        }

                    }

                }
                counter++;
            });
        }, this);
    }

    update() {
        if (this.loaded) {
            check(PositionArray);
            this.loaded = false;
        }
    }
}


function addGems() {
    //in this function whenever there is a culomn that is break this function will be called
    //this function will create gems and put in the top part of the puzzle

}


function check(positionArray) {
    /**
     * this function is called whenever the user click the gem(it is just for now)
     * this function does was to extract,check, and segregate
     * the different kind of frames (i'm reffernig frames as colors )
     */
    for (let ctr = 0; ctr < 5; ctr++) {
        for (let i = 0; i < positionArray.length; i++) {
            if (ctr == positionArray[i].f) {
                frameArray[ctr].push(positionArray[i].id);
            }
        }
    }
    find(frameArray, positionArray);

}


function find(frameArray, positionArray) {

    /**
     * this function will be called whenever the check function is done
     * this function does a very important role in checking
     * when there are three or more gems that are align
     */

    // this is a variable that will holds the cloned frame array. Its porpuse was for checking 
    let clonedArrayX;
    // same goes with this variable
    let clonedArrayY;

    for (let index = 0; index < frameArray.length; index++) {

        clonedArrayX = clonedArrayY = frameArray[index]; // intializing the variable for clone array
        for (let ctr = 0; ctr < clonedArrayX.length; ctr++) { //looping througth the cloned array


            //====================================//
            //====================================//
            //====================================//
            // this is for the x axis of the game
            //====================================//
            //====================================//
            //====================================//


            // this will count the aligned colors. If its greater than three then it will be qualified 

            let Counter = 1;

            // in x axis the the id number of the frames is iterated by ten

            let ByTen = clonedArrayX[ctr] + 10;

            // this loop will continue to loop until this parameter is true "customizedIn(clonedArrayX, ByTen)"

            while (customizedIn(clonedArrayX, ByTen)) {
                //if the parameter is true 
                //it will iterate Byten and the counter
                ByTen = ByTen + 10;
                Counter++;
            }

            //checking if the counter is greater than 2
            if (Counter > 2) {
                // if its true then it will call
                // the temporary function "tintChoose()"
                tintChoosen(Counter, clonedArrayX[ctr], positionArray, 10, clonedArrayX);
            }


        }

        for (let ctr = 0; ctr < clonedArrayY.length; ctr++) {


            //====================================//
            //====================================//
            //====================================//
            //this is for the y axis of the game
            //====================================//
            //====================================//
            //====================================//


            let yCounter = 1;

            // initialized the variable ByOne
            let ByOne = clonedArrayY[ctr] + 1;

            // this variable holds the the indexes of the boundary
            let boudary = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];

            while (customizedIn(clonedArrayY, ByOne)) {
                // for decription of this loop see the loop 
                // for x axis above

                /**
                 * this statement will check if the value of
                 * ByOne is in the boundary
                 * if it does then it will break the loop
                 * to stop the counter from iterating
                 */

                if (customizedIn(boudary, ByOne - 1)) {
                    break;
                }
                ByOne = ByOne + 1;
                yCounter++;
            }
            if (yCounter > 2) {
                tintChoosen(yCounter, clonedArrayY[ctr], positionArray, 1, clonedArrayY);
            }


        }
    }



}


function customizedIn(frame, val) {

    // this function will check if the val param
    // is in the frame (frame here is an array)
    // if it does then this function will return true

    for (let fs of frame) {
        if (fs == val) {
            return true;
        }
    }
    return false;

}



function tintChoosen(counter, id, positionArray, by, clonedArray) {

    /**
     * this function is a temporary function
     * the parameter counter,id, and by are integer
     * positionArray and clonedArray are array
     * this function will just change the color of the gem 
     * (supposed to erase the gems)
     */

    // this for loop will destroy the the choosen gems by its id
    for (let ctr = 0; ctr < counter; ctr++) {

        // this part will destroy the choosen gems
        // positionArray[id].sprite.destroy(true);

        clonedArray.splice(clonedArray.findIndex(arrElem => { return arrElem == id; }), 1);
        id = id + by;

    }
}




function tween(first, second, positionArray, game) {

    /**
     * this function is resposible for the movement in gems
     * this will be called when the mouse clicks in the gems
     */

    let sprite1 = positionArray[first].sprite;
    let sprite2 = positionArray[second].sprite;

    let Fx = positionArray[first].x;
    let Fy = positionArray[first].y;

    let Sx = positionArray[second].x;
    let Sy = positionArray[second].y;

    let Frx = positionArray[first].f;
    let Fry = positionArray[second].f;


    let Fid = positionArray[first].id;
    let Sid = positionArray[second].id;

    game.add.tween({
        targets: [sprite1],
        x: Sx,
        y: Sy,
        duration: 250,
        ease: 'Linear',
        yoyo: yoy,
        onComplete: function () {
            firstChoose = undefined;

            positionArray[first].id = Sid;
            positionArray[first].x = Sx;
            positionArray[first].y = Sy;
            positionArray[first].f = Fry;
        }
    });

    game.add.tween({
        targets: [sprite2],
        x: Fx,
        y: Fy,
        duration: 250,
        ease: 'Linear',
        yoyo: yoy,
        onComplete: function () {
            secondChoose = undefined;

            positionArray[second].id = Fid;
            positionArray[second].x = Fx;
            positionArray[second].y = Fy;
            positionArray[second].f = Frx;
        }
    });

    // PositionArray[first] = { x: Sx, y: Sy, f: Ff, id: Sid, sprite: sprite2 }
    // PositionArray[second] = { x: Fx, y: Fy, f: Sf, id: Fid, sprite: sprite1 }
    console.log("x:", Fx, "y:",Fy);
    console.log("x:", Sx, "y:",Sy);
    console.log(PositionArray);
}


    // https://phaser.io/examples/v3/view/game-objects/lights/spotlight


    // https://www.youtube.com/watch?v=VhgqYw6h9Bg