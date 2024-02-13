import GamePlay from "./GamePlay";
import MenuPrincipale from "./MenuPrincipale";
import Player from "../gameComponents/Player/Player";

export default class Hud extends Phaser.Scene {
  private _scoreText: Phaser.GameObjects.BitmapText;
  private cashText: Phaser.GameObjects.BitmapText;
  public _score: number = 0;
  private _gamePlay: GamePlay;
  private _Menu: MenuPrincipale;
  public life: number = 3;
  private lifeText : Phaser.GameObjects.BitmapText;
  public level: number = 0;
  private _music : Phaser.Sound.BaseSound;
  private _submusic : Phaser.Sound.BaseSound;
  private player : Player;
  private textShoot : Phaser.GameObjects.BitmapText;
  private counterBeer: number = 4;
  private BackGroundTextImage : Phaser.GameObjects.Image;
  private life1 : Phaser.GameObjects.Image;
  private life2 : Phaser.GameObjects.Image;
  private life3 : Phaser.GameObjects.Image;
 

  
  //Pause
  private _bpause : Phaser.GameObjects.Image;
  private _bgmenu : Phaser.GameObjects.Image;
  private _bgtext1 : Phaser.GameObjects.Image;
  private _bgtext2 : Phaser.GameObjects.Image;
  private _bgtext3 : Phaser.GameObjects.Image;
  private _pausetxt: Phaser.GameObjects.BitmapText;
  private _resumetxt: Phaser.GameObjects.BitmapText;
  private _howtoplaytxt: Phaser.GameObjects.BitmapText;
  private _menutxt: Phaser.GameObjects.BitmapText;

  //Shop
  private jump:Phaser.GameObjects.BitmapText;
  private vel:Phaser.GameObjects.BitmapText;
  private hel:Phaser.GameObjects.BitmapText;
  private cash: number = 0;
  private shop_button:Phaser.GameObjects.Image;
  private shop: Phaser.GameObjects.Container;
  private _sfondo: Phaser.GameObjects.Image;
  private _popup: Phaser.GameObjects.Image;
  private _quit: Phaser.GameObjects.Image;
  private _button:Phaser.GameObjects.Image;
  private idle: Phaser.GameObjects.Sprite;
  //Parametri personaggio
  private velCounter: number = 0;
  private jumpCounter: number = 0;

  constructor() {
    super({key: "Hud",});
  }

  preload() {
  }

