
/// <reference path = "../../typings/phaser.d.ts"/>


var id;
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

        this.gems = this.physics.add.group();
        for (let i = 0; i < 10; i++) {
            let f = i;
            let y = i;
            if (i > 5) {
                f = i - 5;
            }
            for (let b = 0; b < 10; b++) {
                if (i > 5) {
                    f = i - 5;
                }
                this.PositionArray.push({ x: 200 + (35 * (y + 1)), y: 200 + (35 * (b + 1)) })
                this.gem = this.add.sprite(200 + (35 * (y + 1)), 200 + (35 * (b + 1)), "diamonds", frames = f);
                this.gems.add(this.gem);
            }
        }
        console.log(this.gems);

        // this.gems.world.gravity.y = 100;
        // this.gems.defaults.setBounceY = 10;
        // this.gems.defaults.setCollideWorldBounds = true;
        // this.gems.children.iterate(function(child){
        //     // child.setBounceY(1);
        //     child.setInteractive();
        //     this.physics.add.collider(child, this.platform);
        //     this.physics.add.collider(child,this.gems)
        // },this)
        this.physics.add.collider(this.gems, this.platform);
        this.gems.world.gravity.y = 0;

        this.sprite = this.gems.children.entries[0].setInteractive();
        this.input.on("pointerdown", function (pointer) {
            let counter = 0;
            console.log(this.PositionArray)
            console.log("x : " + pointer.position.x, "y : " + pointer.position.y)
            this.PositionArray.forEach(element => {
                if (element.x - 16 <= pointer.position.x && element.x + 16 >= pointer.position.x) {
                    if (element.y - 16 <= pointer.position.y && element.y + 16 >= pointer.position.y) {
                        console.log("filtered: " + element.x, element.y, counter);
                        id = counter;
                    }
                }
                counter++;
            });
            console.log(id);
        }, this);
    }
}

function lock(id,gems){

}

















    // https://phaser.io/examples/v3/view/game-objects/lights/spotlight


    // https://www.youtube.com/watch?v=VhgqYw6h9Bg