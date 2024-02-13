export default class InputPanel extends Phaser.Scene {
private chars: Array<Array<string>>;
public cursor: Phaser.Math.Vector2;
private text:Phaser.GameObjects.BitmapText;
private block: Phaser.GameObjects.Image;
private spacebar:Phaser.Input.Keyboard.Key;
private enter:Phaser.Input.Keyboard.Key;
public name:string;
private charLimit:number;
    constructor ()
    {
        super({ key: 'InputPanel' });

    }
    preload(){
        this.chars = [
            [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ],
            [ 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T' ],
            [ 'U', 'V', 'W', 'X', 'Y', 'Z', '.', '-', '<', '>' ]
        ];

        this.cursor = new Phaser.Math.Vector2();


        this.name = '';
        this.charLimit = 5;
    }
    create ()
    {
        let text = this.add.bitmapText(290, 150, 'CostumFont', 'ABCDEFGHIJ\n\nKLMNOPQRST\n\nUVWXYZ.-').setAlpha(0);
       

        text.setLetterSpacing(20);
        text.setInteractive();


        this.block = this.add.image(text.x-50, text.y -10, 'button').setOrigin(0).setAlpha(0).setDepth(2);

        this.text = text;

        this.input.keyboard.on('keyup_LEFT', this.moveLeft, this);
        this.input.keyboard.on('keyup_RIGHT', this.moveRight, this);
        this.input.keyboard.on('keyup_UP', this.moveUp, this);
        this.input.keyboard.on('keyup_DOWN', this.moveDown, this);
        this.input.keyboard.on('keyup', this.anyKey, this);

        text.on('pointermove', this.moveBlock, this);
        text.on('pointerdown', this.pressKey, this);

    }

    moveBlock (pointer:Phaser.Input.Pointer, x: number, y:number)
    {
        let cx = Phaser.Math.Snap.Floor(x, 52, 0, true);
        let cy = Phaser.Math.Snap.Floor(y, 64, 0, true);
        

        this.cursor.set(cx, cy);

        this.block.x = this.text.x - 10 ;//+ (cx * 52);
        this.block.y = this.text.y - 2;//; + (cy * 64);
    }

    moveLeft ()
    {
        if (this.cursor.x > 0)
        {
            this.cursor.x--;
            this.block.x -= 52;
        }
        else
        {
            this.cursor.x = 9;
            this.block.x += 52 * 9;
        }
    }

    moveRight ()
    {
        if (this.cursor.x < 9)
        {
            this.cursor.x++;
            this.block.x += 52;
        }
        else
        {
            this.cursor.x = 0;
            this.block.x -= 52 * 9;
        }
    }

    moveUp ()
    {
        if (this.cursor.y > 0)
        {
            this.cursor.y--;
            this.block.y -= 64;
        }
        else
        {
            this.cursor.y = 2;
            this.block.y += 64 * 2;
        }
    }

    moveDown ()
    {
        if (this.cursor.y < 2)
        {
            this.cursor.y++;
            this.block.y += 64;
        }
        else
        {
            this.cursor.y = 0;
            this.block.y -= 64 * 2;
        }
    }

    anyKey (event:Phaser.Input.Keyboard.Key)
    {
        //  Only allow A-Z . and -

        let code = event.keyCode;

        if (code === Phaser.Input.Keyboard.KeyCodes.PERIOD)
        {
            this.cursor.set(6, 2);
            this.pressKey();
        }
        else if (code === Phaser.Input.Keyboard.KeyCodes.MINUS)
        {
            this.cursor.set(7, 2);
            this.pressKey();
        }
        else if (code === Phaser.Input.Keyboard.KeyCodes.BACKSPACE || code === Phaser.Input.Keyboard.KeyCodes.DELETE)
        {
            this.cursor.set(8, 2);
            this.pressKey();
        }
        else if (code >= Phaser.Input.Keyboard.KeyCodes.A && code <= Phaser.Input.Keyboard.KeyCodes.Z)
        {
            code -= 65;

            let y = Math.floor(code / 10);
            let x = code - (y * 10);

            this.cursor.set(x, y);
            this.pressKey();
        }
        //  Submit
        let nameLength = this.name.length;
        if ((event.keyCode=== Phaser.Input.Keyboard.KeyCodes.SPACE||event.keyCode=== Phaser.Input.Keyboard.KeyCodes.ENTER) && nameLength > 0)
        {
            
            console.log("Submit");
            this.events.emit('submitName', this.name);
        }
    }

    pressKey ()
    {
        let x = this.cursor.x;
        let y = this.cursor.y;
        let nameLength = this.name.length;

        this.block.x = this.text.x - 10 + (x * 52);
        this.block.y = this.text.y - 2 + (y * 64);

        if (x === 8 && y === 2 && nameLength > 0)
        {
            //  Rub
            this.name = this.name.substr(0, nameLength - 1);

            this.events.emit('updateName', this.name);
        }
        else if (this.name.length < this.charLimit)
        {
            //  Add
            this.name = this.name.concat(this.chars[y][x]);

            this.events.emit('updateName', this.name);
        }
    }

}



