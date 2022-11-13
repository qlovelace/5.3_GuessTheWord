let weapons = null;
let armor = null;
let spells = null;
let maxTier = 1;

class Armor {
    constructor(name, value, description, tier) {
        this.name = name;
        this.value = value;
        this.description = description;
        this.tier = tier;
    }

    onEquip(mainHero) {
        return 0;
    }


    onChange(mainHero) {
        return 0;
    }
}

class PoorClothes extends Armor {
    constructor() {
        super('Poor clothes', 2, 'It smells like your cat!', 0);
    }
}

class LeatherPants extends Armor {
    constructor() {
        super('Leather pants', 3, 'Because you did not have money for the shirt', 1);
    }

    onEquip(mainHero) {
        mainHero.gold >= 50 ? this.value += 3 : this.value;
        mainHero.update();
    }
}

class LeatherSet extends Armor {
    constructor() {
        super('Leather set', 5, 'Ok, maybe you are not so poor', 1);
    }
}

class RockPlate extends Armor {
    constructor() {
        super('Rock plate', 6, 'Haters gonna say - it is heavy', 1);
    }

    onEquip(mainHero) {
        mainHero.enduranceBuff++;
        mainHero.update();
    }

    onChange(mainHero) {
        mainHero.enduranceBuff--;
        mainHero.update();
    }
}

class CodeShirt extends Armor {
    constructor() {
        super('Code shirt', 7, 'It is quit boring to make this descriptions.', 2);
    }

    onEquip(mainHero) {
        mainHero.intelligence += 15;
        mainHero.update();
    }

    onChange(mainHero) {
        mainHero.intelligence -= 10;
        mainHero.update();
    }
}

class Cuirass extends Armor {
    constructor() {
        super('Steel cuirass', 8, 'I really like it`s sound of ignoring damage!', 2);
    }
}

class DragonArmor extends Armor {
    constructor() {
        super('Dragon`s armor', 10, 'Greenpeace is in fury!', 3);
    }

    onEquip(mainHero) {
        mainHero.enduranceBuff++;
        mainHero.update();
    }
}

class SpikedArmor extends Armor {
    constructor() {
        super(`Spiked armor`, 8, `Come and hug me!`, 3);
    }

    onEquip(mainHero) {
        mainHero.attackBuff += 2;
        mainHero.update();
    }

    onChange(mainHero) {
        mainHero.attackBuff -= 2;
        mainHero.update();
    }
}

class LeftBoot extends Armor {
    constructor() {
        super(`LeftBoot`, 3, `Pair defends better`, 3);
    }

    onEquip(mainHero) {
        mainHero.agilityBuff += 15;
        mainHero.update();
    }

    onChange(mainHero) {
        mainHero.agilityBuff -= 15;
        mainHero.update();
    }
}


class Weapon {
    constructor(name, value, diceVal, diceCount, description, tier) {
        this.name = name;
        this.value = value;
        this.diceVal = diceVal;
        this.diceCount = diceCount;
        this.description = description;
        this.tier = tier;
    }

    onEquip(mainHero) {
        return 0;
    }

    onChange(mainHero) {
        return 0;
    }
}

class RustyDagger extends Weapon {
    constructor() {
        super('Rusty dagger', 0, 4, 1, 'Seems like it was lost a couple ages ago', 0);
    }
}

class BrokenSword extends Weapon {
    constructor() {
        super('Broken sword', 0, 6, 1, 'Looks like somebody chewed it', 1);
    }

    onEquip(mainHero) {
        mainHero.agility >= 25 ? this.value += 3 : this.value++;
        mainHero.update();
    }
}

class DaddySword extends Weapon {
    constructor() {
        super('Daddy`s sword +1', 1, 6, 1, 'At least you know, that it deals damage', 1);
    }
}

class Rock extends Weapon {
    constructor() {
        super('Rock', 0, 4, 2, 'It helps you feel concentratedly', 1);
    }

    onEquip(mainHero) {
        mainHero.intelligence += 5;
        mainHero.update();
    }

    onChange(mainHero) {
        mainHero.intelligence -= 5;
        mainHero.update();
    }
}

class BalancedSword extends Weapon {
    constructor() {
        super('Balanced sword', 3, 6, 1, 'Finally! Good weapon!', 2);
    }
}

class HardMace extends Weapon {
    constructor() {
        super('Hard mace', 2, 8, 1, 'It is