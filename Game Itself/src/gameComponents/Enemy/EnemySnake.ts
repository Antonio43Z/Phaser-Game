import Enemy from "./Enemy";


export default class EnemySnake extends Enemy{

    private vel : number = 50;


    constructor(params: genericConfig){
        super(params);
        this.setName("Snake");
        this.create();
    }

    create(){

        //Settiamo il corpo dell'enemy
         
        this._body
        .setSize(100, 120)
        .setCollideWorldBounds(true,0.5) //Settiamo il rimbalzo
        .setImmovable(true) //Non andrà oltre la grandezza del canvas che abbiamo definito
        .setGravity(0,1200) //Setto la gravità solo sulla Y in modo che venga praticamente schiacciato verso il basso
        .setMaxVelocity(250,550) //Setto il valore massimo di velocità
        .setVelocityX(this.vel);  //Setto la velocità inizialmente a 50

        //Settiamo l'animazione di fermo:
        let animation = {
            key: "enemyMove",
            frames: this.anims.generateFrameNumbers(this._config.key, {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}),
            frameRate: 10,
            repeat: -1
        }
        this.anims.create(animation);

        this.play("enemyMove");
        this.setScale(.45);

    }

    changeDirection(): void {
        if(this.vel == 50)
        {
            this.vel = -50;
            this.setFlipX(true);
        }
        else
        {
            this.vel = 50
            this.setFlipX(false);
        }

        this._body.setVelocityX(this.vel);
    }


}