export default class GameOver extends Phaser.Scene {
private x:number;
private text:Phaser.GameObjects.Text;
private autors:Phaser.GameObjects.Text;
private game_over:Phaser.GameObjects.Image;
private _music:Phaser.Sound.BaseSound;
 private _citazioni: Array<string>=
 [
  "Che sia il migliore o il peggiore dei tempi, \nè il solo tempo che abbiamo",
  "Alice: 'Per quanto tempo è per sempre?' \nBianconiglio: 'A volte, solo un secondo.' ",
  "Il tempo è relativo, il suo unico valore è dato \nda ciò che noi facciamo mentre sta passando.",
  "La gente comune pensa soltanto a passare il tempo, \nchi ha  un po’ d’ingegno a utilizzarlo."
];
private _autori:Array<string>=
[
  "( Art Buchwald ) ",
  "( Lewis Carroll )",
  "( Albert Einstein )",
  "( Arthur Schopenhauer )"
]
private _image: Phaser.GameObjects.Image;
  constructor() {
    super({
      key: "GameOver",
    });
  }

  preload(){
    console.log("GameOver:Preload");
  };


  create() {
    this._music=this.sound.add("gameoversong");
    this._music.play(undefined,
    {
      loop:true,
      volume:0.2,
    });

    console.log("GameOver:Create");
    this.x= Phaser.Math.RND.integerInRange(0,3);
    console.log(this.x);
    this._image=this.add.image(0,0,"bg-black").setAlpha(0).setOrigin(0);
    this.text=this.add.text(this.game.canvas.width/2,this.game.canvas.height/2,this._citazioni[this.x]).setAlpha(0).setDepth(2).setOrigin(.5,.5);
    this.autors=this.add.text(this.game.canvas.width/2,this.game.canvas.height/2+100,this._autori[this.x]).setAlpha(0).setDepth(2);
    this.tweens.add({
      targets: [this._image],
      alpha: 1,
      duration: 1000,
      onComplete: ()=>{
        this.tweens.add({
          targets: [this.text,this.autors],
          alpha: 1,
          duration: 2000,
        });
      }
    });
    this.time.addEvent({ delay: 8000, callback: this.GameOver ,callbackScope: this});

  }
 GameOver (){
  
  this.tweens.add({
    targets: [this.text,this.autors],
    alpha: 0,
    duration: 1000,
  });
    this.game_over=this.add.image(0,0,"game-over").setAlpha(0).setOrigin(0).setDepth(3);
        var txt=this.add
              .bitmapText(515,220, "arcade","GAME OVER" ,30)
              .setAlpha(0)
              .setMaxWidth(500)
              .setTint(0x8f0a00)
              .setDepth(1001)
              .setOrigin(0.5, 1)
              .setInteractive();
        var txt1=this.add
                .bitmapText(750,450, "arcade","RESTART" ,20)
                .setMaxWidth(500)
                .setAlpha(0)
                .setTint(0x000000)
                .setDepth(1001)
                .setOrigin(0.5, 1)
                .setInteractive()
                .on("pointerdown",()=>{
                  this._music.stop();
                  this.scene.stop("GameOver");
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
                .bitmapText(277,450, "arcade","MENU" ,20)
                .setMaxWidth(500)
                .setTint(0x000000)
                .setAlpha(0)
                .setDepth(1001)
                .setOrigin(0.5, 1)
                .setInteractive()
                .on("pointerdown",()=>{
                  this._music.stop();
                  this.scene.stop("GameOver");
                  this.scene.start("LevelCompleted");
                })
                .on("pointerover",()=>{
                  txt2.setTint(0x3a4466);
                })
                .on("pointerout",()=>{
                  txt2.setTint(0x000000);
                });
                this.tweens.add({
                  targets: [this.game_over,txt,txt1,txt2],
                  alpha: 1,
                  duration: 2000});
      }
    
 }

