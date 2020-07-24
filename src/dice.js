export default class Dice {
    _name;
    _values;
    _maxValue;

    constructor(name, dice) {
        this._name = name;
        this._values = dice;
        this._maxValue = Object.keys(dice).length;
    }

    getName() {
        return this._name;
    }

    // We roll the dice, selecting a face at random
    roll() {
        const face = rollDice(this._maxValue);
        console.info(this._name + ' roll:[' + face + ']' + JSON.stringify(this._values[face]));

        return this._values[face];
    }
}

function rollDice(max) {
    const min = 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}