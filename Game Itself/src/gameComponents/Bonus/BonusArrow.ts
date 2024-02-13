import Bonus from "./Bonus";

export default class BonusArrow extends Bonus{
        //Da fare....

    constructor(params: genericConfig){
        super(params);
        this.setName("IncrementDamage");
        this.create();
    }   
    
    create(): void {
        let animation = {
            key: "Arrow",
            frames: this.anims.generateFrameNumbers(this._config.key,{
            frames: [0,1,2,3]}),
            frameRate: 10,
            yoyo: true,
            repeat: 1
        }
        this.anims.create(animation);
    
        this.play("Arrow");
        this.setScale(.07);
        this.setDepth(30);
    }
}