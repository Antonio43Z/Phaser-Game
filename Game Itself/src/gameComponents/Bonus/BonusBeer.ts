import Bonus from "./Bonus";

export default class BonusBeer extends Bonus{
        //Da fare....

    constructor(params: genericConfig){
        super(params);
        this.setName("IncrementDamage");
        this.create();
    }   
    
    create(): void {
        let animation = {
            key: "",
            frames: this.anims.generateFrameNumbers(this._config.key,{
            frames: [0,1,2]}),
            frameRate: 6,
            yoyo: false,
            repeat: -1
        }
        this.anims.create(animation);
    
        this.play("bonus-beer-anim");
        this.setScale(0.4);
        this.setDepth(30);
    }
}