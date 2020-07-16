class Boot extends Phaser.Scene {
    constructor () {
        super("Boot1");
    }
    preload () {
        this.load.image("background","../assets/background1.jpg");
        this.load.image("glass","../assets/glass.png");
        this.load.image("ball","../assets/ball.png");
    }
    create () {
        this.add.text(20,20,"loading ...");   
        this.scene.start("Play1");
    }
}

// https://www.codeandweb.com/free-sprite-sheet-packer