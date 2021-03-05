let game = null;//new GameState();
let menu = null;
let credits = null;
let leaderboards = null;
let settings = null;
let gameOver = null;//new GameOverState();
let charCreation = null; // new CharCreationState()
let shop = null; //ShopCreationState;
let help = null;
let description = null;

let depth = 1;

class Scene {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.state = null;
        this.eventList = {};
        this.ctx.imageSmoothingEnabled = false;
    }

    setState(state) {
        //remove old handlers
        for (let oldEvent in this.eventList) {
            console.log("Remove old handlers", oldEvent, this.eventList[oldEvent]);
            if (this.eventList.hasOwnProperty(oldEvent) && this.eventList[oldEvent] !== null) {
                window.removeEventListener(oldEvent, this.eventList[oldEvent]);
            }
        }
        this.eventList = {};
        //and set new
        this.state = state;
        let events = this.state.events;
        for (let event in events) {
            console.log("Add new handlers", event, events[event]);
            if (events.hasOwnProperty(event) && events[event] !== null) {
                this.eventList[event] = e => {
                    events[event].call(this.state, this, e);
                };
                window.addEventListener(event, this.eventList[event]);
            }
        }
    }

    getState() {
        return this.state;
    }

    update() {
        this.state.update(this.ctx);
    }
}

class State {
    constructor() {
    }

    get events() {
        return {};
    }

    update(context) {

    }
}

class CreditsState extends State {
    constructor() {
        super();
    }

    keyHandler(scene, event) {
        scene.setState(menu);
        scene.update();
    }

    get events() {
        return {
            keyup: this.keyHandler,
        }
    }

    update(context) {
        context.clearRect(0, 0, 1000, 650);
        context.fillStyle = "white";
        context.font = "48px manaspc";
        context.textAlign = "center";
        context.fillText("Credits", 470, 40);
        context.font = "36px manaspc";
        context.fillText("Press any key to continue...", 470, 580);

        context.textAlign = "left";
        context.font = "24px manaspc";

        context.fillText("Made by:", 10, 65);
        context.fillText("Balashenko Igor (DwarfMason)", 10, 100);
        context.fillText("Yury Kurlykov (t1meshift)", 10, 130);
        context.fillText("Andrey Osadchii (smgks)", 10, 160);
        super.update(context);
    }
}

class SettingsState extends State{
    constructor(){
        super();
        //MAX tileSetList == 10
        self.tileSetList = ["standart tileset", "futuristic tileset",];
        self.menuPos = 0

    }
    update(context){
        context.clearRect(0, 0, 1000, 650);

        context.drawImage(dragon,36,120);
        context.drawImage(dragonLable,203,0);

        context.fillStyle = "white";
        context.font = "24px manaspc";

        for (let i = 0; i < self.tileSetList.length; ++i) {
            if(i === TILE_SET.getCurrentTileIndex())
                context.fillStyle = "blue";
            else
                context.fillStyle = "white";
            context.fillText(self.tileSetList[i], 600, 160 + i * 50);
        }
        context.drawImage(sword,490,128 + self.menuPos*50);
        super.update(context);
    }
    keyHandler(scene, event) {
        switch (event.keyCode) {
            case 27: //esc
                scene.setState(menu);
                break;
            case 40: // arrowdown
                if(self.menuPos < (self.tileSetList.length-1))
                    self.menuPos++;
                break;
            case 38: // arrowup
                if(self.menuPos >= 1)
                    self.menuPos--;
                break;
            case 13: // enter
                TILE_SET.changeTileSet(self.menuPos);
                break;
            case 32: // space
                TILE_SET.changeTileSet(self.menuPos);
                break;
        }
        scene.update();
    }

    get events() {
        return {
            keydown: this.keyHandler,
        }
    }
}

class HelpState extends State {
    constructor() {
        super();
    }

    keyHandler(scene, event) {
        scene.setState(game);
        scene.update();
    }

    get events() {
        return {
            keydown: this.keyHandler,
        }
    }

    update(context) {
        context.clearRect(0, 0, 1000, 650);
        context.fillStyle = "white";
        context.font = "48px manaspc";
        context.textAlign = "center";
        context.fillText("Help", 470, 40);
        context.font = "36px manaspc";
        context.fillText("Press any key to continue...", 470, 580);

        context.textAlign = "left";
        context.font = "24px manaspc";

        context.fillText("Key bindings:", 10, 65);

        context.fillText("Arrows - movement", 10, 100);
        context.fillText("o - skip turn", 10, 130);
        context.fillText("h - health potion", 10, 160);
        context.fillText("m - mana potion", 10, 190);
        context.fillText("'space' - cast spell", 10, 220);
        context.fillText(". - descend (works on ladders)", 10, 250);
        context.fillText("? - help", 10, 280);
        context.fillText("d - character", 10, 310);
        context.fillText("s - shop", 10, 340);
        context.fillText("p(near shrines) - prey", 10, 370);

        super.update(context);
    }
}

