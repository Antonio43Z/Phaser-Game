import "phaser";
import Boot from "./scenes/Boot";
import Preloader from "./scenes/Preloader";
import Intro from "./scenes/Intro";
import Hud from "./scenes/Hud";
import GameOver from "./scenes/GameOver";
import GamePlay from "./scenes/GamePlay";
import LevelCompleted from "./scenes/level-completed";
import Win from "./scenes/Win";
import { GameData } from "./GameData";
import Highscore from "./gameComponents/hightscore";
import InputPanel from "./gameComponents/user_log";
import MenuPrincipale from "./scenes/MenuPrincipale";

window.addEventListener("load", () => {

  const config: any = {
    type: Phaser.WEBGL,
    backgroundColor: GameData.globals.bgColor,
    parent: "my-game",
    scale: {
      mode: Phaser.Scale.FIT,
      width: GameData.globals.gameWidth,
      height: GameData.globals.gameHeight,
    },

    scene: [
      Boot,
      Preloader,
      MenuPrincipale,
      Intro,
      Hud,
      GamePlay,
      GameOver,
      LevelCompleted,
      Win,
      Highscore,
      InputPanel
    ],

    physics: {
      default: "arcade",
      arcade: {
        debug: GameData.globals.debug,

      }
    },
    input: {
      activePointers: 5,
      keyboard: true,
      gamepad: true
    },
    render: {
      pixelArt: true,
      antialias: true,
    },
  };

  const game = new Phaser.Game(config);


});