  create() {
    this._button=this.add.image(565, 30, "loginbutton").setDepth(1).setInteractive()
    .on("pointerdown", ()=>{
        
        this.scene.start("Highscore",{scena:"Hud"});
        this.scene.bringToTop("Highscore");
    
    
    });
    this.shop_button = this.add.image(665, 30, "shopbutton").setInteractive().setDepth(2);
    this.shop_button.on("pointerdown", () => {
      this.shop_button.removeInteractive().setAlpha(0);
    this.scene.pause("GamePlay");
      this.shop=this.add.container(0,0,[
        this.add.image(512,300,"layer").setDepth(3),
        this.add.image(this.game.canvas.width /2-270, this.game.canvas.height /2+50,"shop_popup").setDepth(4).setScale(.7),
        this.add.image(this.game.canvas.width /2, 20,"shop",).setDepth(4).setScale(.7).setOrigin(.5,0),
        this.add.image(this.game.canvas.width /2+300, this.game.canvas.height /2+50,"shop_popup").setDepth(4).setScale(.7),
        this.idle = this.add.sprite(this.game.canvas.width/2+20, this.game.canvas.height / 2, "Player").setOrigin(.5).setScale(5).play("idle"),
        this.add.bitmapText(442,45,"CostumFont","SHOP",60).setDepth(106).setTint(0x000000),
        this.add.image(700 , 252, "buyvel" ).setOrigin(.5).setDepth(107),
        this.vel=this.add.bitmapText(730,242,"arcade","x"+this.velCounter,20).setTint(0x000000),
        this.add.image(120 , 252, "buyvel" ).setOrigin(.5).setDepth(107).setInteractive()
        .on("pointerdown", () => {
          if(this.cash >= 50 ){
            if(this.velCounter < 2) this.velCounter++;
            console.log(this.velCounter);
            this._gamePlay.player.updateParameters(1);
            this.decreaseCash(50);
            this.vel.setText("x"+this.velCounter);
            this.idle.play("attack").playAfterRepeat("idle");
            }
            
        }),
        this.add.image(700, 412, "cuore" ).setOrigin(.5).setDepth(109),
        this.hel=this.add.bitmapText(730,402,"arcade","x"+this.life,20).setTint(0x000000),
        this.add.bitmapText(150, 232, "arcade", "Movement speed \nPrice: 50c", 15).setDepth(106).setTintFill(0x000000),
        this.add.image(120, 412, "cuore" ).setOrigin(.5).setDepth(109).setInteractive()
        .on("pointerdown", () => {
        
          if(this._score >= 100 && (this.life + 1) <= 3){
            this.decreaseCash(100);
            this.increaseLife();
            this.hel.setText("x"+this.life);
            this.idle.play("attack").playAfterRepeat("idle");
          }
        }),
        this.add.image(700, 332, "buyjump" ).setOrigin(.5).setDepth(108),
        this.jump=this.add.bitmapText(730,322,"arcade","x"+this.jumpCounter,20).setTint(0x000000),
        this.add.bitmapText(150, 392, "arcade", "Heal: \nPrice: 100c", 15).setDepth(106).setTintFill(0x000000),
        this.add.image(120, 332, "buyjump" ).setOrigin(.5).setDepth(108).setInteractive()
        .on("pointerdown", () => {
        
          if(this.cash >= 70){
            if(this.jumpCounter < 3) this.jumpCounter++;
            console.log(this.jumpCounter);
              this._gamePlay.player.updateParameters(2);
              this.decreaseCash(70);
              this.jump.setText("x"+this.jumpCounter);
              this.idle.play("attack").playAfterRepeat("idle");
          }
        }),
        this.add.bitmapText(150, 310, "arcade", "Jump boost \nPrice: 70c", 15).setDepth(106).setTintFill(0x000000),
        this.add.bitmapText(730,180, "CostumFont","Owned:",40).setTint(0x000000),
        this.add.bitmapText(130,180, "CostumFont","Powerup:",40).setTint(0x000000),
      ]).setDepth(101).setAlpha(1);
      this.shop_button.setAlpha(0).removeInteractive();
      
      this._quit=this.add.image(this.game.canvas.width /2+200, this.game.canvas.height /2 - 250, "quit").setDepth(5000).setOrigin(0.2,0.2).setInteractive().setAlpha(.8)
      .on("pointerdown", ()=>{
        this.shop.setAlpha(0);
        this.scene.resume("GamePlay");
        this.shop_button.setAlpha(1).setInteractive();
        this._quit.destroy();
      })
    });

    this._bpause=this.add.image(615,30,"bpause").setInteractive().setDepth(3);
   
   this._bpause.on("pointerdown", () => {
    console.log("pause");
    this._bpause.removeInteractive().setAlpha(0);
    this.scene.pause("GamePlay");
    this._bgmenu=this.add.image(450,300,"popup").setOrigin(0.5);
    this._pausetxt=this.add.bitmapText(400,100,"arcade","PAUSE").setTint(0x000000);
    this._bgtext1=this.add.image(650,225,"bgtext").setOrigin(0.5).setInteractive();
    this._resumetxt=this.add.bitmapText(435,213,"arcade","RESUME",14).setTint(0x000000);

    this._bgtext1.on("pointerdown", () => {
      this.scene.resume("GamePlay");
      this._bgtext1.destroy();
      this._resumetxt.destroy();
      this._bgmenu.destroy();
      this._pausetxt.destroy();
      this._bgtext2.destroy();
      this._menutxt.destroy();
      this._bpause.setInteractive().setAlpha(1);
    });

    this._bgtext2=this.add.image(650,325,"bgtext").setOrigin(0.5).setInteractive();
    this._menutxt=this.add.bitmapText(450,313,"arcade","MENU",14).setTint(0x000000);
    
    this._bgtext2.on("pointerdown", () =>{
      this.scene.stop("GamePlay");
      this.scene.stop("Hud");
      this.scene.start("Preloader");
    })


   })
  if(this.velCounter || this.jumpCounter) this.recreateParams();

     if(this.level == 0){
       this._music=this.sound.add("classicasong");
       this._music.play(undefined,
         {
           loop:true,
           volume:0.2,
         })
         let txt = this.add.bitmapText(432, 530, "CostumFont-0", "Classic Age").setAlpha(0);
         this.tweens.add({
           targets:txt,
           alpha:1,
           repeat:0,
           duration:600,
           onComplete:()=>{
             this.tweens.add({
               targets:txt,
               delay:1000,
               alpha:0,
               repeat:0,
               duration:600,
             });
           }
         });

     }
     else if(this.level == 1){
       this._music=this.sound.add("futuresong");
       this._music.play(undefined,
         {
           loop:true,
           volume:0.2,
         });
         let txt = this.add.bitmapText(432, 530, "CostumFont-4", "Future").setAlpha(0).setTint(0xff0000);
         this.tweens.add({
           targets:txt,
           alpha:1,
           repeat:0,
           duration:600,
           onComplete:()=>{
             this.tweens.add({
               targets:txt,
               delay:1000,
               alpha:0,
               repeat:0,
               duration:600,
             });
           }
         });
     }
     else if(this.level == 2){
       this._music=this.sound.add("medioevosong");
       this._music.play(undefined,
         {
           loop:true,
           volume:0.2,
         });
         let txt = this.add.bitmapText(432, 500, "CostumFont-1", "Middle Ages", 40).setAlpha(0).setTint(0x000000);
         this.tweens.add({
           targets:txt,
           alpha:1,
           repeat:0,
           duration:600,
           onComplete:()=>{
             this.tweens.add({
               targets:txt,
               delay:1000,
               alpha:0,
               repeat:0,
               duration:600,
             });
           }
         });
     }
     else if(this.level == 3){
       this._music=this.sound.add("novecentosong");
       this._music.play(undefined,
         {
           loop:true,
           volume:0.2,
         });
         let txt = this.add.bitmapText(432, 530, "CostumFont", "Modern Age", 40).setAlpha(0).setTint(0x000000);
         this.tweens.add({
           targets:txt,
           alpha:1,
           repeat:0,
           duration:600,
           onComplete:()=>{
             this.tweens.add({
               targets:txt,
               delay:1000,
               alpha:0,
               repeat:0,
               duration:600,
             });
           }
         });
     }
     else if(this.level == 4){
      this._music=this.sound.add("cavernasong");
       this._music.play(undefined,
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
        let txt = this.add.bitmapText(432, 500, "CostumFont-5", "Cave").setAlpha(0).setTint(0xff0000);
        this.tweens.add({
          targets:txt,
          alpha:1,
          repeat:0,
          duration:600,
          onComplete:()=>{
            this.tweens.add({
              targets:txt,
              delay:1000,
              alpha:0,
              repeat:0,
              duration:600,
            });
          }
        });
     }

  
      


    this._gamePlay = <GamePlay>this.scene.get("GamePlay");
    

    this._gamePlay.verifyIsActive = false;
    this.counterBeer = 4;
    


    this.registry.set("life",this.life);
    this.registry.set("score" , this._score);


    this.life = this.registry.get("life");
    this._score = this.registry.get("score");


    
    this._gamePlay.events.off("increase-score", this.increaseScore, this);
    this._gamePlay.events.on("increase-score", this.increaseScore, this);


    this._gamePlay.events.off("lost-life", this.decreaseLife, this);
    this._gamePlay.events.on("lost-life", this.decreaseLife, this);
    this._gamePlay.events.off("level-completed", this.nextLevel, this);
    this._gamePlay.events.on("level-completed", this.nextLevel, this);

    this._gamePlay.events.off("Bonus-arrow", this.visualizeCounterArrow, this);
    this._gamePlay.events.on("Bonus-arrow",this.visualizeCounterArrow , this);

    this._gamePlay.events.off("Win-Game", this.Wingame , this); //Andrà richiamata la scena di win con la funzione WinGame
    this._gamePlay.events.on("Win-Game",this.Wingame , this); //Andrà richiamata la scena di win con la funzione WinGame


    this._scoreText = this.add.bitmapText(20,20,"arcade","Score:" + this._score + "").setFontSize(30);
    this.cashText = this.add.bitmapText(20,50,"arcade","Money:" + this.cash + "").setFontSize(30);
    this.textShoot = this.add.bitmapText(this.game.canvas.width - 230, 60, "arcade", "" ).setTint(0xff3800); 
   // this.lifeText = this.add.bitmapText(this.game.canvas.width - 40 , 20, "arcade" , this.life + "").setFontSize(30);


   if(this.life == 3)
   {
      this.life1 = this.add.image(900,20,"Hearth").setScale(0.1);
      this.life2 = this.add.image(950,20,"Hearth").setScale(0.1);
      this.life3 = this.add.image(1000,20,"Hearth").setScale(0.1);
   }
   else if(this.life == 2)
   {
    this.life2 = this.add.image(950,20,"Hearth").setScale(0.1);
    this.life3 = this.add.image(1000,20,"Hearth").setScale(0.1);
   }
   else if(this.life == 1)
   {
      this.life3 = this.add.image(1000,20,"Hearth").setScale(0.1);
   }
 
              

  }
  increaseLife(){
    this.life++;
    this._gamePlay.playLostLife();
    if(this.life == 3){
      console.log("prova");
      
      this.life1.setAlpha(1);
      this.life2.setAlpha(1);
      this.life3.setAlpha(1);
    }
    else if(this.life == 2){
      console.log("prova 2 vite");
      
      this.life2.setAlpha(1);
      this.life3.setAlpha(1);
    }
    this.registry.set("life",this.life);
  }
  increaseScore(params : number){
    this._score += params;
    this.cash += params;
    this.registry.set("score" , this._score);
    this.registry.set("cash", this.cash);
    this._scoreText.setText( "Score:" + this._score + "");
    this.cashText.setText("Money:" + this.cash + "");
  }
  
  decreaseCash(params: number){
    this.cash -= params;
    this.registry.set("cash", this.cash);
    this.cashText.setText("Money:" + this.cash + "");
  }

  visualizeCounterArrow(){
    if(this.counterBeer > 0 &&   this.counterBeer <= 4)
    {
      this.textShoot.setText( "Arrows:" + this.counterBeer);
      this.counterBeer--;
    }
    else if(this.counterBeer == 0)
    {  
      this.textShoot.setText("");
      this.counterBeer = 4;
    }
    
    
  }
  recreateParams(){
    let j;
    console.log("log");
    console.log(this.velCounter, " vel count");
    console.log(this.jumpCounter, " jump count");
      for(j = 0; j < this.velCounter; j++){
        this._gamePlay.player.updateParameters(1);
        console.log("vel prova", j);
        
      }
      for(j = 0; j < this.jumpCounter; j++){
        this._gamePlay.player.updateParameters(2);
        console.log("jump prova", j);
      }
  }

  nextLevel(){
    this._music.stop();
    this.scene.pause("GamePlay");
    
      this.level++;
      this.registry.set("level", this.level);
      this.scene.start("LevelCompleted");
      this.scene.bringToTop("LevelCompleted");


  }

  decreaseLife(){
    this.life--;
    this._gamePlay.playLostLife();
    if(this.life == 2)
    { 
      this.life1.setAlpha(0);
    }
    else if(this.life == 1)
    {
      this.life2.setAlpha(0);
    }
    else if(this.life == 0)
    {
      this.life3.setAlpha(0);
    }
    this.registry.set("life",this.life);
    if(this.life == 0)
    { 
    this.registry.set("cash",0);
      this.gameOver();
    }
  }

  visualizeCounterBeer(){
    if(this.counterBeer > 0 &&   this.counterBeer <= 4)
    {
      this.textShoot.setText( "BEERS:" + this.counterBeer);
      this.counterBeer--;
    }
    else if(this.counterBeer == 0)
    {  
      this.textShoot.setText("");
      this.counterBeer = 4;
    }
    
    
  }


  update() {
  }

  gameOver()
  { 
    this.cash = 0;
    this._score = 0;
    this.level = 0;
    this.life = 3;
    this.velCounter=0;
    this.jumpCounter=0;
    this._gamePlay.verifyIsActive = false;
    this._music.stop();
    this.scene.stop("GamePlay");
    this.scene.stop("Hud");
    this.scene.start("GameOver");
  }

  Wingame()
  {
    this._score+=this._score;
    this.cash = 0;
    this.level = 0;
    this.life = 3;
    this.velCounter=0;
    this.jumpCounter=0;
    this.registry.set("score", this._score);
    this._gamePlay.verifyIsActive = false;
    this._music.stop();
    this.scene.stop("GamePlay")
    this.scene.stop("Hud");
    this.scene.start("Win");
  }

}
