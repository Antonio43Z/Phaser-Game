export let GameData: any = {
  globals: {
    leaderboard: false,
    gameWidth: 1024,
    gameHeight: 600,
    bgColor: "#000000",
    debug: false,
  },

  preloader: {
    bgColor: "#000000",
    image: "hyperuranium",
    imageX: 512,
    imageY: 300,
    scale: 1,
    loadingText: "",
  },

  tilemaps : [
    {
      key: "level-0",
      path: "assets/map/level-0.json"
    },
    {
      key: "level-1",
      path: "assets/map/level-1.json"
    },
    {
      key: "level-2",
      path: "assets/map/level-2.json"
    },
    {
      key: "level-3",
      path: "assets/map/level-3.json"
    },
    {
      key: "level-4",
      path: "assets/map/level-4.json"
    }
  ],


  spritesheets: [
    
    {
      name: "caverna_bg",
      path: "assets/map/caverna/caverna_bg.png",
      width: 32,
      height: 32,
      spacing: 2,
      margin: 1
    },
    {
      name: "mainlev_build",
      path: "assets/map/caverna/mainlev_build.png",
      width: "32",
      height: 32,
      spacing: 2,
      margin: 1
    },
    
    {
      name: "Player",
      path: "assets/images/main_character.png",
      width: 120,
      height: 80,
      frames: 37
    },
    {
      name: "enemyMove",
      path: "assets/images/dummy.png",
      width: 115, //45
      height: 120, //32
      frames: 10
    },
    {
      name: "clockscoin",
      path: "assets/images/clocks-coin.png",
      width: 64,
      height: 64,
      frames: 16
    },
    {
      name: "Poison",
      path: "assets/images/Poison.png",
      width: 20,
      height: 20,
      frames: 10
    },
    {
      name: "Bell",
      path: "assets/images/Bell.png",
      width: 45,
      height: 40,
      frames: 2
    },
    {
      name: "Arrow",
      path: "assets/images/Arrow.png",
      width: 1112,
      height: 540,
      frames: 4
    },
    {
      name: "Boss",
      path: "assets/images/BOSS.png",
      width: 388,
      height: 643,
      frames: 1
    }
  ],

  images: [
    { name: "play", path: "assets/images/play.png" },
    { name: "mute", path: "assets/images/mute.png" },
    { name: "logo", path: "assets/images/logo.png" },
    { name: "Hyperuranium", path: "assets/images/Hyperuranium.png" },
    { name: "account", path: "assets/images/weirdclock.jpg" },
    { name: "ypad", path: "assets/images/y-gamepad.png" },
    { name: "bpad", path: "assets/images/b-gamepad.png" },
    { name: "stick", path: "assets/images/levette.png" },
    { name: "loginbutton", path: "assets/images/login-button.png" },
    { name: "shopbutton", path: "assets/images/shop-button.png" },
    { name: "Map0", path: "assets/map/Tileset.png"},
    { name: "Map1", path: "assets/map/Tileset2.png"},
    { name: "Map2", path: "assets/map/Tileset3.png"},
    { name: "Map3", path: "assets/map/Tileset4.png"},
    { name: "bg-0", path: "assets/images/bg-0.png"},
    { name: "bg-1", path: "assets/images/bg-1.png"},
    { name: "bg-2", path: "assets/images/bg-2.png"},
    { name: "bg-3", path: "assets/images/bg-3.png"},
    { name: "bg-black",path: "assets/images/bg-black.jpg"},
    { name: "Hearth", path: "assets/images/hearth.png"},
    { name:"bpause", path:"assets/images/bpause.png"},
    { name:"bgtext", path:"assets/images/bgtext.png"},
    { name:"bgmenu", path:"assets/images/bgmenu.png"},
    { name: "cuore", path:"assets/images/shop-heart.png" },
    { name: "buyjump", path:"assets/images/shop-jump.png" },
    { name: "buyvel", path:"assets/images/shop-velocity.png"},
    { name: "shop_popup", path:"assets/images/shop-popup.png"},
    { name: "shop", path:"assets/images/shop.png"},
    { name: "ArrowFrame", path: "assets/images/arrowpng.png" },
    {
      name: "Fermi",
      path: "assets/icons/logo_120.png",
    },{
      name: "popup",
      path: "assets/images/popup.png",
    },{
      name: "game-over",
      path: "assets/images/disintegrazione_pers_memoria.png",
    },{
      name: "p_button",
      path: "assets/images/pause_button.png",
    },{
      name: "game_completed",
      path: "assets/images/game-completed.png",
    },{
      name: "star",
      path: "assets/images/star.png",
    },{
      name: "star_empty",
      path: "assets/images/star-empty.png",
    },{
      name: "exit",
      path: "assets/images/exit.png",
    },{
      name: "button",
      path: "assets/images/button.png",
    },{
      name: "credits",
      path: "assets/images/credits.png",
    },{
      name: "settings",
      path: "assets/images/settings.png",
    },{
      name: "how to",
      path: "assets/images/how to.png",
    },{
      name: "A",
      path: "assets/images/A.png",
    },{
      name: "D",
      path: "assets/images/D.png",
    },{
      name: "S",
      path: "assets/images/S.png",
    },{
      name: "SPACE",
      path: "assets/images/SPACE.png",
    },{
      name: "SHIFT",
      path: "assets/images/Shift.png",
    },{
      name: "rotella1",
      path: "assets/images/rotella1.png",
    },{
      name: "rotella2",
      path: "assets/images/rotella2.png",
    },{
      name: "input",
      path: "assets/images/input.png",
    },{
      name: "submit",
      path: "assets/images/submit.png",
    },{
        name: "right",
        path: "assets/images/right.png",
      },{
        name: "casella",
        path: "assets/images/casella.png", 
      },{
          name: "click-sinistro",
          path: "assets/images/click-sinistro.png",
  
      },{
        name: "click-destro",
        path: "assets/images/click-destro.png",
  
    },{
      name: "quit",
      path: "assets/images/quit.png",
    },{
      name: "main_logo",
      path: "assets/images/main_logo.png",
    },{
      name: "clock",
      path: "assets/images/clockstart.png"
    }

    
  ],

  atlas: [
    
  ],

 
  sounds: [
      {
      name: "music0",
      paths: ["assets/sounds/irish-song.ogg", "assets/sounds/irish-song.m4a"],
      volume: 1,
      loop: false,
      frame: 1
    },
    {
      name: "breakBottle",
      paths: ["assets/sounds/bottle-break.ogg", "assets/sounds/bottle-break.m4a"],
      volume: 1,
      loop: false,
      frame: 1
    },
    {
      name: "EnemyDown",
      paths: ["assets/sounds/eliminazione-nemico.ogg", "assets/sounds/eliminazione-nemico.m4a"],
      volume: 1,
      loop: false,
      frame: 1
    },   
    {
      name: "CoinSound",
      paths: ["assets/sounds/coin.ogg", "assets/sounds/coin.m4a"],
      volume: 1,
      loop: false,
      frame: 1
    },
    {
      name: "JumpSound",
      paths: ["assets/sounds/salto.ogg", "assets/sounds/salto.m4a"],
      volume: 1,
      loop: false,
      frame: 1
    },
    {
      name: "LostLife",
      paths: ["assets/sounds/LostLife.ogg", "assets/sounds/LostLife.m4a"],
      volume: 1,
      loop: false,
      frame: 1
    },    
    {
      name: "GameOver",
      paths: ["assets/sounds/GameOver.ogg", "assets/sounds/GameOver.m4a"],
      volume: 1,
      loop: false,
      frame: 1
    },
    {
      name: "WinGame",
      paths: ["assets/sounds/WinGameSound.ogg", "assets/sounds/WinGameSound.m4a"],
      volume: 1,
      loop: false,
      frame: 1
    },
    {
      name: "ThrowBottle",
      paths: ["assets/sounds/ThrowBottle.ogg", "assets/sounds/ThrowBottle.m4a"],
      volume: 1,
      loop: false,
      frame: 1
    },
    {
      name: "Level-2-song",
      paths: ["assets/sounds/canzone_livello2.ogg", "assets/sounds/canzone_livello2.m4a"],
      volume: 1,
      loop: false,
      frame: 1
    },
    {
      name: "Level-3-song",
      paths: ["assets/sounds/canzone_livello3.ogg", "assets/sounds/canzone_livello3.m4a"],
      volume: 1,
      loop: false,
      frame: 1
    },
    {
      name: "Bell-song",
      paths: ["assets/sounds/campana.ogg", "assets/sounds/campana.m4a"],
      volume: 1,
      loop: false,
      frame: 1
    },
    {
      name: "FinalBoss-Sound",
      paths: ["assets/sounds/suono_boss.ogg", "assets/sounds/suono_boss.m4a"],
      volume: 1,
      loop: false,
      frame: 1
    },
    {
      name: "FinalLevel-Sound",
      paths: ["assets/sounds/musica_livello_fin.ogg", "assets/sounds/musica_livello_fin.m4a"],
      volume: 1,
      loop: false,
      frame: 1
    },
    
    //Musiche e sottofondi
    {
      name:"lvlcomplete",
      paths:["assets/sounds/Ethereal.ogg","assets/sounds/Ethereal.m4a"],
      volume: 1,
      loop:false,
      frame: 1
    },
    {
      name: "gocce",
      paths: ["assets/sounds/gocce grotta.ogg", "assets/sounds/gocce grotta.m4a"],
      volume: 1,
      loop: false,
      frame: 1
    },
    {
      name: "menusong",
      paths: ["assets/sounds/Menu/Beethoven-Moonlight-Sonata-_1st-Movement_.ogg", "assets/sounds/Menu/Beethoven-Moonlight-Sonata-_1st-Movement_.m4a"],
      volume: 1,
      loop: false,
      frame: 1
    },
    {
      name: "medioevosong",
      paths: ["assets/sounds/Medioevo/Medieval-Music-–-Wild-Boars-Inn.ogg", "assets/sounds/Medioevo/Medieval-Music-–-Wild-Boars-Inn_1.m4a"],
      volume: 1,
      loop: false,
      frame: 1
    },
    {
      name: "gameoversong",
      paths: ["assets/sounds/Piano-6.ogg", "assets/sounds/Piano-6.m4a"],
      volume: 1,
      loop: false,
      frame: 1
    },
    {
      name: "winsong",
      paths: ["assets/sounds/Zelda Main Theme Song.ogg", "assets/sounds/Zelda Main Theme Song.m4a"],
      volume: 1,
      loop: false,
      frame: 1
    },
    {
      name: "classicasong",
      paths: ["assets/sounds/Era Classica/Dvorák - Serenade for Strings in E Major, Op. 22, B. 52 II. Tempo di valse.ogg", "assets/sounds/Era Classica/Dvorák - Serenade for Strings in E Major, Op. 22, B. 52 II. Tempo di valse.m4a"],
      volume: 1,
      loop: false,
      frame: 1
    },
    {
      name: "cavernasong",
      paths: ["assets/sounds/Caverna/Beethoven Piano Sonata Pathétique No.8 in C minor, Op.13 (online-audio-converter.com).ogg", "assets/sounds/Caverna/Beethoven Piano Sonata Pathétique No.8 in C minor, Op.13 (online-audio-converter.com).m4a"],
      volume: 1,
      loop: false,
      frame: 1
    },
    {
      name: "futuresong",
      paths: ["assets/sounds/Futuro/Franco-Battiato-No-Time-No-Space.ogg", "assets/sounds/Futuro/Franco-Battiato-No-Time-No-Space.m4a"],
      volume: 1,
      loop: false,
      frame: 1
    },
    {
      name: "novecentosong",
      paths: ["assets/sounds/900.surrealismo/Chopin - Etude Op. 25 No. 5 (Wrong Note).ogg", "assets/sounds/900.surrealismo/Chopin - Etude Op. 25 No. 5 (Wrong Note).m4a"],
      volume: 1,
      loop: false,
      frame: 1
    },
  ],
  




  audio: [
    {
      name: "sfx",
      jsonpath: "assets/sounds/sfx.json",
      paths: ["assets/sounds/sfx.ogg", "assets/sounds/sfx.m4a"],
      instances: 10,
    },
  ],

  script: [
    {
      key: "webfont",
      path: "assets/js/webfonts.js",
    },
  ],

  bitmapfont: [
    {
      name: "arcade",
      imgpath: "assets/fonts/arcade.png",
      xmlpath: "assets/fonts/arcade.xml",
    },
    {
      name: "CostumFont",
      imgpath:"assets/fonts/archolate_0.png",
      xmlpath: "assets/fonts/archolate.xml",
    },
    {
      name: "CostumFont-0",
      imgpath:"assets/fonts/gelioretsina_0.png",
      xmlpath: "assets/fonts/gelioretsina.xml",
    },
    {
      name: "CostumFont-1",
      imgpath:"assets/fonts/angelwish_0.png",
      xmlpath: "assets/fonts/angelwish.xml",
    },
    {
      name: "CostumFont-2",
      imgpath:"assets/fonts/graficart_0.png",
      xmlpath: "assets/fonts/graficart.xml",
    },
    {
      name: "CostumFont-3",
      imgpath:"assets/fonts/godofwar_0.png",
      xmlpath: "assets/fonts/godofwar.xml",
    },,
    {
      name: "CostumFont-4",
      imgpath:["assets/fonts/cube_0.png","assets/fonts/cube_1.png"],
      xmlpath: "assets/fonts/cube.xml",
    },,
    {
      name: "CostumFont-5",
      imgpath:"assets/fonts/chiller.png",
      xmlpath: "assets/fonts/chiller.xml",
    },
  ],
};

