import Bonus from "./Bonus";

export default class BonusCoin extends Bonus{
        //Da fare....

    constructor(params: genericConfig){
        super(params);
        this.setName("Coin");
        this.create();
    }   
    
    create(): void {
        let animation = {
            key: "clockscoin",
            frames: this.anims.generateFrameNumbers(this._config.key,{
            frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]}),
            frameRate: 10,
            yoyo: false,
            repeat: -1
        }
        this.anims.create(animation);
    
        this.play("clockscoin");
        this.setScale(0.5);
    }
}