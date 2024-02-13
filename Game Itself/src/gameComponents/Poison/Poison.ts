import GamePlay from "../../scenes/GamePlay";
import FinalEnemy from "../Enemy/FinalEnemy";


export default class Poison extends Phaser.GameObjects.Sprite 
{   
    protected _config: genericConfig;
    protected _scene: GamePlay;
    private _body: Phaser.Physics.Arcade.Body;
    private canShoot : boolean = false;

      

    constructor(params : genericConfig){
        super(params.scene, params.x , params.y , params.key);
        this._config = params;
        this._scene = <GamePlay>params.scene;
        this._config.scene.physics.world.enable(this);
        this._body = <Phaser.Physics.Arcade.Body>this.body;

        

        this.create();


    }

    create(): void {
        let PoisonAnims = {
        key: "PoisonThrow",
        frames: this.anims.generateFrameNumbers(this._config.key,{
        frames: [0,1]
        }),
        framerate: 4,
        duration: 5000,
        yoyo: false,
        repeat: 1,
        };
        
        this.anims.create(PoisonAnims);

        PoisonAnims = {
            key: "PoisonCrash",
            frames: this.anims.generateFrameNumbers(this._config.key,{
            frames: [3,4,5,6,7,8,9]
            }),
            framerate: 10,
            duration: 1000,
            yoyo: false,
            repeat: -1,
        };

        this.anims.create(PoisonAnims);


        this._scene.tweens.add({
            targets: this,
            alpha : 1,
            duration: 200
          })

        this._body.setVelocityX(-400);
        this.play("PoisonCrash");
        this.setScale(3);
        this._body.setGravityY(0);
        this._scene.addPoison(this);
        this._scene.add.existing(this);
    }

    getState() : boolean{
        return this.canShoot;
    }



    update(): void {
        if(this.x < 0)
        {
            this._scene.removePoison(this);
        }
    }
}