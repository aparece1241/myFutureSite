/// <reference path = "../../typings/phaser.d.ts"/>
class Menu extends Phaser.Scene {
    constructor () {
        super("Menu");
    }


    gotoPlay = false;

    create () {
        
        this.background = this.add.image(0,0,"background").setOrigin(0);
        let playBtn = this.add.image(400,200,"play").setInteractive();
        this.optionBtn = this.add.image(400,250,"option").setInteractive();
        this.background.setScale(3);
        
        playBtn.on("pointerover",function(){
            this.tint = 0x00000;
        });
        playBtn.on("pointerout",function(){
            this.tint = 0xffffff;
        });
        this.optionBtn.on("pointerover",function(){
            this.tint = 0x00000;
        });
        this.optionBtn.on("pointerout",function(){
            this.tint = 0xffffff;
        });
        playBtn.on("pointerdown",function(pointer){
            alert("down");
            gotoPlay = true;
        });
        
        
    }
    update () {
        if(gotoPlay){
            alert("to play");
            this.scene.start("Play");
        }
    }


    input () {
        alert("hi");
    }
}