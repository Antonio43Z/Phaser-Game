import GamePlay from "./GamePlay";
import Hud from "./Hud";
export default class LevelCompleted extends Phaser.Scene {
    
    
    private _popuplayer: Phaser.GameObjects.Image;
    private star_empty: Array<Phaser.GameObjects.Image>;
    private _popup: Phaser.GameObjects.Image;
    private stars: Array<Phaser.GameObjects.Image>;
    private _gamePlay: GamePlay;
    private user: string="ekira";
    private _hud: Hud;
    private _music:Phaser.Sound.BaseSound;
  
  
    constructor() {
      super({
        key: "LevelCompleted",
      });
    }
    preload(){
        
    var graphics= this.make.graphics({ x:0,y:0,add:false});
    graphics.fillStyle(0x000000, .0);
    graphics.fillRect(0,0,1024,600);
    graphics.generateTexture("layer", 1024, 600);

    
    this.load.image("popup", "assets/images/popup.png");
    }
    create(){
      this._music=this.sound.add("lvlcomplete");
      this._music.play(undefined,
        {
          loop:true,
          volume:0.2,
        });

        this._gamePlay = <GamePlay>this.scene.get("GamePlay");
        this._hud = <Hud>this.scene.get("Hud");
        console.log('levelcompleted');
        this.star_empty=[
            this.add.image(310,200,"star_empty").setAlpha(.9).setScale(.5).setDepth(3),
            this.add.image(406,200,"star_empty").setAlpha(.9).setScale(.5).setDepth(3),
            this.add.image(503,200,"star_empty").setAlpha(.9).setScale(.5).setDepth(3),
            this.add.image(599,200,"star_empty").setAlpha(.9).setScale(.5).setDepth(3),
            this.add.image(696,200,"star_empty").setAlpha(.9).setScale(.5).setDepth(3)
          ];
        this._popuplayer=this.add.image(512,300,"layer").setDepth(1);
        this._popup=this.add.image(this.game.canvas.width /2-50, this.game.canvas.height /2,"popup").setDepth(2);
        var k=310;
        var x=1;
        var X=.5;
        var Y=.5;
        this.tweens.add({
          targets: this.add.image(k,200,"star").setAlpha(1).setScale(.5).setDepth(1013),
          scaleX:1,
          scaleY:1,
          ease:'Sine.easeInOut',
          duration: 500,
          yoyo: true,
          }
        );
        if((5-this._gamePlay.c)>1){for( x=1;x<(5-this._gamePlay.c);x++){
          k+=96.5;
          this.tweens.add({
            targets: this.add.image(k,200,"star").setAlpha(1).setScale(X,Y).setDepth(1013),
            scaleX:1,
            scaleY:1,
            ease:'Sine.easeInOut',
            duration: 500,
            yoyo: true,
          });}}
          if(this.registry.get('user')==undefined){this.registry.set('user'," ");}
          if(x==0){this.add.bitmapText(this.game.canvas.width/2-10,260,"arcade","Peccato e' andata veramente male "+this.registry.get('user'),20)
          .setDepth(5).setCenterAlign()
          .setTintFill(0x000000)
          .setOrigin(.5);
          }
            else if (x==1||x==2){this.add.bitmapText(this.game.canvas.width/2-10,260,"arcade","potevi fare meglio "+ this.registry.get('user'),25)
            .setDepth(5).setCenterAlign()
            .setTintFill(0x000000)
            .setOrigin(.5);}
              else if((x==3)||(x==4)){this.add.bitmapText(this.game.canvas.width/2-10,260,"arcade","Complimeti!! ottimo risultato "+this.registry.get('user'),25)
              .setDepth(5).setCenterAlign()
              .setTintFill(0x000000)
              .setOrigin(.5);}
                else if(x==5){this.add.bitmapText(this.game.canvas.width/2-10,260,"arcade","Perfetto!! sei il migliore "+this.registry.get('user'),25)
                .setDepth(5)
                .setCenterAlign()
                .setTintFill(0x000000)
                .setOrigin(.5);}
          if(x<5){this.add.bitmapText(this.game.canvas.width/2-10,290,"arcade","sii piu' attento al tempo per un risultato migliore",20)
          .setDepth(5).setCenterAlign()
          .setTintFill(0x8f0a00)
          .setOrigin(.5);}
          var chose;
          this.add.image(this.game.canvas.width / 2+20,420,"p_button")
          .setDepth(5).setScale(1.5).setOrigin(.2,1).setInteractive()
          .on("pointerdown",()=>{
            this._music.stop();
            this.scene.stop("LevelCompleted");
            this.scene.start("GamePlay",{level:this._hud.level});
            this.scene.start("Hud");
            this.scene.bringToTop("Hud");
            })
          .on("pointerover",()=>{
            txt1.setTint(0x3a4466);
          })
          .on("pointerout",()=>{
            txt1.setTint(0x000000);
          });
          this.add.image(this.game.canvas.width / 2+20,520,"p_button")
          .setDepth(5).setScale(1.5).setOrigin(.2,1).setInteractive()
          .on("pointerdown",()=>{
            })
          .on("pointerover",()=>{
            txt1.setTint(0x3a4466);
          })
          .on("pointerout",()=>{
            txt1.setTint(0x000000);
          });
          var _txt=this.add
      .bitmapText(this.game.canvas.width / 2-19,this.game.canvas.width / 2-400, "arcade", "LEVEL",20)
      .setAlpha(1)
      .setDepth(5000)
      .setCenterAlign()
      .setTintFill(0x000000)
      .setOrigin(.5,1);
      var _txt=this.add
      .bitmapText(this.game.canvas.width / 2-19,this.game.canvas.width / 2-370, "arcade", "COMPLETED",20)
      .setAlpha(1)
      .setDepth(5000)
      .setCenterAlign()
      .setTintFill(0x000000)
      .setOrigin(.5,1);
      var txt1=this.add
      .bitmapText(this.game.canvas.width / 2-20,370, "arcade","NEXT" ,20)
      .setMaxWidth(5000)
      .setAlpha(1)
      .setTint(0x000000)
      .setDepth(1001)
      .setOrigin(0.5, 1)
      .setInteractive()
      .on("pointerdown",()=>{
        this._music.stop();
        this.scene.stop("LevelCompleted");
        
      this.scene.start("GamePlay",{level: this._hud.level});
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
      .bitmapText(this.game.canvas.width / 2-20,470, "arcade","MENU" ,20)
      .setMaxWidth(500)
      .setTint(0x000000)
      .setAlpha(1)
      .setDepth(5000)
      .setOrigin(0.5, 1)
      .setInteractive()
      .on("pointerdown",()=>{
        this._music.stop();
        this.scene.stop("GamePlay");
        this.scene.stop("Hud");
        this.scene.stop("LevelCompleted");
        this.scene.start("MenuPrincipale");
      })
      .on("pointerover",()=>{
        txt2.setTint(0x3a4466);
      })
      .on("pointerout",()=>{
        txt2.setTint(0x000000);
      });






    }
}