
/// <reference path = "../../typings/phaser.d.ts"/>

let score = 0;
let id;
let firstChoose;
let secondChoose;
let globalBol = true;
let yoy = false;
class Play extends Phaser.Scene {

    constructor() {
        super("Play");
    }
    gems;
    PositionArray = [];
    create() {
        // this.background = this.add.image(0,0,"background").setOrigin(0);    
        // this.background.setScale(3);
        this.platform = this.physics.add.staticGroup();

        this.platform.create(400, 600, 'platform').setScale(5).refreshBody()
        let firstIdChoosen;
        let ids = 0;
        this.gems = this.physics.add.group();

        for (let i = 0; i < 10; i++) {
            let f = i;
            let y = i;
            
            for (let b = 0; b < 10; b++) {
                if (i > 5) {
                    f = i - 5;
                }
                let frame = Phaser.Math.Between(0,4);
                this.PositionArray.push({ x: 200 + (35 * (y + 1)), y: 200 + (35 * (b + 1)), f : frame,id: ids})
                this.gem = this.add.sprite(200 + (35 * (y + 1)), 200 + (35 * (b + 1)), "diamonds", frames = frame); 
                this.gems.add(this.gem);
                ids++;
            }
        }
        console.log(this.gems);

        
        this.physics.add.collider(this.gems, this.platform);
        this.gems.world.gravity.y = 0;
                
        this.input.on("pointerdown", function (pointer) {
        
            let counter = 0;
            let pos1;
            let pos2;
            let pos3;
            let pos4;
        
            this.PositionArray.forEach(element => {
        
                if (element.x - 16 <= pointer.position.x && element.x + 16 >= pointer.position.x) {
        
                    if (element.y - 16 <= pointer.position.y && element.y + 16 >= pointer.position.y) {
                        id = this.PositionArray[counter].id;
                        if(globalBol){
                            firstChoose = id;
                            if(firstChoose != firstIdChoosen){
                                console.log("true");
                                globalBol = false;
                            }
                        }else{
                            firstIdChoosen = secondChoose;
                            secondChoose = id;
                            globalBol = true;
                            //call the function here
                            tween(firstChoose,secondChoose,this.gems,this.PositionArray,this);
                            firstChoose = undefined;
                            secondChoose = undefined;

                        }
                        crush1(this.PositionArray);
                        console.log(firstChoose,secondChoose);
                    }
        
                }
                counter++;
            });
        }, this);
    }

    update(){

    }
}

function addGems(){

}
function crush1(PositionArray){
    let counter = 0;
    for(let i = 0; i < PositionArray.length; i++){
        if(4 == PositionArray[i].f){
            console.log(PositionArray[i]);
        }   
    }
}

function crush2(first,second){
    let counter;
}

function tween(first,second,gems,PositionArray,game){ 

        let sprite1 = gems.children.entries[first];
        let sprite2 = gems.children.entries[second];
        let Fx = PositionArray[first].x;
        let Fy = PositionArray[first].y;
        let Sx = PositionArray[second].x;
        let Sy = PositionArray[second].y;
        let Ff = PositionArray[first].f;
        let Sf = PositionArray[second].f;
        let Fid = PositionArray[first].id;
        let Sid = PositionArray[second].id;

        console.log("first:", Fid,Fx,Fy, "second:",Sid,Sx,Sy);

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

        PositionArray[first] = {x: Sx,y: Sy, f: Ff, id: Fid}
        PositionArray[second] = {x: Fx,y: Fy, f: Sf, id: Sid}
        console.log("first:", PositionArray[first], "second:",PositionArray[second]);
    }


    // https://phaser.io/examples/v3/view/game-objects/lights/spotlight


    // https://www.youtube.com/watch?v=VhgqYw6h9Bg