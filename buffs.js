class Buff {
    constructor(name, length, type, color, owner) {
        this.name = name;
        this.length = length;
        this.owner = owner;
        this.type = type;
        this.color = color;
    }

    effect() {
        return 0;
    }
}

class Bleed extends Buff {
    constructor(length, owner) {
        super("Bleeding", length, "damaging", "red", owner);
    }

    effect() {
        if (this.length > 0) {
            if (this.owner.hp > 1)
                this.owner.hp--;
            this.length--;
            game.pushMessage(`(You are bleeding!){red}`);
        }
    }
}

class marsBless extends Buff {
    constructor(length, owner) {
        super("Mars blessed", length, "good", "yellow", owner);
        if (owner !== null) {
            this.bonus = 5;
            this.owner.attackBuff += this.bonus;
            this.owner.update();
        }
    }

    effect() {
        if (this.length > 0) {
            this.length--;
            if (this.length === 0) {
                this.owner.attackBuff -= this.bonus;
                this.owner.update();
            }
        }
    }
}

class Apathy extends Buff {
    constructor(length, owner) {
        super("in a bad mood", length, "evil", "cyan", owner);
        if (owner !== null) {
            this.bonus = 3;
            this.owner.agilityBuff -= this.bonus;
            this.owner.update();
    