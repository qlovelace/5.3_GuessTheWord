
class Creature extends SceneObject {
    constructor(id) {
        super(id, 0, 0);
        this.race = 0;
        this.hp = 0;
        this.mp = 0;
        this.attack = 0;
        this.weapon = weapons[0];
        this.armor = armor[0];
        this.magic = spells[0];
        this.agility = 0;
        this.initiative = 0;
        this.name = 'none';
        this.gold = 0;
        this.isDead = 0;
        this.color = "white";
        this.fogRad = 5;
        this.enduranceBuff = 0;
        this.intBuff = 0;
        this.attackBuff = 0;
        this.initiativeBuff = 0;
        this.agilityBuff = 0;
        this.strengthBuff = 0;

        this.effect = new Bleed(0, this);
    }

    addEffect(buff){
        this.effect = buff;
    }
}

class Player extends Creature {
    constructor(race, startX, startY, name) {
        super(2);
        switch (race) {
            case 'Human':
                this.strength = rollDice(6, 3) + 19;
                this.agility = rollDice(6, 3) + 5;
                this.endurance = rollDice(6, 3) + 22 + 15;
                this.intelligence = rollDice(6, 3) + 7;
                break;
            case 'Orc':
                this.strength = rollDice(6, 3) + 15;
                this.agility = Math.max(rollDice(2, 2), rollDice(2, 2));
                this.endurance = rollDice(6, 3) + 46 + 10;
                this.intelligence = rollDice(2, 1);
                break;
            case 'Magic wombat':
                this.strength = rollDice(6, 3) + 8;
                this.agility = rollDice(6, 3) + 12;
                this.endurance = Math.max(rollDice(6, 3) - 5, 3) + 10;
                this.intelligence = rollDice(6, 3) + 19;
                this.magic = spells[4];
                break;
            case 'Wood elf':
                this.strength = rollDice(6, 3) + 12;
                this.agility = rollDice(6, 3) + 10;
                this.endurance = Math.max(rollDice(6, 3) - 6, 3) + 12;
                this.intelligence = rollDice(6, 3) + 15;
                break;
            case 'Dwarf':
                this.strength = rollDice(6, 3) + 38;
                this.agility = Math.max(rollDice(3, 3), rollDice(3, 3));
                this.endurance = rollDice(6, 3) + 15 + 10;
                this.intelligence = Math.max(rollDice(6, 3) - 3, 3);
        }
        this.race = race;
        this.x = startX;
        this.y = startY;
        this.maxHP = Math.floor(this.endurance / 10) + 4;
        this.maxMP = Math.floor(this.intelligence / 10) + 1;
        this.hp = this.maxHP;
        this.mp = this.maxMP;
        this.attack = Math.floor(this.strength / 10);
        this.initiative = this.agility / 10 + 8;
        this.name = name;
        this.hpPotions = 3;
        this.mpPotions = 3;
        this.color = "yellow";
        this.clearStrength = this.strength;
        this.clearAgility = this.agility;
        this.clearEndur = this.endurance;
        this.clearInt = this.intelligence;
    }

    update() {
        this.endurance = this.enduranceBuff + this.clearEndur;
        this.intelligence = this.clearInt + this.intBuff;
        this.agility = this.clearAgility + this.agilityBuff;
        this.initiative = this.agility / 10 + 8 + this.initiativeBuff;
        this.strength = this.clearStrength + this.strengthBuff;
        this.attack = Math.max(Math.floor(this.strength / 10) + this.attackBuff, 1);
        this.maxHP = Math.floor(this.endurance / 10) + 4;
        this.maxMP = Math.floor(this.intelligence / 10) + 1;
        this.hp > this.maxHP ? this.hp = this.maxHP : this.hp;
        this.mp > this.maxMP ? this.mp = this.maxMP : this.mp;
    }
}

class Mob extends Creature {
    constructor(id) {
        super(id);
    }

    move(map) {
        return [0, 0];
    }
}
