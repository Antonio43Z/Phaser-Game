import Enemy from "./Enemy";
import Poison from "../Poison/Poison";
import { Game } from "phaser";

export default class FinalEnemy extends Enemy{

    private vel : number = 50;
    private spaceBar :  Phaser.Input.Keyboard.Key;
    private objectPoison : Poison;
    public PoisonScale1 : Phaser.Time.TimerEvent;
    public PoisonScale2 : Phaser.Time.TimerEvent;
    public Poison1 : boolean = true;
    public Poison2 : boolean = false;
    private _music : Phaser.Sound.BaseSound;

    constructor(params: genericConfig){
        super(params);
        this.setName("Snake");
        this.create();
    }

    create(){

        //Settiamo il corpo dell'enemy
        this.spaceBar = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this._body
        .setCollideWorldBounds(true,0.5) //Settiamo il rimbalzo
        .setImmovable(true) //Non andrà oltre la grandezza del canvas che abbiamo definito
        .setGravity(0,1200) //Setto la gravità solo sulla Y in modo che venga praticamente schiacciato verso il bass

        //Settiamo l'animazione di fermo:
        let animation = {
            key: "Boss",
            frames: this.anims.generateFrameNames(
                this._config.key, 
                {frames: [0]
            }),
            frameRate: 10,
            repeat: -1
        }
        this.anims.create(animation);

        this.play("Boss");
        
        this.setScale(.4);

    }

    Shoot(): void {
        if(this.Poison1)
        {
            console.log("poison1");
            
            this.PoisonScale1 = this._scene.time.addEvent(
                {

                    delay:2000,
                    loop:true, 
                    callback: () =>{
                    this.objectPoison = new Poison({scene: this._scene , x: this.x , y: this.y + Phaser.Math.RND.integerInRange(60 , 80) , key: "Poison"});
                    this.playShotBoss();
                }})  
        }
        else if(this.Poison2)
        {
            console.log("poison2");
            
            this.PoisonScale2 = this._scene.time.addEvent(
                {
                    delay:1000,
                    loop:true, 
                    callback: () =>{
                    this.objectPoison = new Poison({scene: this._scene , x: this.x , y: this.y + Phaser.Math.RND.integerInRange(40, 80) , key: "Poison"});
                    this.playShotBoss();
                }})  
        }

    }


    playShotBoss(){
        this._music = this._scene.sound.add("FinalBoss-Sound");
        this._music.play(undefined,{
          loop: false,
          volume: 0.05,
        })
    }




}