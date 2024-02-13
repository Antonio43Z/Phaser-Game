import IBonus from "./IBonus";
import GamePlay from "../../scenes/GamePlay";


export default class Bonus extends Phaser.GameObjects.Sprite implements IBonus
{   
    protected _config: genericConfig;
    protected _scene: GamePlay;
    private _body: Phaser.Physics.Arcade.Body;
    private isActive : boolean = false;

    constructor(params: genericConfig)
    {
        super(params.scene, params.x , params.y , params.key);
        this._config = params;
        this._scene = <GamePlay>params.scene;
        this._config.scene.physics.world.enable(this);
        this._body = <Phaser.Physics.Arcade.Body>this.body;
        this._scene.add.existing(this); //Aggiungiamo alla scena
        this._scene.addBonus(this); //Aggiungiamo al group

        this._body
        .setGravity(0,1200) //Gravità in modo che rimanga sul terreno quando viene generato
        .setVelocityY(100) //Spostamento verso l'alto quando viene generato
        .setBounce(.3,.3) //Rimbalzo
        .setImmovable(true) //In maniera tale che non venga spostato da altri game object

        this._scene.time.addEvent({delay:300, callback: () =>{
            this.isActive = true;
        }})
    }

    _isActive() : boolean{
        return this.isActive;
    }

    create(): void {
        
    }

    update(): void {
        
    }
}