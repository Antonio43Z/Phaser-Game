import Arrow from "../gameComponents/Arrow/Arrow";
import Bell from "../gameComponents/Bell/Bell";
import Bonus from "../gameComponents/Bonus/Bonus";
import BonusArrow from "../gameComponents/Bonus/BonusArrow";
import BonusBell from "../gameComponents/Bonus/BonusBell";
import BonusCoin from "../gameComponents/Bonus/BonusCoin";
import Enemy from "../gameComponents/Enemy/Enemy";
import EnemySnake from "../gameComponents/Enemy/EnemySnake";
import FinalEnemy from "../gameComponents/Enemy/FinalEnemy";
import Player from "../gameComponents/Player/Player";
import Poison from "../gameComponents/Poison/Poison";
import Hud from "./Hud";

export default class GamePlay extends Phaser.Scene {

  //GameObjects
  private _sfx: Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
  public player: Player;
  private enemy : FinalEnemy;
  private enemy2 : EnemySnake;
  private img : Phaser.GameObjects.Image

  //Mappa e sfondo
  private map: Phaser.Tilemaps.Tilemap;
  private tileset : Phaser.Tilemaps.Tileset;
  private layer1: Phaser.Tilemaps.TilemapLayer;
  private layer2: Phaser.Tilemaps.TilemapLayer;
  private layer3: Phaser.Tilemaps.TilemapLayer;
  private layer4: Phaser.Tilemaps.TilemapLayer;
  private layer5: Phaser.Tilemaps.TilemapLayer;
  private layer6: Phaser.Tilemaps.TilemapLayer;
  private collision5 : Phaser.Physics.Arcade.Collider;
  private collisionPoison : Phaser.Physics.Arcade.Collider;
  private bg: Phaser.GameObjects.TileSprite;

  //Group
  private _groupEnemy : Phaser.GameObjects.Group;
  private _groupBonus : Phaser.GameObjects.Group;
  private _arrowGroup : Phaser.GameObjects.Group;
  private _beerGroup : Phaser.GameObjects.Group;
  private imgGroup : Phaser.GameObjects.Group;
  private poisonGroup : Phaser.GameObjects.Group;
  private BellGroup : Phaser.GameObjects.Group;
  private map1: Phaser.Tilemaps.Tilemap;
  private cuore:Phaser.GameObjects.Image;





  //Utilities:
  private startX : number;
  private startY : number;
  private level : number = 0;
  
  private _music : Phaser.Sound.BaseSound;
  public  verifyIsActive: boolean = false;
  private HudScene : Hud;
  private enemyParticle : Phaser.GameObjects.Particles.ParticleEmitterManager;
  private counterHit : number = 0;
  //////////////////////////////////////////////////////////////////////////////////
  public c:number=0;
  //////////////////////////////////////////////////////////////////////////////////



  constructor() {
    super({ key: "GamePlay" });
  }

  preload() {}


  init(data : any) 
  { 
    if(data != null && data.level != null)
    {
      this.level = data.level;
    }
    else
    {
      this.level = 0;
    }
  }


  create() {
    this.time.addEvent( {delay: 90000, callback: this.updatecounter ,callbackScope: this, loop: true});
    
    this.enemyParticle = this.add.particles("enemyMove").setDepth(102);

    this.enemyParticle.createEmitter({
      frame: [0, 1],
      //angle: 180,
      speed: { min: -200, max: -300 },
      quantity: 2,
      lifespan: 5000,
      alpha: { start: 1, end: 0 },
      scale: { start: .5, end: 1 },
      rotate: { start: 0, end: 360 },
      gravityY: 800,
      on: false
    })

      this.startX = 150;
      this.startY = 300;
    

    //Group e player istanziati
    this._groupEnemy = this.add.group({runChildUpdate : true});
    this._arrowGroup = this.add.group({runChildUpdate: true});
    this._groupBonus = this.add.group({runChildUpdate: true});
    this._beerGroup = this.add.group({runChildUpdate: true});
    this.imgGroup = this.add.group({runChildUpdate: true});
    this.poisonGroup = this.add.group({runChildUpdate: true});
    this.BellGroup = this.add.group({runChildUpdate: true});
    this.player = new Player({scene: this, x:this.startX, y: this.startY , key: "Player"});
    this.player.createAnimations();
    this.physics.moveTo(this.player,this.startX, this.startY);
    
   

    //Collisioni
    //Player-Enemy
    this.physics.add.collider(this.player, this._groupEnemy, this.CollideWithEnemy, undefined , this)
    //Bonus-Player
    this.physics.add.collider(this.player, this._groupBonus , this.HitBonus , undefined , this);
    //Beer-Enemy
    this.physics.add.collider(this._groupEnemy, this._arrowGroup , this.HitEnemyArrow , undefined , this);
    //Bell-Enemy
    this.physics.add.collider(this.BellGroup , this._groupEnemy , this.HitBoss , undefined, this);
    //Poison-Player
    this.collisionPoison = this.physics.add.collider(this.player , this.poisonGroup , this.KillPlayer , undefined, this);



   //Creiamo la mappa e settiamo i nemici
    this.createMap();
    this.setupEnemies();
  }


