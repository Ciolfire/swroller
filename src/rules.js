import Dice from './dice';

export default class Rules {
    _dices;
    _pool;
    _result;

    constructor() {
        // We initialize the dice list
        this._dices = {};
        // We initialize the pool
        this._defaultPool = {
            'ability': [],
            'proficiency': [],
            'difficulty': [],
            'challenge': [],
            'boost': [],
            'setback': [],
            'force': []
        };
        this._pool = this._defaultPool;

        // Success oppose failure, cancel each other
        // Advantage oppose threat, cancel each other
        this._setBoost();
        this._setSetback();
        this._setAbility();
        this._setDifficulty();
        // Triumph oppose despair, no cancellation
        this._setProficiency();
        this._setChallenge();
        // Force has it's own mechanics
        this._setForce();
    }

    // Used to register the different dices that will be used
    getDices() {
        return this._dices;
    }

    // Used to fetch the pool of dices to roll
    getPool(type=null) {
        if (type) {
            if (!this._pool.type) {
                return 0;
            } else {
                return this._pool[type];
            }
        }
        return this._pool;
    }

    getResult() {
        return this._result;
    }

    getBoost() {
        return this._dices['boost'];
    }

    _setBoost() {
        this._dices['boost'] = {
            1: {},
            2: {},
            3: { 'advantage': 1 },
            4: { 'success': 1 },
            5: { 'advantage': 2 },
            6: { 'success': 1, 'advantage': 1 },
        };
    }

    getSetback() {
        return this._dices['setback'];
    }

    _setSetback() {
        this._dices['setback'] = {
            1: {},
            2: {},
            3: { 'advantage': -1 },
            4: { 'advantage': -1 },
            5: { 'success': -1 },
            6: { 'success': -1 },
        };
    }

    getAbility() {
        return this._dices['ability'];
    }

    _setAbility() {
        this._dices['ability'] = {
            1: {},
            2: { 'advantage': 1 },
            3: { 'advantage': 1 },
            4: { 'success': 1 },
            5: { 'success': 1 },
            6: { 'advantage': 2 },
            7: { 'success': 1, 'advantage': 1 },
            8: { 'success': 2 },
        };
    }

    getDifficulty() {
        return this._dices['difficulty'];
    }

    _setDifficulty() {
        this._dices['difficulty'] = {
            1: {},
            2: { 'advantage': -1 },
            3: { 'advantage': -1 },
            4: { 'advantage': -1 },
            5: { 'success': -1 },
            6: { 'advantage': -2 },
            7: { 'success': -1, 'advantage': -1 },
            8: { 'success': -2 },
        };
    }

    getProficiency() {
        return this._dices['proficiency'];
    }

    _setProficiency() {
        this._dices['proficiency'] = {
            1: {},
            2: { 'advantage': 1 },
            3: { 'success': 1 },
            4: { 'success': 1 },
            5: { 'advantage': 2 },
            6: { 'advantage': 2 },
            7: { 'success': 1, 'advantage': 1 },
            8: { 'success': 1, 'advantage': 1 },
            9: { 'success': 1, 'advantage': 1 },
            10: { 'success': 2 },
            11: { 'success': 2 },
            12: { 'success': 1, 'triumph': 1 },
        };
    }

    getChallenge() {
        return this._dices['challenge'];
    }

    _setChallenge() {
        this._dices['challenge'] = {
            1: {},
            2: { 'advantage': -1 },
            3: { 'advantage': -1 },
            4: { 'success': -1 },
            5: { 'success': -1 },
            6: { 'advantage': -2 },
            7: { 'advantage': -2 },
            8: { 'success': -1, 'advantage': -1 },
            9: { 'success': -1, 'advantage': -1 },
            10: { 'success': -2 },
            11: { 'success': -2 },
            12: { 'success': -1, 'despair': 1 },
        };
    }

    getForce() {
        return this._dices['force'];
    }

    _setForce() {
        this._dices['force'] = {
            1: { 'dark': 1 },
            2: { 'dark': 1 },
            3: { 'dark': 1 },
            4: { 'dark': 1 },
            5: { 'dark': 1 },
            6: { 'dark': 1 },
            7: { 'dark': 2 },
            8: { 'dark': 1 },
            9: { 'dark': 1 },
            10: { 'light': 2 },
            11: { 'light': 2 },
            12: { 'light': 2 },
        };
    }

    emptyPool() {
        this.pool = this._defaultPool;
    }

    // Add a quantity of dices to the pool to roll
    addToPool(type, quantity = 1) {
        const dice = new Dice(type, this._dices[type]);
        this._pool[type].push(dice);
        if (quantity > 1) {
            this.addToPool(type, quantity - 1);
        }
    }

    // We remove a quantity of dices from the pool, only if there is enough dices
    removeFromPool(type, quantity = 1) {
        this._pool[type].pop();
        if (quantity > 1) {
            this.removeFromPool(type, quantity - 1);
        }
    }

    // We roll all the dices of the pool
    rollPool() {
        this._result = {};

        for (const type in this._pool) {
            for (const nb in this._pool[type]) {
                let dice = this._pool[type][nb];
                this._resultUpdate(dice.roll());
            }
        }
    }

    // We update the result with the current roll
    _resultUpdate(roll) {
        console.log(this._result);
        for (var key in roll) {
            if (!this._result[key]) {
                this._result[key] = roll[key];
            } else {
                this._result[key] += roll[key];
            }
        }
    }
}

// var rules = new Rules();
// rules.addToPool("boost", 2);
// rules.addToPool("setback", 1);
// rules.addToPool("ability", 3);
// rules.addToPool("difficulty", 3);
// rules.addToPool("proficiency", 1);
// rules.addToPool("force", 1);
// rules.removeFromPool("force", 15);

// rules.rollPool();
// console.log(JSON.stringify(rules.getResult()));
// document.write(JSON.stringify(rules.getResult()));