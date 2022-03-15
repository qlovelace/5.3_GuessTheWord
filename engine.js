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

    update(context) {
        context.clearRect(0, 0, 1000, 650);
        context.fillStyle = "white";
        context.font = "48px manaspc";
        context.textAlign = "center";
        context.fillText("Wait for a while...", 470, 300);
        this.promise.apply(this.ctx, this.args).then(result => this.callback.call(this.ctx, result));
    }
}

class OfflineState extends State {
    constructor(callbackState) {
        super();
        this.callbackState = callbackState;
    }

    goBack(scene) {
        scene.setState(this.callbackState);
        scene.update();
    }

    get events() {
        return {
            keydown: this.goBack,
        }
    }

    update(context) {
        //TODO draw offline screen
        context.clearRect(0, 0, 1000, 650);
        context.fillStyle = "yellow";
        context.font = "36px manaspc";
        context.textAlign = "center";
        context.fillText("You are offline.", 470, 300);
        context.fillText("Check your internet connection and try again.", 470, 340);
        context.fillStyle = "white";
        context.fillText("Press any key to go back...", 470, 600);
        super.update(context);
    }
}

class ShopState extends State {
    constructor() {
        super();
        this.isBought = undefined;
        this.shopItems = [
            {
                "name": "New weapon [same tier]",
                "price": () => weaponCostSame,
                "action": () => {
                    this.isBought = getRandomWeapon(mainHero.weapon.tier);
                }
            },
            {
                "name": "New weapon [higher tier]",
                "price": () => weaponCostUp,
                "action": () => {
                    this.isBought = getRandomWeapon(mainHero.weapon.tier + 1);
                }
            },
            {
                "name": "New armor [same tier]",
                "price": () => armorCostSame,
                "action": () => {
                    this.isBought = getRandomArmor(mainHero.armor.tier);
                }
            },
            {
                "name": "New armor [higher tier]",
                "price": () => armorCostUp,
                "action": () => {
                    this.isBought = getRandomArmor(mainHero.armor.tier + 1);
                }
            },
            {
                "name": "New spell",
                "price": () => magicCost,
                "action": () => {
                    this.isBought = getRandomMagic();
                }
            },
            {
                "name": "Random potion",
                "price": () => potionCost,
                "action": () => {
                    this.isBought = getRandomPotion();
                }
            },
            {
                "name": "I wish I had more strength",
                "price": () => statCost,
                "action": () => {
                    this.isBought = incStat(1);
                }
            },
            {
                "name": "I wish I was faster",
                "price": () => statCost,
                "action": () => {
                    this.isBought = incStat(2);
                }
            },
            {
                "name": "I wish I had more endurance",
                "price": () => statCost,
                "action": () => {
                    this.isBought = incStat(3);
                }
            },
            {
                "name": "I wish I was smarter",
                "price": () => statCost,
                "action": () => {
                    this.isBought = incStat(4);
                }
            },
        ];
        this.fieldFocus = 0;
    }

    keyHandler(scene, event) {
        switch (event.keyCode) {
            case 38: //arrow up
                this.fieldFocus--;
                break;
            case 40: //arrow down
                this.fieldFocus++;
                break;
            case 32: //space and enter
            case 13:
                this.shopItems[this.fieldFocus]["action"]();
                break;
            case 27: //Esc - exit
                scene.setState(game);
                break;
        }
        if (this.fieldFocus < 0)
            this.fieldFocus = this.shopItems.length - 1;
        if (this.fieldFocus >= this.shopItems.length)
            this.fieldFocus = 0;
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

        context.fillText("Random shop", 500, 40);
        context.fillText(`You have: ${mainHero.gold}`, 500, 600);

        context.textAlign = "left";

        context.font = "36px manaspc";
        context.fillText("What do you want, stranger?", 10, 90);

        context.font = "18px manaspc";
        for (let i in this.shopItems) {
            let selected = i == this.fieldFocus;
            let itemY = 132 + i*(18 + 2);
            context.fillStyle = selected ? "yellow" : "white";
            context.fillText(`${this.shopItems[i]["name"]}`, 10, itemY);
            if (selected) {
                context.textAlign = "right";
                context.fillText(`${this.shopItems[i]["price"]()}`, 980, itemY);
                context.textAlign = "left";
            }
        }
        context.fillStyle = "white";
        if (this.isBought) {
            context.font = "24px manaspc";
            context.fillText(`Your buy successful!`, 10, 500);
            this.isBought = !this.isBought;
        }
        else if (this.isBought === false) {
            context.font = "24px manaspc";
            context.fillText(`Not enough gold!`, 10, 500);
            this.isBought = null;
        }
        super.update(context);
    }
}

