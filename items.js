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
        mainHero.end