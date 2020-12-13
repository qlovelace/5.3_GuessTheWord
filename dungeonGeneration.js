 let wall = new Wall();
let floor = new Floor();

dungeonGeneration = (()=>{
    let objects = [];
    function generateCave(dungeonDifficulty) {
        objects = [mainHero];
        let dungeonHeight = Math.floor((1+Math.random())*30);
        let dungeonWidth = Math.floor((1+Math.random())*50);

        let map = new Array(dungeonHeight);
        for (let i = 0; i < dungeonHeight; i++) {
  