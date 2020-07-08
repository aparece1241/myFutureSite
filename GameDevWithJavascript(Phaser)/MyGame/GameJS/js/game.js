/// <reference path="../typings/phaser.d.ts" />

let config = {
    type: Phaser.AUTO,
    width: "100%",
    height: "100%",
    parent: 'gameArea',
    backgroundColor: 0x0FF6347,
    scene: [Boot,Menu]
}
window.onload = function () {
    var game = new Phaser.Game(config);
}
// https://phaser.io/examples/v3/view/actions/grid-align