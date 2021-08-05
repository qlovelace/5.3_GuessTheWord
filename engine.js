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
        this.menuPos = 0;
    }

    keyHandler(scene, event) {
        switch (event.keyCode) {
            case 38: //arrow up
                this.menuPos--;
                break;
            case 40: //arrow down
                this.menuPos++;
                break;
            case 13:
                switch (this.menuPos) {
                    case 0:
                        scene.setState(charCreation);
                        // scene.setState(game);
                        // game.startGame();
                        break;
                    case 1:
                        //leaderboards
                        scene.setState(new LeaderboardsState(menu));
                        break;
                    case 2:
                        scene.setState(settings);
                        break;
                    case 3:
                        scene.setState(credits);
                        break;
                    case 4:
                        // sign in
                        scene.setState(new SignInState(menu));
                        break;
                    case 5:
                        // sign out
                        let signOutCallback = function (result) {
                            if (result) {
                                scene.setState(menu);
                            } else {
                                scene.setState(new OfflineState(menu));
                            }
                            scene.update();
                        };
                        scene.setState(new LoadingState(logout, this, [], signOutCallback));
                        break;
                    default:
                        alert("Not yet implemented!");
                        break;
                }
        }
        scene.update();
    }

    get events() {
        return {
            keyup: this.keyHandler,
        }
    }

    update(context) {
        context.fillStyle = "black";
        context.fillRect(0, 0, 1000, 650);

        if (this.menuPos < 0)
            this.menuPos = 5;
        if (this.menuPos > 5)
            this.menuPos = 0;

        context.drawImage(dragon,36,120);
        context.drawImage(dragonLable,203,0);
        switch (this.menuPos) {
            case 0:
                context.drawImage(sword,671,192);
                break;
            case 1:
                context.drawImage(sword,455,255);
                break;
            case 2:
                context.drawImage(sword,578,317);
                break;
            case 3:
                context.drawImage(sword,617,381);
                break;
            case 4:
                context.drawImage(sword,70,530);
                break;
            case 5:
                context.drawImage(sword,478,527);
                break;
        }
        context.fillStyle = "white";
        context.font = "48px manaspc";//61
        context.textAlign = "left";
        context.fillText("Start",796,236);
        context.fillText("Leaderboards",572,297);
        context.fillText("Settings",698,360);
        context.fillText("Credits",733,425);
        context.fillText("Sign-in",195,575);
        context.fillText("Sign-out",595,571);
        if (dbUser) {
            context.font = "16px manaspc";
            context.textAlign = "right";
            context.fillStyle = "white";
            context.fillText(`Welcome, ${dbUser.displayName}`, 995, 21);
            context.textAlign = "left";
        }
        context.font = "16px manaspc";
        context.textAlign = "right";
        context.fillStyle = "white";
        context.fillText(VERSION.toString(), 995, 630);
        context.textAlign = "left";
        super.update(context);
    }
}

class CharCreationState extends State {
    constructor() {
        super();
        this.isCreated = false;
        this.nameType = false;
    }

    keyHandler(scene, event) {
        switch (event.keyCode) {
            case 72: //h
                mainHero = new Player('Human', 10, 10, dbUser ? dbUser.displayName : 'UNKNOWN');
                this.isCreated = true;
                break;
            case 79: //o
                mainHero = new Player('Orc', 10, 10, dbUser ? dbUser.displayName : 'UNKNOWN');
                this.isCreated = true;
                break;
            case 77: //m
                mainHero = new Player('Magic wombat', 10, 10, dbUser ? dbUser.displayName : 'UNKNOWN');
                this.isCreated = true;
                break;
            case 69: //e
                mainHero = new Player('Wood elf', 10, 10, dbUser ? dbUser.displayName : 'UNKNOWN');
                this.isCreated = true;
                break;
            case 68: //d
                mainHero = new Player('Dwarf', 10, 10, dbUser ? dbUser.displayName : 'UNKNOWN');
                this.isCreated = true;
                break;
            case 27: //Esc
                scene.setState(menu);
                break;

            case 13: //Enter
                if (this.isCreated) {
                    this.isCreated = false;
                    scene.setState(game);
                    game.startGame();
                }
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
        context.fillText("Choose your race:", 470, 40);
        context.font = "24px manaspc";
        context.fillText("Press the following button to choose your hero", 470, 580);
        context.fillText("Press Enter to play", 470, 600);

        context.textAlign = "left";
        context.font = "24px manaspc";

        context.fillText("h - Human", 10, 100);
        context.fillText("o - Orc", 10, 130);
        context.fillText("e - Wood elf", 10, 160);
        context.fillText("m - Magic wombat", 10, 190);
        context.fillText("d - Dwarf", 10, 220);
        super.update(context);
        if (this.isCreated) {
            context.font = "16px manaspc";
            context.fillText(`Your character: ${mainHero.name}`, 650, 100);
            context.fillText(`Strength: ${mainHero.strength}`, 650, 130);
            context.fillText(`Agility: ${mainHero.agility}`, 650, 160);
            context.fillText(`Intelligence: ${mainHero.intelligence}`, 650, 190);
            context.fillText(`Initiative: ${mainHero.initiative} `, 650, 220);
            context.fillText(`Endurance: ${mainHero.endurance}`, 650, 250);
        }
    }
}

class LeaderboardsState extends State {
    constructor(callbackState) {
        super();
        this.callbackState = callbackState;
        this.scoresPerPage = 20;
    }

