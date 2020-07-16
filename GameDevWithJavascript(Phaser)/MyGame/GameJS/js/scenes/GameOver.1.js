class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver1");
    }

    create() {
        this.map = this.add.tileSprite(0,0,800,600,"background");
    }
    update () {
        this.map.tilePositionX += 2;
    }

}