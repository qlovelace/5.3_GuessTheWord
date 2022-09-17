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
        super('Leather pa