import GamePlay from "../../scenes/GamePlay";
import IEnemy from "./IEnemy";


export default class Enemy extends Phaser.GameObjects.Sprite implements IEnemy
{       
    public _config : genericConfig;
    public _scene : GamePlay;
    public  _body : Phaser.Physics.Arcade.Body;
    

    constructor(params: genericConfig){
        super(params.scene, params.x, params.y, params.key);
        this._config = params;
        this._scene = <GamePlay>params.scene;
        this._config.scene.physics.world.enable(this);
        this._body = <Phaser.Physics.Arcade.Body>this.body;
        this._scene.add.existing(this);
        this._scene.addEnemy(this);

        this.setDepth(31);
    }

    changeDirection() : void{
    
    }

    getBody() : Phaser.Physics.Arcade.Body {
        return this._body;
    }

    create(): void {
        
    }

    update(): void {
        
    }


}