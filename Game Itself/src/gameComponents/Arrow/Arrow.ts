import IArrow from "./IArrow";
import GamePlay from "../../scenes/GamePlay";

interface ArrowConfig{
    scene: Phaser.Scene;
    x: number;
    y: number;
    key: string;
    direction: number;
  }


export default class Arrow extends Phaser.GameObjects.Sprite implements IArrow
{   
    protected _config: genericConfig;
    protected _scene: GamePlay;
    private _body: Phaser.Physics.Arcade.Body;
    public direction : number;

    constructor(params : ArrowConfig){
        super(params.scene, params.x , params.y , params.key);
        this._config = params;
        this._scene = <GamePlay>params.scene;
        this._config.scene.physics.world.enable(this);
        this._body = <Phaser.Physics.Arcade.Body>this.body;
        this.direction = params.direction; //Le direzioni possono essere solo destra (1) o sinistra (2)
        this.create();


    }

    create(): void {
        let Arrow = {
        key: "Arrow",
        frames: this.anims.generateFrameNumbers(this._config.key,{
        frames: [0,1,2,3]
        }),
        framerate: 10,
        yoyo: true,
        repeat: 0,
        };
        
        this.anims.create(Arrow);
       
        
        this.play("Arrow").setAlpha(0);
        this.setScale(.03);
        this._body.setSize(650, 155).setOffset(250, 190);

        if(this.direction == 1)
        {
            this._body.setVelocity(350,-400).setGravityY(500);
        }
        else if(this.direction == 2)
        {
            this._body.setVelocity(-350,-400).setGravityY(500);
        }

        this._scene.tweens.add({
            targets: this,
            alpha : 1,
            scale : .07,
            duration: 200
          })

          
        this._scene.addArrow(this);
        this._scene.add.existing(this);

       
    }

    update(): void {
        if(this.x < 0 || this.x > 2862){
            this._scene.removeArrow(this);
        }
    }

}