  update(time: number, delta: number) {
    this.player.update(time, delta);
   /* if(this.level == 3 && this._groupEnemy.countActive() == 0)
    {
      this.layer5.setAlpha(1);
    }*/
  }

  //MAPPA:


  createMap(){
    
    this.map = this.make.tilemap({key: "level-" + this.level});

    if(this.level != 4 ) this.tileset = this.map.addTilesetImage("Tileset","Map" + this.level).setSpacing(0);

    if(this.level == 1)
    {
      this.startX = 100;
      this.startY = 500;
      this.player.setPosition(this.startX,this.startY);
      this.cameras.main.startFollow(
        this.player,
        true,
        1,
        0.5,
        0,
        0);
      
    }
    else if(this.level == 0)
    {
      this.cameras.main.startFollow(
        this.player,
        true,
        1,
        0,
        0,
        0);    
    }
    else if(this.level == 2)
    {
      this.startX = 100;
      this.startY = 500;
      this.player.setPosition(this.startX,this.startY);
      this.cameras.main.startFollow(
        this.player,
        true,
        1,
        0.5,
        0,
        0);
    }
    else if(this.level == 3)
    { 
        this.startX = 100;
        this.startY = 20;
        
        this.player.setPosition(this.startX, this.startY);
        this.cameras.main.startFollow(
          this.player,
          true,
          1,
          1,
          0,
          0);
    }
    else if(this.level == 4){

      this.map = this.make.tilemap({key: "level-4", tileWidth: 32, tileHeight: 32});
      let tileset1 = this.map.addTilesetImage("caverna_bg","caverna_bg");
      let tileset2 = this.map.addTilesetImage("mainlev_build","mainlev_build");
      let layer1_1= this.map.createLayer("Livello tile 1",tileset1,0,0);
      let layer1_4= this.map.createLayer("Livello tile 4",tileset2,0,0);
      let layer1_2= this.map.createLayer("Livello tile 2",tileset2,0,0);
      let layer1_3= this.map.createLayer("Livello tile 3",tileset2,0,0);
      layer1_2.setCollisionByProperty({"collision": true});
      layer1_3.setCollisionByProperty({"collision": true});
      this.physics.add.collider(this.player, layer1_2, () => {}, undefined, this);
      this.physics.add.collider(this._groupEnemy, layer1_2, () => {}, undefined, this);
      this.physics.add.collider(this._groupBonus, layer1_2, () => {}, undefined, this);
      this.physics.add.collider(this.player, layer1_3,() => this.events.emit("Win-Game"), undefined, this);


      new BonusBell({scene: this, x: this.player.x , y: 0 ,key: "Arrow"})
      this.enemy = new FinalEnemy({scene: this , x: 900, y: 0 , key: "Boss"});
      this.counterHit = 0;
      this.shootBoss();

      this.cameras.main.startFollow(
        this.player,
        true,
        1,
        0.5,
        0,
        0);

    }
    if(this.level != 4){
      this.layer1  = this.map.createLayer("World-0",this.tileset ,0,0).setDepth(101).setAlpha(1);
      this.layer2 =  this.map.createLayer("Collsion",this.tileset,0,0).setDepth(100).setAlpha(0);
      this.layer3 =  this.map.createLayer("Block-Enemy",this.tileset,0,0).setDepth(100).setAlpha(0);

      if(this.level != 3)
      {
        this.layer4 =  this.map.createLayer("KillPlayer",this.tileset,0,0).setDepth(100).setAlpha(1);
      }
      else
      {
        this.layer4 =  this.map.createLayer("KillPlayer",this.tileset,0,0).setDepth(100).setAlpha(0);
      }
      this.layer5 =  this.map.createLayer("NewLevel",this.tileset,0,0).setDepth(102).setAlpha(0);
      this.layer6 =  this.map.createLayer("NewLevel-1",this.tileset,0,0).setDepth(100).setAlpha(0);
    



    



      
      //Settiamo la collisione per i layer che la richiedono
      this.layer2.setCollisionByProperty({Collide:true});
      this.layer3.setCollisionByProperty({Collide:true});
      this.layer4.setCollisionByProperty({Collide:true});
      this.layer5.setCollisionByProperty({NewLevel:true});
      this.layer6.setCollisionByProperty({Collide:true});

      //Collisione player - mappa layout collisione
      this.physics.add.collider(this.player,this.layer2,() => {},undefined,this);
      this.physics.add.collider(this.player,this.layer4,() => {this.events.emit("lost-life"); this.player.setPosition(this.startX,this.startY)},undefined,this);
      this.physics.add.collider(this.player,this.layer5,this.nextLevel,undefined,this);

      this.collision5 = this.physics.add.collider(this.player,this.layer6,this.removeBlock,undefined,this);
      

      //Collisione enemy - mappa layout collisione
      this.physics.add.collider(this._groupEnemy,this.layer2,() => {},undefined,this);
      //Collisione enemy - mappa layout block-enemy
      this.physics.add.collider(this._groupEnemy,this.layer3,this.EnemyLogic,undefined,this)
      //Collisione bonus- mappa layout collisione
      this.physics.add.collider(this._groupBonus,this.layer2,() => {},undefined,this)
      //Collisione birra - mappa layout collisione
      this.physics.add.collider(this._arrowGroup,this.layer2, this.GroundBreak ,undefined,this)
      //Poison-Layer
      this.physics.add.collider(this.poisonGroup,this.layer2,(poison:any,layer:any) => {this.removePoison(poison)},undefined,this)
    }

    if(this.level != 4)this.bg = this.add.tileSprite(0, 0, 1024,  600, "bg-" + this.level).setOrigin(0).setScrollFactor(0);
    this.cameras.main.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);
    this.physics.world.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);

    }

  /* ----------------------------------------------------------------------------------------------------------------------------- */
  //GROUP ENEMY:
  addEnemy(enemy:Enemy){
    this._groupEnemy.add(enemy);
  }

  removeEnemy (enemy: Enemy){
    this._groupEnemy.remove(enemy,true,true);
  }


  /* ----------------------------------------------------------------------------------------------------------------------------- */
  //GROUP BONUS:

  addBonus(bonus: Bonus){
    this._groupBonus.add(bonus);
  }

  removeBonus(bonus: Bonus){
    this._groupBonus.remove(bonus,true,true);
  }

    /* ----------------------------------------------------------------------------------------------------------------------------- */

  addArrow(arrow : Arrow){
    this._arrowGroup.add(arrow);
  }

  removeArrow(arrow: Arrow){
    this._arrowGroup.remove(arrow,true,true);
  }
    /* ----------------------------------------------------------------------------------------------------------------------------- */
  //GROUP POISON:
  addPoison(poison : Poison){
    console.log("Added");
    this.poisonGroup.add(poison);
  }

  removePoison(poison: Poison){
    console.log("Removed");
    this.poisonGroup.remove(poison,true,true);
  }
      /* ----------------------------------------------------------------------------------------------------------------------------- */
  //GROUP BELL:
  addBell(bell : Bell){
    console.log("Added");
    this.BellGroup.add(bell);
  }

  removeBell(bell: Bell){
    console.log("Removed");
    this.BellGroup.remove(bell,true,true);
  }
  /* ----------------------------------------------------------------------------------------------------------------------------- */
  //IMMAGINI GROUP:
  addImage(image : Phaser.GameObjects.Image){
    this.imgGroup.add(image);
  }

  removeImage(image:Phaser.GameObjects.Image ){
    this.imgGroup.remove(image,true,true);

  }


  /* ----------------------------------------------------------------------------------------------------------------------------- */
  //METODI PER ENEMY:
  setupEnemies(){
    let obj_layer : Phaser.Tilemaps.ObjectLayer = this.map.getObjectLayer("enemies");

    let enemies: any = [];

    if(obj_layer != null){

      enemies = obj_layer.objects as any[];


      enemies.forEach((tile: Phaser.Tilemaps.Tile) => {
          
          if(tile.properties[0].name == "enemies" && tile.properties[0].value == true)
          { 
            this.enemy2 = new EnemySnake({scene: this , x: tile.x , y: tile.y-10, key: "enemyMove"});  
          }
          else if(tile.properties[0].name == "enemies2" && tile.properties[0].value == true)
          {
            console.log("prova");
            
            this.enemy2 = new EnemySnake({scene: this , x: tile.x , y: tile.y , key: "enemyMove"});
            this.counterHit = 0;
          }
      });
    }
    else console.log("niente");
    

  }

  EnemyLogic(enemy:any) {
    enemy.changeDirection();
  }
  /* ----------------------------------------------------------------------------------------------------------------------------- */
  //METODI PER BONUS:
  generateBonus(enemy :any){

    let casualBonus = Phaser.Math.RND.integerInRange(0,20);
    console.log(casualBonus);

    if(casualBonus >= 0 && casualBonus <= 15)
    {
      new BonusCoin({scene: this , x: enemy.x -10 , y: enemy.y - 140 , key: "clockscoin"});

    }
    else if(!this.verifyIsActive)
    {
      new BonusArrow({scene: this, x: enemy.x - 20, y: enemy.y - 70 , key: "Arrow"});
      this.verifyIsActive = true;
    }
  }

  /* ----------------------------------------------------------------------------------------------------------------------------- */
  //METODI LOGICA GIOCO

  KillPlayer(player:any , poison : any){
    if(this.level != 3)this.player.setPosition(this.startX, this.startY);
    this.events.emit("lost-life");
    this.removePoison(poison);
  }



  CollideWithEnemy(player: any , enemy: any){

    let _enemy = <Enemy>enemy;
    let _player = <Player>player;

    if(_player.getBody().touching.down && _enemy.getBody().touching.up)
    { 

      this.enemyParticle.emitParticleAt(enemy.x, enemy.y);
      this.playEnemySound();
      this.generateBonus(enemy);
      this.removeEnemy(enemy);
    }
    else
    { 
      this.player.setPosition(this.startX, this.startY);
      this.events.emit("lost-life");
    }
  }

  HitBonus(player:any,bonus:any)
  { 

    if(bonus.name == "Coin")
    {
      if(bonus._isActive())
      { 
        this.playCoinsSound();
        this.events.emit("increase-score",10);
        this.removeBonus(bonus);
      }
    }
    else if(bonus.name == "IncrementDamage")
    {
      if(bonus._isActive())
      { 
        this.player.canShot = true;
        this.events.emit("Bonus-beer");
        this.removeBonus(bonus);
      }
    }
    else if(bonus.name == "BonusBell")
    { 
      this.player.canShotBell = true;
      this.playBellSound();
      this.removeBonus(bonus);
    }
  }


  HitBoss(bell:any , enemy : any){ //Hit dell'enemy con la birra
    let _enemy = <Enemy>enemy;
    let _bell = <Bell>bell;

    this.removeBell(_bell);

    if(this.counterHit == 4)
    { 
      this.enemy.setScale(.3);
    }
    else if(this.counterHit == 8)
    { 
      this.enemy.PoisonScale1.destroy();
      this.enemy.Poison1 = false;
      this.enemy.Poison2 = true;
      this.enemy.setScale(.2);
      this.enemy.Shoot();
    }
    else if (this.counterHit == 12)
    { 
      this.removeEnemy(_enemy);
      this.enemy.PoisonScale2.destroy();
    }
    if(!this.tweens.isTweening(enemy))
      this.add.tween({
        targets: enemy,
        duration: 500,
        alpha: .4,
        repeat: 0,
        yoyo: true
      });
    this.counterHit++;

  }


  HitEnemyArrow(enemy:any , arrow: any){ //Hit dell'enemy con la birra
    let _enemy = <Enemy>enemy;
    let _Arrow = <Arrow>arrow;

    this.enemyParticle.emitParticleAt(enemy.x,enemy.y);
    this.playEnemySound();
    this.removeEnemy(_enemy);
    this.removeArrow(_Arrow);
  }

  GroundBreak(arrow:any , layer : any){
    this.removeArrow(arrow);
  }


  removeBlock(player:any,tile:any){
    if(this._groupEnemy.countActive() == 0)
    {  
      this.collision5.destroy(); //Tolgo il blocco dal portale per consentire al player di passare al livello successivo
    }
  }
  updatecounter(){
    if(this.c<4)this.c++;
    console.log(this.c);
    console.log('star lost');
 }


  nextLevel(){
      if(this.level == 4)
      { 
        this.events.emit("Win-Game");
      }
      else
      {
        this.events.emit("level-completed"); 
      }
  }

  shootBoss(){
    this.enemy.Shoot();
    //this.collision5.destroy();
  }


  //SUONI
  
  playBreakBottle()
  {
    this._music = this.sound.add("breakBottle");
    this._music.play(undefined,{
      loop: false,
      volume: 0.05,
    })
  }

  playEnemySound()
  {
    this._music = this.sound.add("EnemyDown");
    this._music.play(undefined,{
      loop: false,
      volume: 0.05,
    })
  }

  playCoinsSound()
  {
    this._music = this.sound.add("CoinSound");
    this._music.play(undefined,{
      loop: false,
      volume: 0.05,
    })
  }


  playJumpSound()
  {
    this._music = this.sound.add("JumpSound");
    this._music.play(undefined,{
      loop: false,
      volume: 0.15,
    })
  }

  playLostLife(){

    this._music = this.sound.add("LostLife");
    this._music.play(undefined,{
      loop: false,
      volume: 0.15,
    })
  }

  playThrowBottle(){
    this._music = this.sound.add("ThrowBottle");
    this._music.play(undefined,{
      loop: false,
      volume: 0.15,
    })
  }

  playBellSound(){
    this._music = this.sound.add("Bell-song");
    this._music.play(undefined,{
      loop: false,
      volume: 0.15,
    })
    
  }
}
