
/// <reference path = "../../typings/phaser.d.ts"/>

class Play extends Phaser.Scene {

    constructor() {
        super("Play");
    }

    create(){
        this.add.text(100,100,"Happy Playing");
    }
}