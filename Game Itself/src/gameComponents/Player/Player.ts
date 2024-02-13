import GamePlay from "../../scenes/GamePlay";
import IPlayer from "./IPlayer";
import Arrow from "../Arrow/Arrow";
import Hud from "../../scenes/Hud";
import BonusBell from "../Bonus/BonusBell";
import Bell from "../Bell/Bell";
import { createLogicalAnd } from "typescript";

export default class Player extends Phaser.GameObjects.Sprite implements IPlayer {
  protected _config: genericConfig;
  protected _scene: GamePlay;
  private _body: Phaser.Physics.Arcade.Body;
  private cursors : Phaser.Types.Input.Keyboard.CursorKeys;
  private spaceBar :  Phaser.Input.Keyboard.Key;
  private _W :  Phaser.Input.Keyboard.Key;
  private _A :  Phaser.Input.Keyboard.Key;
  private _D :  Phaser.Input.Keyboard.Key;

  private __beer : Arrow;
  private direction : number;
  public canShot : boolean = false;
  private HudScene : Hud
  private counterShot : number = 0;
  public canShotBell : boolean = false;
  
  //Parameters
  public velocity: number =  250;
  public jumpHeight: number = 500;

  private animations: Array<{key: string, frames: Array<number>, framerate: number, yoyo: boolean, repeat: number}> = 
    [
      {key: "idle", frames: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23], framerate: 10, yoyo: false, repeat: 0 },
      {key: "run", frames: [ 26, 27, 28, 29, 30, 31, 32, 33 ], framerate: 10, yoyo: false, repeat: 0 },
      {key: "death", frames: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13], framerate: 10, yoyo: false, repeat: 0 },
      {key: "jump", frames: [34, 35, 36], framerate: 10, yoyo: false, repeat: 0 },
      {key: "attack", frames: [0, 1, 2, 3], framerate: 10, yoyo: false, repeat: 0 }
    ];

    private Gamepad: Phaser.Input.Gamepad.Gamepad;
    private buttonA: number = 1;
    private buttonB: number = 3;

    

  constructor(params: genericConfig) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this._scene = <GamePlay>params.scene;
    this._config.scene.physics.world.enable(this);
    this._body = <Phaser.Physics.Arcade.Body>this.body;
    this._body
    .setSize(25, 38, true)
    .setOffset(43,43)
    .setDragX(1000)
    .setCollideWorldBounds(true,0.5)
    .setImmovable(true)
    .setGravity(0,1200)
    .setMaxVelocity(350,750);
    this.cursors = this._scene.input.keyboard.createCursorKeys();
    this.spaceBar = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this._W = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this._A = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this._D = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.setScale(1.5);
    this.setDepth(200);
    this._scene.add.existing(this);

    }

  create() {
    
    
    //this.play("idle");
  }

  createAnimations(){
    this.animations.forEach(element => {

      if(!this._scene.anims.exists(element.key)){
        let animation: Phaser.Types.Animations.Animation =
        {
          key: element.key,
          frames: this.anims.generateFrameNumbers("Player", {frames: element.frames}),
          frameRate: element.framerate,
          yoyo: element.yoyo,
          repeat: element.repeat
        }
        this._scene.anims.create(animation);
      }
    })
  }

  update(time: number, delta: number) {
      this.keyboardInput();
      this.Gamepad = this._scene.input.gamepad.pad1;
      if(this.Gamepad) this.gamepadInput();
      
  }

  keyboardInput(){

    if(this.canShotBell)
      {
        if(Phaser.Input.Keyboard.JustDown(this._W))
        { 
          new Bell({scene: this._scene , x: this.x,  y: this.y , key: "Arrow", direction: this.direction})
        }
      }

      if(this.canShot)
      { 
        if(Phaser.Input.Keyboard.JustDown(this._W))
        { 
          console.log("firing:log")
          if(this.counterShot < 4)
          { 
            this._scene.playThrowBottle();
            this.__beer = new Arrow({scene: this._scene , x: this.x,  y: this.y , key: "Arrow", direction: this.direction});
            this._scene.events.emit("Bonus-beer");
            this.counterShot++;
            if(this.counterShot == 4)
            {
              this.counterShot = 0;
              this.canShot = false;
              this._scene.verifyIsActive = false;
            }
          }
        }  
    }

    if(this.spaceBar.isDown && this._body.blocked.down) 
    { 
      this.play("jump");
      this._scene.playJumpSound();
      this._body.setVelocityY(-this.jumpHeight);
    }
    if(this._A.isDown){
      this.setFlipX(true);
      this.play("run",true);
      this._body.setVelocityX(-this.velocity).setOffset(53,43);
      this.direction = 2;
    }
    else if(this._D.isDown){
      this.setFlipX(false);
      this.play("run",true);
      this._body.setVelocityX(this.velocity).setOffset(43,43);
      console.log(this.velocity);
      this.direction = 1;
    }
    else
    {
      this.play("idle",true);
      this._body.setVelocityX(0);
      //this._body.setVelocityY(0);
    }
  }

  gamepadInput() {
    if (this.Gamepad.leftStick.x > .2) { //DESTRA
      this.setFlipX(false);
      this.play("run",true);
      this._body.setVelocityX(this.velocity).setOffset(43,43);
      console.log(this.velocity);
      this.direction = 1;
    }
    else if (this.Gamepad.leftStick.x < -.2) { //SINISTRA
      this.setFlipX(true);
      this.play("run",true);
      this._body.setVelocityX(-this.velocity).setOffset(53,43);
      this.direction = 2;
    }

    if(this.Gamepad.isButtonDown(this.buttonA) && this._body.blocked.down) { //SU
      this.play("jump", true);
      this._scene.playJumpSound();
      this._body.setVelocityY(-this.jumpHeight);
    }
    if(this.canShot){ 
        if(this.Gamepad.isButtonDown(this.buttonB)){ 
          console.log("firing:log")
          if(this.counterShot < 4){ 
            this._scene.playThrowBottle();
            this.__beer = new Arrow({scene: this._scene , x: this.x,  y: this.y , key: "Arrow", direction: this.direction});
            this._scene.events.emit("Bonus-beer");
            this.counterShot++;
            if(this.counterShot == 4){
              this.counterShot = 0;
              this.canShot = false;
              this._scene.verifyIsActive = false;
            }
          }
        }  
    }
  }

  getBody() : Phaser.Physics.Arcade.Body{
    return this._body;
  }

  updateParameters(index: number){

    if( index == 1 ){
      if ( (this.velocity + 50 ) <= 350)
      this.velocity  += 50;
      console.log("walking speed increased. ");
    }else console.log("maxVelocity reached.");
    
    if( index == 2 ){
      if( (this.jumpHeight + 50) <= 650 ){
        this.jumpHeight += 50;
        console.log("jumpHeight increased. ");
      }else console.log("maxJumpHeight reached. ");
      
    }

  }


  removeItem() {}
}