    get events() {
        return {
            keyup: this.keyHandler,
        }
    }

    keyHandler(scene, event) {
        switch (event.keyCode) {
            case 27: //escape
                scene.setState(this.callbackState);
                break;
        }
        scene.update();
    }

    update(context) {
        context.clearRect(0, 0, 1000, 650);
        context.fillStyle = "white";
        context.font = "48px manaspc";
        context.textAlign = "center";
        context.fillText("Leaderboards:", 500, 40);
        context.fillText("Please wait...", 500, 325);
        context.font = "24px manaspc";
        context.fillText("Press Esc to go back", 500, 600);

        getScores(this.scoresPerPage).then(scores => {
            if (scores.length) {
                context.clearRect(0, 100, 1000, 400);
                context.font = "24px manaspc";
                for (let i = 0; i < scores.length; ++i) {
                    let score = scores[i];
                    if (dbUser) {
                        if (score.uid === dbUser.uid) {
                            context.fillStyle = "yellow";
                        }
                    }
                    context.textAlign = "left";
                    context.fillText(`#${i + 1}: ${score.nickname}`, 50, 90 + i * 25, 450);
                    context.textAlign = "right";
                    context.fillText(`${score.depth}`, 950, 90 + i * 25, 450);
                    context.fillStyle = "white";
                }
                context.textAlign = "left";
            } else {
                context.font = "48px manaspc";
                context.textAlign = "center";
                context.fillText("No leaders yet. Be first!", 500, 325);
                context.font = "24px manaspc";
            }
        });
        super.update(context);

    }
}

class SignInState extends State {
    constructor(callbackState, error = null) {
        super();
        this.callbackState = callbackState;
        this.fieldFocus = 0;
        this.fields = [{
            type: "text",
            name: "Email",
            val: "",
        }, {
            type: "text",
            name: "Password",
            val: "",
            hideChars: true,
        }, {
            type: "button",
            name: "Sign-up",
            click: scene => {
                scene.setState(new SignUpState(this.callbackState));
            }
        }];
        this.error = error;
    }

    get events() {
        return {
            keyup: this.keyHandler,
            keypress: this.typeHandler,
        }
    }

    typeHandler(scene, event) {
        if (this.fields[this.fieldFocus].type === "text") {
            if (event.key !== "Enter" && event.key !== "Backspace")
                this.fields[this.fieldFocus].val += event.key;
        }
        scene.update();
    }

    keyHandler(scene, event) {
        switch (event.keyCode) {
            case 27: //escape
                scene.setState(this.callbackState);
                break;
            case 8: //backspace
                if (this.fields[this.fieldFocus].type === "text") {
                    this.fields[this.fieldFocus].val =
                        this.fields[this.fieldFocus].val.substr(0, this.fields[this.fieldFocus].val.length - 1);
                }
                break;
            case 38: //arrow up
                this.fieldFocus--;
                break;
            case 40: //arrow down
                this.fieldFocus++;
                break;
            case 32: //space, useful for buttons
                if (this.fields[this.fieldFocus].type === "button") {
                    this.fields[this.fieldFocus].click(scene);
                }
                break;
            case 13:
                let authCallback = (result) => {
                    if (result) {
                        scene.setState(this.callbackState);
                    } else {
                        scene.setState(new SignInState(this.callbackState, "An error has occurred. Try again."));
                    }
                    scene.update();
                };
                let email = this.fields[0].val;
                let pass = this.fields[1].val;
                scene.setState(new LoadingState(login, this, [email, pass], authCallback));
        }
        scene.update();
    }

