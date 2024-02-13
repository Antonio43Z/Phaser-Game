import hightscore from "../gameComponents/hightscore";
export default class Win extends Phaser.Scene {
   
    private _win:Phaser.GameObjects.Image;
    private _user:hightscore;
    private _lay0: Phaser.GameObjects.Image;
    private _lay1: Phaser.GameObjects.Image;
    private _lay2: Phaser.GameObjects.Image;
    private _lay3: Phaser.GameObjects.Image;
    private video: Phaser.GameObjects.Video;
    private _lay4: Phaser.GameObjects.Image; 
    private _music:Phaser.Sound.BaseSound;
    constructor() {
      super({
        key: "Win",
      });
    }
    preload(){
      this.load.image("lay0","../assets/images/outer rune.png");
      this.load.image("lay1", "../assets/images/inner rune.png");
      this.load.image("lay2", "../assets/images/clock frame.png");
      this.load.image("lay3","../assets/images/big hand.png");
      this.load.image("lay4", "../assets/images/little hand.png");
      this.load.video("rewind","assets/video/rewind.mp4");
    }
    create(){
      this._music=this.sound.add("winsong");
      this._music.play(undefined,{
        loop:true,
        volume:0.2,
      });

      this.video = this.add.video(this.game.canvas.width/2 , this.game.canvas.height/2 , "rewind").setScale(1.625);
      this._lay0=this.add.image(512,300,"lay0").setDepth(5555).setScale(.675);
      this._lay1=this.add.image(512,300,"lay1").setDepth(5555).setScale(.675);
      this._lay2=this.add.image(512,300,"lay2").setDepth(5555).setScale(.675);
      this._lay3=this.add.image(512,300,"lay3").setDepth(5555).setScale(.675);
      this._lay4=this.add.image(512,300,"lay4").setDepth(5555).setScale(.675);
    this.tweens.add({
      targets: [ this.video,this._lay0,this._lay1,this._lay2,this._lay3,this._lay4],
      alpha: 1,
      duration: 500,
      onComplete:()=>{
         this.video.play(true);
      }
    });
      
      this.time.addEvent({ delay: 9000, callback: this.win,callbackScope: this});

    }
    update(time: number, delta: number): void {
  
      this._lay0.rotation+=0.3;
      this._lay1.rotation-=0.3;
      this._lay3.rotation-=0.25;
      this._lay4.rotation-=0.125;
    }

    win(){
      this.video.destroy();
      this._lay0.destroy();
      this._lay1.destroy();
      this._lay2.destroy();
      this._lay3.destroy();
      this._lay4.destroy();
      this._win=this.add.image(512,300,"game_completed").setScale(1.65)
      .setAlpha(0).setDepth(3);
        var txt=this.add
              .bitmapText(505,240, "arcade","GAME\nCOMPLETED" ,90)
              .setAlpha(0)
              .setMaxWidth(500)
              .setCenterAlign()
              .setTint(0x8f0a00)
              .setDepth(1001)
              .setOrigin(0.5, 1)
              .setInteractive();
              var txt3=this.add
              .bitmapText(515,350, "arcade","complimenti! hai vinto il gioco!!" ,30)
              .setAlpha(0)
              .setCenterAlign()
              .setTint(0x8f0a00)
              .setDepth(1001)
              .setOrigin(0.5, 1)
              .setInteractive();
        var txt1=this.add
                .bitmapText( 257,460,"arcade","REPLAY" ,40)
                .setMaxWidth(500)
                .setAlpha(0)
                .setTint(0x000000)
                .setDepth(1001)
                .setOrigin(0.5, 1)
                .setInteractive()
                .on("pointerdown",()=>{
                  this._music.stop();
                  this.scene.stop("Win");
                  this.scene.start("GamePlay",{level:0});
                  this.scene.start("Hud");
                  this.scene.bringToTop("Hud");
                  })
                .on("pointerover",()=>{
                  txt1.setTint(0x3a4466);
                })
                .on("pointerout",()=>{
                  txt1.setTint(0x000000);
                });
        var txt2=this.add
                .bitmapText(730,460, "arcade","MENU" ,40)
                .setMaxWidth(500)
                .setTint(0x000000)
                .setAlpha(0)
                .setDepth(1001)
                .setOrigin(0.5, 1)
                .setInteractive()
                .on("pointerdown",()=>{
                  this._music.stop();
                  this.scene.stop("Win");
                  this.scene.start("MenuPrincipale");
                })
                .on("pointerover",()=>{
                  txt2.setTint(0x3a4466);
                })
                .on("pointerout",()=>{
                  txt2.setTint(0x000000);
                });
                this.tweens.add({
                  targets: [this._win,txt,txt1,txt2,txt3],
                  alpha: 1,
                  duration: 2000});
      
    }
}