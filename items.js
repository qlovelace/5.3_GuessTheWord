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
    