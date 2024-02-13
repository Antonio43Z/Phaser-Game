
export default class Highscore extends Phaser.Scene {
    private _scene:string;
    private log_out:Phaser.GameObjects.BitmapText;
    private txt:Phaser.GameObjects.BitmapText;
    private playerText: Phaser.GameObjects.BitmapText ;
    private log: Phaser.GameObjects.BitmapText ;
    private inp1 :Phaser.GameObjects.Image;
    public score :number=0;
    public login: boolean=false;
        constructor ()
        {
            super({ key: 'Highscore'});
    
            
        }
    
        init(data: any){
            console.log(data);
           this._scene=data.scena;
        }
    
        create ()
        {
            this.add
            .image(512,300,"clock")
            .setAlpha(1).setScale(1.75);
            var graphics= this.make.graphics({ x:0,y:0,add:false});
            graphics.fillStyle(0x000000, .3);
            graphics.fillRect(0,0,1024,600);
            graphics.generateTexture("layer", 1024, 600);
            this.add.image(512,300,"layer");
            this.add.image(this.game.canvas.width /2-50, this.game.canvas.height /2,"popup").setDepth(1);
            this.log=this.add
            .bitmapText(this.game.canvas.width / 2-19,this.game.canvas.width / 2-400,  "CostumFont", "Submit Name",60)
            .setAlpha(1)
            .setDepth(5)
            .setLeftAlign()
            .setTintFill(0x000000)
            .setOrigin(.5,1);
            this.inp1=this.add.image(this.game.canvas.width / 2,360,"input").setDepth(5).setScale(1.5).setOrigin(.4,.4)
            
            this.txt=this.add.bitmapText(290,this.game.canvas.width / 2-325,'CostumFont', 'YOUR NICKNAME:').setTint(0x8f0a00).setDepth(2);
    
            this.playerText = this.add.bitmapText(322, 300, 'CostumFont', '').setTint(0x3a4466).setDepth(200);
    
            //  Do this, otherwise this Scene will steal all keyboard input
            this.input.keyboard.enabled = false;
    
            this.scene.launch('InputPanel');
            this.scene.bringToTop('InputPanel');
    
            let panel = this.scene.get('InputPanel');
    
            //  Listen to events from the Input Panel scene
            panel.events.on('updateName', this.updateName, this);
            panel.events.on('submitName', this.submitName, this);
            if (this.registry.get('login')==true){this.account()}
            var quit=this.add.image(this.game.canvas.width /2+65, this.game.canvas.height /2-225, "quit")
           .setDepth(5).setScale(0.7).setOrigin(0.2,0.2).setInteractive().setAlpha(.6)
        
          
            quit.on("pointerdown", () =>{

                this.scene.stop('InputPanel');
                this.scene.start(this._scene);
                this.scene.stop('Highscore');
            
            });
        }
    
        submitName ()
        {
            this.scene.stop('InputPanel');
            this.registry.set('user',this.playerText.text);
            this.login=true;
            this.registry.set('login',this.login);
            console.log(this.registry.get('user'));
            this.account()
        }
        account(){
            this.txt.setY(350);
            this.log.setText("Account")
            this.txt.setFont("arcade");
            (this.registry.get("score")==undefined)?this.score=0:this.score=this.registry.get("score")
            this.txt.setText("Score: "+this.score);
            this.playerText.destroy(true);
            var img=this.add.image(300,180,"account").setDepth(555).setScale(.5).setOrigin(0);
            var user=this.add.bitmapText(450,200,"CostumFont",this.registry.get('user')).setDepth(5555).setTint(0x000000);
            this.inp1.destroy();/*
            this.log_out=this.add.bitmapText(450,230,"CostumFont","Logout")
            .setTint(0x8f0a00).setDepth(2).setInteractive().on("pointerdown",()=>{
                this.registry.set('login',false);
                this.scene.stop('Highscore');
            });*/
            
        }
    
        updateName (name:string)
        {
            this.playerText.setText(name);
        }
    
    }
    