class DescriptionState extends State {
    constructor() {
        super();
        this.isWeapon  = false;
        this.isArmor = false;
        this.isMagic = false;
    }

    keyHandler(scene, event) {
        switch (event.keyCode) {
            case 13:
                scene.setState(game);
                break;
            case 87: // w - weapon
                this.isWeapon = true;
                break;
            case 65: // a - armor
                this.isArmor = true;
                break;
            case 77: // m - magic
                this.isMagic = true;
        }
        scene.update();
    }

    get events() {
        return {
            keyup: this.keyHandler,
        }
    }

    update(context) {
        context.clearRect(0, 0, 1000, 650);
        context.fillStyle = "white";
        context.font = "48px manaspc";
        context.textAlign = "center";
        context.fillText("Items description", 470, 40);
        context.font = "36px manaspc";
        context.fillText("Press given keys to get description", 470, 580);
        context.fillText("Press Enter to exit", 470, 625);

        context.textAlign = "left";
        context.font = "24px manaspc";

        context.fillText(`w - ${mainHero.weapon.name} description`, 10, 100);
        context.fillText(`a - ${mainHero.armor.name} description`, 10, 130);
        context.fillText(`m - ${mainHero.magic.name} description`, 10, 160);

        context.fillText(`Your character: ${mainHero.name}`, 525, 100);
        context.fillText(`Strength: ${mainHero.strength}`, 525, 130);
        context.fillText(`Agility: ${mainHero.agility}`, 525, 160);
        context.fillText(`Initiative: ${mainHero.initiative} `, 525, 190);
        context.fillText(`Endurance: ${mainHero.endurance}`, 530, 220);
        context.fillText(`Intelligence: ${mainHero.intelligence}`, 525, 250);

        if(this.isArmor){
            context.font = "24px manaspc";
            context.fillStyle = "yellow";
            context.fillText(`${mainHero.armor.name} - ${mainHero.armor.description}`, 10, 450);
            context.fillText(`It has tier ${mainHero.armor.tier}`, 10, 480);
            this.isArmor = !this.isArmor;
        }

        if(this.isWeapon){
            context.font = "24px manaspc";
            context.fillStyle = "yellow";
            context.fillText(`${mainHero.weapon.name} - ${mainHero.weapon.description}`, 10, 450);
            context.fillText(`It has tier ${mainHero.weapon.tier}`, 10, 480);
            this.isWeapon = !this.isWeapon;
        }

        if(this.isMagic){
            context.font = "24px manaspc";
            context.fillStyle = "yellow";
            context.fillText(`${mainHero.magic.name} - ${mainHero.magic.description}`, 10, 450);
            this.isMagic = !this.isMagic;
        }

        super.update(context);
    }
}

class GameOver extends State {
    constructor() {
        super();
    }

    keyHandler(scene, event) {
        switch (event.keyCode) {
            case 27:
                scene.setState(menu);
                menu.dropMenuPos();
        }
        scene.update();
    }

    get events() {
        return {
            keyup: this.keyHandler,
        }
    }

    update(context) {
        context.drawImage(getRandomIMG(), 0, 0);
        context.fillStyle = "white";
        context.font = "24px manaspc";

        context.fillText(`Name: ${mainHero.name}`, 20, 150);
        context.fillText(`Race: ${mainHero.race}`, 20, 180);
        context.fillText(`Depth: ${depth}`, 20, 210);
        context.fillText(`Weapon: ${mainHero.weapon.name}`, 20, 240);
        context.fillText(`Armor: ${mainHero.armor.name}`, 20, 270);
        context.fillText("Press Esc to exit...", 100, 600);
        context.font = "12px manaspc";

        game.drawMessage(game.messages[0], 30, 505 - 100, context);      //0
        game.drawMessage(game.messages[1], 30, 525 - 100 - 1, context);      //1
        game.drawMessage(game.messages[2], 30, 545 - 100 - 2, context);      //2
        game.drawMessage(game.messages[3], 30, 565 - 100 - 3, context);      //3
        game.drawMessage(game.messages[4], 30, 585 - 100 - 4, context);      //4
        game.drawMessage(game.messages[5], 30, 605 - 100 - 5, context);      //5
        game.drawMessage(game.messages[6], 30, 625 - 100 - 5, context);      //6
        game.drawMessage(game.messages[7], 30, 645 - 100 - 7, context);      //7


        super.update(context);
    }
}

class MenuState extends State {
    constructor() {
        super();
        this.menuPos = 0;
    }

    dropMenuPos() {
       