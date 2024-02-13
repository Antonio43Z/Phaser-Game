export default class MenuPrincipale extends Phaser.Scene{
    public textEntry2:Phaser.GameObjects.Text;
    public textEntry:Phaser.GameObjects.Text;
    public x: Phaser.Input.Keyboard.Key;
    private _loading: Phaser.GameObjects.BitmapText;
    private _input: Phaser.GameObjects.BitmapText;
    private _txt: Phaser.GameObjects.BitmapText;
    private _progress: Phaser.GameObjects.Graphics;
    private _image: Phaser.GameObjects.Image;
    private _logo: Phaser.GameObjects.Image;
    private _button: Phaser.GameObjects.Image;
    private _music: Phaser.Sound.BaseSound;
    public _quit: Phaser.GameObjects.Image;
    public _popup: Phaser.GameObjects.Image;
    public _creditsContainer: Phaser.GameObjects.Container;
    public _txt1:Phaser.GameObjects.BitmapText;
    public st:Phaser.GameObjects.Image;
    public _txt2:Phaser.GameObjects.BitmapText;
    public _txt3:Phaser.GameObjects.BitmapText;
    public school:Phaser.GameObjects.Image;
    public testo1: Array<string>= [
      "Team: Hyperuranium", "-Cirillo Mirko", "-Di Sarno Manuel", "-Esposito Antonio","-Soriente Erika", "-Sorrentino Raffaele" ];
    public _how_to_Container: Phaser.GameObjects.Container;
    public _popuplayer: Phaser.GameObjects.Image;
    private _flag: boolean;

    constructor() {
        super({
          key: "MenuPrincipale",
        });
      }
    preload(){
        this._flag=false;
        var graphics= this.make.graphics({ x:0,y:0,add:false});
        graphics.fillStyle(0x000000, .7);
        graphics.fillRect(0,0,1024,600);
        graphics.generateTexture("layer", 1024, 600);
    }
    create(){
     
        this._music=this.sound.add("menusong");
        this._music.play(undefined,
          {
            loop:true,
            volume:0.2,
          });
        this._logo=this.add.image(this.game.canvas.width /2-115, this.game.canvas.height /2-70, "main_logo").setDepth(1).setOrigin(0.3,0.3).setScale(.6).setAlpha(.8);
        this.add.tween({ 
          targets:this._logo, 
          y: this.game.canvas.height /2-80, 
          duration: 2000, 
          ease: "quad.easeInOut",
           onComplete: () =>{
          this.add.tween({ 
            targets:this._logo, 
            y:this.game.canvas.height /2-40, 
            yoyo: true, 
            repeat: -1, 
            duration: 2000, 
            ease: "quad.easeInOut"});
          
         }});
    
        
         //login popup
        //----------------
        this._button=this.add.image(this.game.canvas.width /2-450, this.game.canvas.height /2-255, "loginbutton").setDepth(1).setOrigin(0.2,0.2).setInteractive()
        .on("pointerdown", ()=>{
         if (this._flag == false){
            this.scene.pause('MenuPrincipale');
            this.scene.start("Highscore",{scena:'MenuPrincipale'});
            this.scene.bringToTop("Highscore");
        
        }
        });
       
    
        
    
       //credits popup
    
       this._button=this.add.image(this.game.canvas.width /2-450, this.game.canvas.height /2-155, "credits").setDepth(1).setOrigin(0.2,0.2).setInteractive()
        .on("pointerdown", ()=>{
        
        if (!this._flag){
        this._creditsContainer=this.add.container(0,0,[
          
          this._popuplayer=this.add.image(512,300,"layer").setDepth(3),
          this._popup=this.add.image(this.game.canvas.width /2-50, this.game.canvas.height /2,"popup").setDepth(4),
          this.add.image(620,280,"Hyperuranium").setDepth(33333).setScale(.5),
          this._txt1=this.add
          .bitmapText(this.game.canvas.width / 2-79,this.game.canvas.width / 2-289,"CostumFont","All' interno di un paesaggio fantastico\nsono disposti alcuni oggetti irreali,\nlo sfondo delineato dalla presenza di \ncolori spenti e da un aspetto\nche si presenta come un misto tra\nl' inquetante fermezza temporale\ndelle muse di De Chirico e la \nmalleabilita' del tempo sencondo\nla prospettiva di Dalì",25)
          .setAlpha(1)
          .setDepth(5)
          .setLeftAlign()
          .setTintFill(0x000000)
          .setOrigin(.5,.5),
          this._txt3=this.add
          .bitmapText(this.game.canvas.width / 2+100,this.game.canvas.height/1-100, "CostumFont", this.testo1,)
          .setAlpha(1)
          .setDepth(5)
          .setLeftAlign()
          .setTintFill(0x000000)
          .setOrigin(.7,.8),
          this._txt2=this.add
          .bitmapText(this.game.canvas.width / 2-79,this.game.canvas.width / 2-339, "CostumFont", "Credits")
          .setAlpha(1)
          .setDepth(565)
          .setLeftAlign()
          .setTintFill(0x000000)
          .setOrigin(.5,3),
          
          this.school=this.add.image(this.game.canvas.width / 3+5,this.game.canvas.width / 2-55,"Fermi").setDepth(6).setScale(1.1),
          this._quit=this.add.image(this.game.canvas.width /2+65, this.game.canvas.height /2-225, "quit").setDepth(5).setScale(0.7).setOrigin(0.2,0.2).setInteractive().setAlpha(.6)
        ]).setDepth(4).setAlpha(1);
          this._flag=true;}
          
          this._quit.on("pointerdown", ()=>{
            this._creditsContainer.setAlpha(0);
            this._flag=false;
        
          });
        
        
        });
    
        // settings popup
    
        this._button=this.add.image(this.game.canvas.width /2+450, this.game.canvas.height /2-255, "settings").setDepth(1).setOrigin(0.2,0.2).setInteractive()
        .on("pointerdown", ()=>{
         if (this._flag == false){
          var right=this.add.image(this.game.canvas.width /2+70, this.game.canvas.height /2+85,"right").setScale(.5).setAlpha(0).setDepth(7);
          this._popuplayer=this.add.image(512,300,"layer").setDepth(3);
          this._popup=this.add.image(this.game.canvas.width /2-50, this.game.canvas.height /2,"popup").setDepth(4);
          this._flag= true;
          if(this.scale.isFullscreen){right.setAlpha(1);}
          //testi
          var _txt1=this.add
        .bitmapText(this.game.canvas.width / 2-19,this.game.canvas.width / 2-400, "CostumFont", "Settings")
        .setAlpha(1)
        .setDepth(5)
        .setLeftAlign()
        .setTintFill(0x000000)
        .setOrigin(.5,1);
          let testo=["Suoni:"," ", " "," "," "," ","Fullscreen"];
        var _txt2=this.add
        .bitmapText(this.game.canvas.width / 2-102,this.game.canvas.width / 2-150, "CostumFont", testo).setDepth(5).setOrigin(.5,1).setTintFill(0x000000);
      
        var rotella=this.add.image(this.game.canvas.width / 2-202,this.game.canvas.width / 2-50,"rotella1").setDepth(8);
        var rotella1=this.add.image(this.game.canvas.width / 2-252,this.game.canvas.width / 2-40,"rotella2").setDepth(8);
       
        //suoni
        this.st=this.add.image(412,200,"play").setScale(2).setDepth(1111).setInteractive();
         
        this.st.on("pointerdown", () => {
          this.sound.mute = !this.sound.mute;
          console.log(this.sound.mute);
          this.registry.set('sound',this.sound.mute);
          this.scene.start("MenuPrincipale");
        });
        //fullscreen
        
        var butt=this.add.image(this.game.canvas.width /2+70, this.game.canvas.height /2+85,"casella").setInteractive().setDepth(6).setScale(.5);
        butt.on("pointerdown", ()=>{
          
          if (this.scale.isFullscreen){
            this.scale.stopFullscreen();
            right.setAlpha(0);
          }
            else{
            this.scale.startFullscreen();
            right.setAlpha(1);
          }
        });
        
        
          //quit button
    
          this._quit=this.add.image(this.game.canvas.width /2+8, this.game.canvas.height /2-225, "quit").setDepth(5).setOrigin(0.2,0.2).setInteractive().setAlpha(.6)
          .on("pointerdown", ()=>{
            this._quit.destroy(true);
            this._popuplayer.destroy(true);
            this._popup.destroy(true);
            this.st.setAlpha(0);
            this._flag=false;
            rotella.destroy(true);
            rotella1.destroy(true);
            _txt1.destroy(true);
            _txt2.destroy(true);
            butt.destroy(true);
            right.destroy(true);
          });
        
        }
        });
    
        //how to popup
        this._button=this.add.image(this.game.canvas.width /2+450, this.game.canvas.height /2-155, "how to").setDepth(1).setOrigin(0.2,0.2).setInteractive()
        .on("pointerdown", ()=>{
         if (!this._flag){
          
    
          this._how_to_Container=this.add.container(0,0,[
            
            this._popuplayer=this.add.image(512,300,"layer").setDepth(3),
            this.add.image(this.game.canvas.width /2-50, this.game.canvas.height /2,"popup").setDepth(4),
              this.add
          .bitmapText(this.game.canvas.width / 2-19,this.game.canvas.width / 2-400, "CostumFont", "How to play",40)
          .setAlpha(1)
          .setDepth(5)
          .setLeftAlign()
          .setTintFill(0x000000)
          .setOrigin(.5,1),
           this.add
          .bitmapText(this.game.canvas.width / 2-19,this.game.canvas.width / 2-350, "CostumFont", "Tastiera=")
          .setAlpha(1)
          .setDepth(5)
          .setTintFill(0x000000)
          .setOrigin(.5,1),
          this.add
          .bitmapText(this.game.canvas.width / 2-19, this.game.canvas.width / 2-180, "CostumFont", "Gamepad=")
          .setAlpha(1)
          .setDepth(5)
          .setTintFill(0x000000)
          .setOrigin(.5,1),
          this.add
          .bitmapText(this.game.canvas.width / 2-105,this.game.canvas.width / 2-300, "CostumFont", "=sinistra")
          .setDepth(5).setOrigin(.5,1).setTintFill(0x000000),
          this.add
          .bitmapText(this.game.canvas.width / 2-139,this.game.canvas.width / 2-225, "CostumFont", "=spara")
          .setDepth(5).setOrigin(.5,1).setTintFill(0x000000),
          this.add
          .bitmapText(this.game.canvas.width / 2+108,this.game.canvas.width / 2-300, "CostumFont", "=destra")
          .setDepth(5).setOrigin(.5,1).setTintFill(0x000000),
          
          this.add
          .bitmapText(this.game.canvas.width / 2+135,this.game.canvas.width / 2-225, "CostumFont", "=salta")
          .setDepth(5).setOrigin(.5,1).setTintFill(0x000000),
         this.add
          .bitmapText(this.game.canvas.width / 2 - 30,this.game.canvas.width / 2-115, "CostumFont", "destra - sinistra")
          .setDepth(7).setOrigin(.5,1).setTintFill(0x000000),
          this.add
          .bitmapText(this.game.canvas.width / 2-100,this.game.canvas.width / 2-20, "CostumFont", "=salta")
          .setDepth(7).setOrigin(.5,1).setTintFill(0x000000),
          this.add
          .bitmapText(this.game.canvas.width / 2+100,this.game.canvas.width / 2-20, "CostumFont", "spara")
          .setDepth(7).setOrigin(.5,1).setTintFill(0x000000),
           this.add.image(this.game.canvas.width/2-200 , this.game.canvas.height/2-100,"A").setDepth(6).setScale(4),
           this.add.image(this.game.canvas.width/2-200 , this.game.canvas.height/2-25,"S").setDepth(6).setScale(4),
           this.add.image(this.game.canvas.width/2 +30, this.game.canvas.height/2-95,"D").setDepth(6).setScale(4),
           this.add.image(this.game.canvas.width/2 +30, this.game.canvas.height/2-25,"SPACE").setDepth(6).setScale(4),
           this.add.image(this.game.canvas.width/2-180 , this.game.canvas.height/2+90,"stick").setDepth(6).setScale(2),
           this.add.image(this.game.canvas.width/2-180 , this.game.canvas.height/2+185,"bpad").setDepth(6).setScale(2),
           this.add.image(this.game.canvas.width/2 +20, this.game.canvas.height/2+185,"ypad").setDepth(6).setScale(2),
           this._quit=this.add.image(this.game.canvas.width /2+8, this.game.canvas.height /2-225, "quit").setDepth(5).setOrigin(0.2,0.2).setInteractive().setAlpha(.6)
            ]).setDepth(4).setAlpha(1);
          this._flag=true;
        }
          //quit button
          this._quit.on("pointerdown", ()=>{
            this._flag=false;
           this._how_to_Container.setAlpha(0);
          });
        
        
        });
    
       }
       update(time: number, delta: number): void {
           
        
     
        
       }
    
      init() {
        this._image = this.add
          .image(512,300,"clock")
          .setAlpha(0).setScale(1.75);
    
        this.tweens.add({
          targets: [this._image],
          alpha: 1,
          duration: 500,
        });
      
        this._loading = this.add
          .bitmapText(this.game.canvas.width / 2, 580,"arcade", "TAP TO START",)
          .setTint(0xffffff)
          .setAlpha(1)
          .setDepth(2)
          .setOrigin(0.5, 1)
          .setInteractive()
          .on( "pointerdown", () => {
          if (!this._flag){
            console.log("start game");
            this.tweens.add({
              targets: [ this._loading],
              alpha: 0,
              duration: 500,
              onComplete: () => {
                this._music.stop();
                 this.scene.start("Intro");
              },
            });}
          });
      }
}