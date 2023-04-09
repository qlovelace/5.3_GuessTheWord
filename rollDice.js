
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
    if (mainHero.gold >= statCost) {
        switch (a){
            case 1: mainHero.clearStrength++;
                        break;
            case 2: mainHero.clearAgility++;
                            break;
            case 3: mainHero.clearEndur++;
                              break;
            case 4: mainHero.clearInt++;
                              break;
        }
        mainHero.update();
        mainHero.gold -= statCost;
        statCost += 25;
        return true;
    }
    return false;
}

function getRandomWeapon(tier) {
    if (tier > maxTier) {
        return false;
    }

    if (mainHero.weapon.tier === tier) {
        if (mainHero.gold < weaponCostSame) return false;

        let choice = [];

        for (let i = 0; i < weapons.length; i++)
            if (weapons[i].tier === tier) choice.push(weapons[i]);

        mainHero.weapon.onChange(mainHero);
        mainHero.weapon = choice[Math.floor(Math.random() * choice.length)];
        mainHero.weapon.onEquip(mainHero);
        mainHero.update();
        mainHero.gold -= weaponCostSame;
        weaponCostSame += 10;
        return true;
    }
    if (mainHero.gold < weaponCostUp) return false;

    let choice = [];

    for (let i = 0; i < weapons.length; i++)
        if (weapons[i].tier === tier) choice.push(weapons[i]);

    mainHero.weapon.onChange(mainHero);
    mainHero.weapon = choice[Math.floor(Math.random() * choice.length)];
    mainHero.weapon.onEquip(mainHero);
    mainHero.update();
    mainHero.gold -= weaponCostUp;
    weaponCostUp += 150;
    return true;

}

function getRandomArmor(tier) {
    if (tier > maxTier) {
        return false;
    }

    if (mainHero.armor.tier === tier) {
        if (mainHero.gold < armorCostSame) return false;

        let choice = [];

        for (let i = 0; i < armor.length; i++)
            if (armor[i].tier === tier) choice.push(armor[i]);

        mainHero.armor.onChange(mainHero);
        mainHero.armor = choice[Math.floor(Math.random() * choice.length)];
        mainHero.armor.onEquip(mainHero);
        mainHero.update();
        mainHero.gold -= armorCostSame;
        armorCostSame += 10;
        return true;
    }
    if (mainHero.gold < armorCostUp) return false;

    let choice = [];

    for (let i = 0; i < armor.length; i++)
        if (armor[i].tier === tier) choice.push(armor[i]);

    mainHero.armor.onChange(mainHero);