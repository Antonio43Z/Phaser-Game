import Bonus from "./Bonus";

export default class BonusBell extends Bonus{

    constructor(params: genericConfig){
        super(params);
        this.setName("BonusBell");
        this.createBell();
    }   
    
    createBell(): void {
        let animation = {
            key: "Arrow",
            frames: this.anims.generateFrameNumbers(this._config.key,{
            frames: [0,1]}),
            frameRate: 6,
            yoyo: false,
            repeat: -1
        }
        this.anims.create(animation);
    
        this.play("Arrow");
        this.setScale(2);
        this.setDepth(30);
    }
}