class CheatsState extends State {
    constructor() {
        super();
        this.fieldFocus = 0;
        this.fields = [{
            type: "text",
            name: "Enter cheat code:",
            val: "",
        }];
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
                scene.setState(game);
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
            case 32: //space
                if (this.fields[this.fieldFocus].type === "text") {
                    this.fields[this.fieldFocus].val += " ";
                }
                break;
            case 13: // Enter
                if (firebase) {
                    // Of course this code won't work with real cheaters lol
                    firebase = null;
                    db = null;
                    firebaseConfig = null;
                }
                let cheatArgs = this.fields[0].val.split(' ');
                this.fields[0].val = "";
                switch (cheatArgs[0]) {
                    case 'kingmidas':
                        mainHero.gold = 100000;
                        break;
                    case 'ubermensch':
                        mainHero.race = "Master race";
                        mainHero.clearStrength = 100;
                        mainHero.clearAgility = 100;
                        mainHero.clearEndur = 100;
                        mainHero.clearInt = 100;
                        mainHero.initiativeBuff = 100;
                        break;
                    case 'archimage':
                        mainHero.mp = 100;
                        break;
                    case 'longlive':
                        mainHero.hp = 100;
                        break;
                    case 'ghost':
                        mainHero.race = "Dead soul";
                        mainHero.isDead = true;
                        mainHero.hp = 0;
                        break;
                    case 'killmeplz':
                        scene.setState(gameOver);
                        break;
                    case 'gimme_spell':
                        let spellId = +cheatArgs[1] || 0;
                        mainHero.magic = spells[spellId];
                        break;
                    case 'gimme_weapon':
                        let wpnId = +cheatArgs[1] || 0;
                        mainHero.weapon = weapons[wpnId];
                        break;
                    case 'gimme_armor':
                        let armorId = +cheatArgs[1] || 0;
                        mainHero.armor = armor[armorId];
                        break;
                }
        }
        mainHero.update();
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
        context.fillText("Cheats", 470, 40);
        context.font = "24px manaspc";

        context.fillStyle = "red";
        context.fillText("With great power comes great responsibility!", 470, 540);
        context.fillStyle = "white";

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

class GameState extends State {
    constructor() {
        super();
        this.offsetX = 0;
        this.offsetY = 0;
        this.map = [[]];
        this.objectsMap = [];
        this.messages = ["", "", "", "", "", "", "", "", ""];
        this.controller = null;
        this.mobController = null;
        this.ctx = null;
        this.fieldHeight = 30;
        this.fieldWidth = 50;
        this.centerY = (this.fieldHeight / 2) >> 0;
        this.centerX = (this.fieldWidth / 2) >> 0;
        this.centerRectH = 11;
        this.centerRectW = 17;
        this.spellAwaiting = null;
    }

    newCave() {
        let cave = dungeonGeneration.generateCave(depth);
        this.map = cave[0];
        this.objectsMap = dungeonGeneration.generateObjects();
        this.objectsMap[0].x = cave[1];
        this.objectsMap[0].y = cave[2];
        this.controller = new Controller(this.objectsMap[0], this.map, this.objectsMap);
        this.mobController = new MobController(this.map, this.objectsMap);
        let player = this.objectsMap[0];
        this.offsetX = player.x - this.centerX;
        this.offsetY = player.y - this.centerY;
        this.checkOffsetBorders();
        this.calcVisited();
    }

    startGame() {
        depth = 1;
        this.newCave();
        this.messages = ["", "", "", "", "", "", "", "", ""];
        potionCost = 50;
        statCost = 50;
        weaponCostSame = 75;
        armorCostSame = 75;
        armorCostUp = 50;
        weaponCostUp = 50;
        magicCost = 40;
        this.pushMessage(`(Welcome to the ){white}(depth ${depth}!){red}`);
        this.pushMessage(`(To get help press '?'){white}`);
    }

    newLevel() {
        depth++;
        this.newCave();
        this.checkOffsetBorders();
        this.pushMessage(`(Welcome to the ){white}(depth ${depth}!){red}`);
    }

    checkOffsetBorders() {
        //checking borders
        let mapW = this.map[0].length;
        let mapH = this.map.length;

        if (this.offsetX + this.fieldWidth > mapW) {
            this.offsetX = mapW - this.fieldWidth;
        }
        if (this.offsetX < 0) {
            this.offsetX = 0;
        }

        if (this.offsetY + this.fieldHeight > mapH) {
            this.offsetY = mapH - this.fieldHeight;
        }
        if (this.offsetY < 0) {
            this.offsetY = 0;
        }
    }

    calcOffset() {
        if (!this.objectsMap) {
            alert("Something wrong happened, please reload the page");
            return;
        }
        let player = this.objectsMap[0];

        let centerRectX = this.offsetX + ((this.fieldWidth - this.centerRectW) / 2) >> 0;
        let centerRectY = this.offsetY + ((this.fieldHeight - this.centerRectH) / 2) >> 0;
        let mapW = this.map[0].length;
        let mapH = this.map.length;

        if (player.x < centerRectX) {
            if (this.offsetX > 0) {
                this.offsetX--;
            }
        }
        if (player.x >= centerRectX + this.centerRectW) {
            if (this.offsetX + this.fieldWidth < mapW) {
                this.offsetX++;
            }
        }

        if (player.y < centerRectY) {
            if (this.offsetY > 0) {
                this.offsetY--;
            }
        }
        if (player.y >= centerRectY + this.centerRectH) {
            if (this.offsetY + this.fieldHeight < mapH) {
                this.offsetY++;
            }
        }
        this.checkOffsetBorders();
    }

    calcVisited() {