    update(context) {
        if (this.fieldFocus < 0)
            this.fieldFocus = 0;
        if (this.fieldFocus >= this.fields.length)
            this.fieldFocus = this.fields.length - 1;

        context.clearRect(0, 0, 1000, 650);
        context.fillStyle = "white";
        context.font = "48px manaspc";
        context.textAlign = "center";
        context.fillText("Sign in:", 470, 40);
        context.font = "24px manaspc";
        if (this.error) {
            context.fillStyle = "red";
            context.fillText(this.error, 470, 540);
            context.fillStyle = "white";

        }
        context.fillText("We do not keep your email!", 470, 560);
        context.fillText("Press Space while focused on button to click", 470, 580);
        context.fillText("Press Enter to sign in", 470, 600);

        context.strokeStyle = "white";
        context.lineWidth = 2;
        context.textAlign = "left";
        for (let i = 0; i < this.fields.length; ++i) {
            switch (this.fields[i].type) {
                case "text":
                    context.fillText(this.fields[i].name, 202, 130 + (i * 2) * 25, 598);
                    context.beginPath();
                    context.rect(200, 130 + (i * 2) * 25 + 3, 600, 24);
                    context.stroke();
                    let fieldText = this.fields[i].val;
                    if (this.fields[i].hideChars) {
                        fieldText = "*".repeat(this.fields[i].val.length);
                    }
                    if (this.fieldFocus === i) {
                        fieldText += '_';
                    }
                    context.fillText(fieldText, 202, 130 + (i * 2 + 1) * 25 - 2, 598);
                    break;
                case "button":
                    if (this.fieldFocus === i) {
                        context.fillStyle = "yellow";
                    }
                    context.textAlign = "center";
                    context.fillText(this.fields[i].name, 500, 132 + (i * 2) * 25, 598);
                    context.textAlign = "left";
                    context.fillStyle = "white";
                    break;
            }
        }
        super.update(context);
    }
}

class SignUpState extends State {
    constructor(callbackState, error = null) {
        super();
        this.callbackState = callbackState;
        this.fieldFocus = 0;
        this.fields = [{
            type: "text",
            name: "Email",
            val: "",
        }, {
            type: "text",
            name: "Password",
            val: "",
            hideChars: true,
        }, {
            type: "text",
            name: "Nickname",
            val: defaultNickname,
        }];
        this.error = error;
    }

    get events() {
        return {
            keyup: this.keyHandler,
            keypress: this.typeHandler,
        }
    }

    typeHandler(scene, event) {
        if (event.key !== "Enter" && event.key !== "Backspace")
            this.fields[this.fieldFocus].val += event.key;
        scene.update();
    }

    keyHandler(scene, event) {
        switch (event.keyCode) {
            case 27: //escape
                scene.setState(this.callbackState);
                break;
            case 8: //backspace
                this.fields[this.fieldFocus].val =
                    this.fields[this.fieldFocus].val.substr(0, this.fields[this.fieldFocus].val.length - 1);
                break;
            case 38: //arrow up
                this.fieldFocus--;
                break;
            case 40: //arrow down
                this.fieldFocus++;
                break;
            case 13:
                let authCallback = function (result) {
                    if (result === true) {
                        scene.setState(this.callbackState);
                    } else {
                        let errorMsg = "An error has occurred. Try again.";
                        switch (result) {
                            case "auth/email-already-in-use":
                                errorMsg = "This email is already in use.";
                                break;
                            case "auth/weak-password":
                                errorMsg = "Your password is too weak.";
                                break;
                        }
                        scene.setState(new SignUpState(this.callbackState, errorMsg));
                    }
                    scene.update();
                };
                let email = this.fields[0].val;
                let pass = this.fields[1].val;
                let nickname = this.fields[2].val;
                scene.setState(new LoadingState(registrate, this, [email, pass, nickname], authCallback));
        }
        scene.update();
    }

    update(context) {
        if (this.fieldFocus < 0)
            this.fieldFocus = 0;
        if (this.fieldFocus >= this.fields.length)
            this.fieldFocus = this.fields.length - 1;

        context.clearRect(0, 0, 1000, 650);
        context.fillStyle = "white";
        context.font = "48px manaspc";
        context.textAlign = "center";
        context.fillText("Sign up:", 470, 40);
        context.font = "24px manaspc";
        if (this.error) {
            context.fillStyle = "red";
            context.fillText(this.error, 470, 540);
            context.fillStyle = "white";

        }
        context.fillText("We do not keep your email!", 470, 580);
        context.fillText("Press Enter to sign up", 470, 600);

        context.strokeStyle = "white";
        context.lineWidth = 2;
        context.textAlign = "left";
        for (let i = 0; i < this.fields.length; ++i) {
            context.fillText(this.fields[i].name, 202, 130 + (i * 2) * 25, 598);
            context.beginPath();
            context.rect(200, 130 + (i * 2) * 25 + 3, 600, 24);
            context.stroke();
            let fieldText = this.fields[i].val;
            if (this.fields[i].hideChars) {
                fieldText = "*".repeat(this.fields[i].val.length);
            }
            if (this.fieldFocus === i) {
                fieldText += '_';
            }
            context.fillText(fieldText, 202, 130 + (i * 2 + 1) * 25 - 2, 598);
        }
        super.update(context);
    }
}

class LoadingState extends State {
    constructor(promise, promiseCtx, promiseArgs, callback) {
        super();
        this.promise = promise;
        this.ctx = promiseCtx;
        this.args = promiseArgs;
        this.callback = callback;
    }

    update(