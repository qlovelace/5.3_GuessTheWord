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
        this.ctx = canvas.getCo