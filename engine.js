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
                if(self.me