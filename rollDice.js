
let potionCost;
let statCost;
let weaponCostSame;
let armorCostSame;
let armorCostUp;
let weaponCostUp;
let magicCost;

function rollDice(diceVal, diceCount) {
    let total = 0;
    for (let i = 0; i < diceCount; i++) {
        total += Math.floor(Math.random() * diceVal) + 1;
    }
    return total;
}

function getRandomPotion() {
    if (mainHero.gold >= potionCost) {
        let pot = rollDice(2, 1);
        pot === 1 ? mainHero.hpPotions++ : mainHero.mpPotions++;
        mainHero.gold -= potionCost;
        potionCost += 10;
        return true;
    }
    return false;
}

function incStat(a) {