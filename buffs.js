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