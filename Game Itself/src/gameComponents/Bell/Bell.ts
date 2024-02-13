import GamePlay from "../../scenes/GamePlay";

interface BellConfig{
    scene: Phaser.Scene;
    x: number;
    y: number;
    key: string;
    direction: number;
  }


export default class Bell extends Phaser.GameObjects.Sprite
{   
    protected _config: genericConfig;
    protected _scene: GamePlay;
    private _body: Phaser.Physics.Arcade.Body;
    public direction : number;

    constructor(params : BellConfig){
        super(params.scene, params.x , params.y , params.key);
        this._config = params;
        this._scene = <GamePlay>params.scene;
        this._config.scene.physics.world.enable(this);
        this._body = <Phaser.Physics.Arcade.Body>this.body;

        this.direction = params.direction; //Le direzioni possono essere solo destra (1) o sinistra (2)


        this.create();

    }

    create(): void {
        let imageBell = {
        key: "Arrow",
        frames: this.anims.generateFrameNumbers(this._config.key,{
        frames: [0,1,2,3]
        }),
        framerate: 1,
        yoyo: false,
        repeat: -1,
        };
        
        this.anims.create(imageBell);
       
        this.play("Arrow").setAlpha(0).setScale(0.1).setDepth(30);

        if(this.direction == 1)
        {
            this._body.setVelocity(400,-400).setGravityY(800);
        }
        else if(this.direction == 2)
        {
            this._body.setVelocity(-400,-400).setGravityY(800);
        }

        this._scene.tweens.add({
            targets: this,
            alpha : 1,
            duration: 200
          })

          
        this._scene.addBell(this);
        this.setScale(.07);
        this._scene.add.existing(this);
          

       
    }

    update(): void {}

}

