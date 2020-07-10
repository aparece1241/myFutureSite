class Boot extends Phaser.Scene {
    constructor () {
        super("Boot");
    }
    preload () {
        this.load.image("background","../../assets/background.png");
        this.load.image("blueJewel","../../assets/jewel-blue.png");
        this.load.spritesheet("jewels","../../assets/gems.png",{frameWidth:60,frameHeight:68});
        this.load.image("play","../../assets/play.png");
        this.load.image("option","../../assets/option.png");
        this.load.image("finder","../../assets/finder.png");
        this.load.spritesheet("diamonds","../../assets/diamonds.png",{frameWidth:32,frameHeight:24});
        this.load.image("platform","../../assets/platform.png");
    }
    create () {
        this.add.text(20,20,"loading ...");   
        this.scene.start("Menu");
    }
}

// https://www.codeandweb.com/free-sprite-sheet-packer