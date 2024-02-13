import { Game, Time } from "phaser";


export default class Intro extends Phaser.Scene {

  private tt: Phaser.Time.TimerEvent;
  private text:Phaser.GameObjects.BitmapText;
  private txt: Array<string>;
  private c:number=0;
  private video:Phaser.GameObjects.Video;
  private button:Phaser.GameObjects.Image;
  private music:Phaser.Sound.BaseSound;
  private _submusic:Phaser.Sound.BaseSound;
 

  constructor() {
    super({
      key: "Intro",
    });
  }

  
  preload() {
    this.load.video("intro","assets/video/intro.mp4");
  }

  create() {
    
    
    this.music=this.sound.add("cavernasong");
    this.music.play(undefined,
     {
        loop:true,
        volume:0.2,
     });
   this._submusic=this.sound.add("gocce");
   this._submusic.play(undefined,
     {
       loop:true,
       volume:0.02,
     });
      this.video = this.add.video(this.game.canvas.width/2 , this.game.canvas.height/2 , "intro").setScale(1.625).setInteractive();
    
    this.tweens.add({
      targets: [ this.video],
      alpha: 1,
      duration: 500,
      onComplete:()=>{
         this.video.play(true);
      }
    });
    this.video.on("pointerdown",()=>{
    
    
    this.music.stop();
    this.scene.stop("Intro");
    this.scene.start("GamePlay",{level:0});
    this.scene.start("Hud");
    this.scene.bringToTop("Hud");
                                     }
                );
    this.txt=["","All interno di un luogo senza spazio ne tempo…",
              "In cerca di conoscenza il protagonista si vede catapultato in varie ere temporali...",
              "Cercherà di tornare alla caverna dove però troverà una spiacevole ricompensa… "];
              this.text= this.add
              .bitmapText(this.game.canvas.width / 2, this.game.canvas.height/2-150, "CostumFont-5","" ,40)
              .setMaxWidth(500)
              .setAlpha(1)
              .setDepth(1001)
              .setOrigin(0.5, 1);
    
    this.tt=this.time.addEvent({ delay: 10490, callback: this.alpha1 ,callbackScope: this});
    this.tt=this.time.addEvent({ delay: 11000, callback: this.testo1 ,callbackScope: this});
    //this.tt=this.time.addEvent({ delay: 15000, callback: this.alpha ,callbackScope: this});
    
    this.tt=this.time.addEvent({ delay: 15510, callback: this.alpha1 ,callbackScope: this});
    this.tt=this.time.addEvent({ delay: 16100, callback: this.testo1 ,callbackScope: this});
    //this.tt=this.time.addEvent({ delay: 20000, callback: this.alpha ,callbackScope: this});
    
    this.tt=this.time.addEvent({ delay: 20510, callback: this.alpha1 ,callbackScope: this});
    this.tt=this.time.addEvent({ delay: 21100, callback: this.testo1 ,callbackScope: this});
    this.tt=this.time.addEvent({ delay: 25000, callback: this.start ,callbackScope: this});
    this.tt=this.time.addEvent({ delay: 35000, callback: this.videoloop ,callbackScope: this});
    this.tt=this.time.addEvent({ delay: 8998, callback: this.videostop ,callbackScope: this});
  }
   testo1()  {
      this.text.setText(this.txt[this.c=this.c+1]);
      
  }
  videoloop(){
    this.video.play(true);
  }
  alpha(){
    this.tweens.add({
      targets: [ this.text],
      alpha: 0,
      duration: 500,

    });
  }
    alpha1(){
      this.tweens.add({
        targets: [ this.text],
        alpha: 1,
        duration: 500,
  
      });
  }
    videostop(){
      this.video.stop();
    }
    
    start(){
      var txt=this.add
              .bitmapText(this.game.canvas.width / 2-10, this.game.canvas.height/2+10, "arcade","START" ,30)
              .setMaxWidth(500)
              .setTint(0x000000)
              .setAlpha(1)
              .setDepth(1001)
              .setOrigin(0.5, 1)
              .setInteractive()
              .on("pointerdown",()=>{
                this.music.stop();
                this.scene.stop("Intro");
                this.scene.start("GamePlay",{level:0});
                this.scene.start("Hud");
                this.scene.bringToTop("Hud");
                })
                .on("pointerover",()=>{
                  txt.setTint(0x3a4466);
                })
                .on("pointerout",()=>{
                  txt.setTint(0x000000);
                });
      this.button=this.add.image(this.game.canvas.width/2+350,this.game.canvas.height/2+3,"p_button")
      .setScale(2)
      .setDepth(3)
      .setInteractive()
      .on("pointerdown",()=>{
      this.music.stop();
      this.scene.stop("Intro");
      this.scene.start("GamePlay",{level:0});
      this.scene.start("Hud");
      this.scene.bringToTop("Hud");

      });
    }
  }
