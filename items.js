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

    onEquip(ma