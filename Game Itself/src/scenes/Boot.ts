
export default class Boot extends Phaser.Scene {


  constructor() {
    super({
      key: "Boot",
    });
  }

  
  init() {}


  preload() {

    this.load.image("clock", "assets/images/clockstart.png");
    this.load.bitmapFont(
      "arcade",
      "assets/fonts/arcade.png",
      "assets/fonts/arcade.xml"
    );

  }

  
  create() {
    console.log("create:boot")
    this.scene.start("Preloader");

  }

}
