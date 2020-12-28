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
            map[i] = new Array(dungeonWidth);
        }

        for (let i = 0; i < dungeonHeight; i++)
            for (let j = 0; j < dungeonWidth; j++)
                map[i][j] = new Wall();

        let startX = Math.floor(Math.random() * (dungeonWidth-2))+1;
        let startY = Math.floor(Math.random() * (dungeonHeight-2))+1;
        let exitX = 0;
        let exitY = 0;
        let maxFloorTiles = dungeonHeight*dungeonWidth / 10;
        let floorTilesCount = 0;

        map[startY][startX] = new StartPoint();


        for (let i = 0; i < 4; i++) {
            let currentX = startX;
            let currentY = startY;
            floorTilesCount = 0;
            while (floorTilesCount < maxFloorTiles) {

                let direction = Math.floor(Math.random() * 4);

                switch (direction) {
                    case 0:
                        if (currentX - 2 >= 0) {
                            currentX--;
                            if (!(map[currentY][currentX] instanceof Floor) && !(map[currentY][currentX] instanceof StartPoint)) {
                                map[currentY][currentX] = new Floor();
                                floorTilesCount++;
                            }
                        }
                        break;
                    case 1:
                        if (currentX + 2 < dungeonWidth) {
                            currentX++;
                            if (!(map[currentY][currentX] instanceof Floor) && !(map[currentY][currentX] instanceof StartPoint)) {
                                map[currentY][currentX] = new Floor();
                                floorTilesCount++;
                            }
                        }
                        break;
                    case 2:
                        if (currentY - 2 >= 0) {
                            currentY--;
                            if (!(map[currentY][currentX] instanceof Floor) && !(map[currentY][currentX] instanceof StartPoint)) {
                                map[currentY][currentX] = new Floor();
                                floorTilesCount++;
                            }
                        }
                        break;
                    case 3:
                        if (currentY + 2 < dungeonHeight) {
                            currentY++;
                            if (!(map[currentY][currentX] instanceof Floor) && !(map[currentY][currentX] instanceof StartPoint)) {
                                map[currentY][currentX] = new Floor();
                                floorTilesCount++;
                            }
                        }
                        break;
                }
            }
            if (i === 3){
                exitX = currentX;
                exitY = currentY;
            }
        }

        map[exitY][exitX] = new EndPoint();

        function inRange(a, _start, end_) {
            return a > _start && a < end_;
        }

        function addEnemy(count){
            let enemyCount = 0;
            while (enemyCount < count){
           