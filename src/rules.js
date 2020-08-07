import Dice from './dice';

export default class Rules {
  _dices;
  _pool;
  _result;
  _limit = {
    'ability': 7,
    'proficiency': 9,
    'difficulty': 7,
    'challenge': 9,
    'boost': 7,
    'setback': 5,
    'force': 5,
  };
  _resultDetail;

  constructor() {
    // We initialize the dice list
    this._dices = {};
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
    // We initialize the pool
    this.resetPool();
  }

  // Used to register the different dices that will be used
  getDices() {
    return this._dices;
  }

  // Used to fetch the pool of dices to roll
  getPool() {
    return this._pool;
  }

  getPoolSize(type = null) {
    if (type) {
      return this._pool[type].length;
    } else {
      // We check if the pool is empty
      for (const index in this._pool) {
        if (this._pool[index].length) {
          return true;
        }
      }
      return false;
    }
  }

  getResult(type = null) {
    if (type) {
      return this._result[type];
    } else {
      return this._result;
    }
  }

  getLimit(type) {
    return this._limit[type];
  }

  _setBoost() {
    console.info('setBoost');
    this._dices['boost'] = {
      1: {}, 2: {}, 3: { 'advantage': 1 }, 4: { 'success': 1 }, 5: { 'advantage': 2 }, 6: { 'success': 1, 'advantage': 1 },
    };
  }

  _setSetback() {
    console.info('setSetback');
    this._dices['setback'] = {
      1: {}, 2: {}, 3: { 'advantage': -1 }, 4: { 'advantage': -1 }, 5: { 'success': -1 }, 6: { 'success': -1 },
    };
  }

  _setAbility() {
    console.info('setAbility');
    this._dices['ability'] = {
      1: {}, 2: { 'advantage': 1 }, 3: { 'advantage': 1 }, 4: { 'success': 1 }, 5: { 'success': 1 }, 6: { 'advantage': 2 }, 7: { 'success': 1, 'advantage': 1 }, 8: { 'success': 2 },
    };
  }

  _setDifficulty() {
    console.info('setDifficulty');
    this._dices['difficulty'] = {
      1: {}, 2: { 'advantage': -1 }, 3: { 'advantage': -1 }, 4: { 'advantage': -1 }, 5: { 'success': -1 }, 6: { 'advantage': -2 }, 7: { 'success': -1, 'advantage': -1 }, 8: { 'success': -2 },
    };
  }

  _setProficiency() {
    console.info('setProficiency');
    this._dices['proficiency'] = {
      1: {}, 2: { 'advantage': 1 }, 3: { 'success': 1 }, 4: { 'success': 1 }, 5: { 'advantage': 2 }, 6: { 'advantage': 2 }, 7: { 'success': 1, 'advantage': 1 }, 8: { 'success': 1, 'advantage': 1 }, 9: { 'success': 1, 'advantage': 1 }, 10: { 'success': 2 }, 11: { 'success': 2 }, 12: { 'success': 1, 'triumph': 1 },
    };
  }

  _setChallenge() {
    console.info('setChallenge');
    this._dices['challenge'] = {
      1: {}, 2: { 'advantage': -1 }, 3: { 'advantage': -1 }, 4: { 'success': -1 }, 5: { 'success': -1 }, 6: { 'advantage': -2 }, 7: { 'advantage': -2 }, 8: { 'success': -1, 'advantage': -1 }, 9: { 'success': -1, 'advantage': -1 }, 10: { 'success': -2 }, 11: { 'success': -2 }, 12: { 'success': -1, 'despair': 1 },
    };
  }

  _setForce() {
    console.info('setForce');
    this._dices['force'] = {
      1: { 'dark': 1 }, 2: { 'dark': 1 }, 3: { 'dark': 1 }, 4: { 'dark': 1 }, 5: { 'dark': 1 }, 6: { 'dark': 1 }, 7: { 'dark': 2 }, 8: { 'dark': 1 }, 9: { 'dark': 1 }, 10: { 'light': 2 }, 11: { 'light': 2 }, 12: { 'light': 2 },
    };
  }

  resetPool() {
    console.info("resetPool");
    this._pool = {
      'boost': [],
      'ability': [],
      'proficiency': [],
      'setback': [],
      'difficulty': [],
      'challenge': [],
      'force': [],
    };
  }

  // Add a quantity of dices to the pool to roll
  addToPool(type, quantity = 1) {
    console.info("[addToPool] type:" + type + ", quantity:" + quantity);
    const dice = new Dice(type, this._dices[type]);
    if (this._pool[type].length < this._limit[type]) {
      this._pool[type].push(dice);
    } else {
      return;
    }
    if (quantity > 1) {
      this.addToPool(type, quantity - 1);
    }
  }

  // We remove a quantity of dices from the pool
  removeFromPool(type, quantity = 1) {
    console.info("[removeFromPool] type:" + type + " quantity:" + quantity);
    this._pool[type].pop();
    if (quantity > 1) {
      this.removeFromPool(type, quantity - 1);
    }
  }

  // We roll all the dices of the pool
  rollPool() {
    this._result = { 'success': 0 };
    this._resultDetail = [];
    for (const type in this._pool) {
      for (const index in this._pool[type]) {
        let roll = this._pool[type][index].roll();
        this._resultDetail.push({ type: type, roll: roll });
        this._resultUpdate(roll);
      }
    }
    // console.log(this._resultDetail);
  }

  // We update the result with the current roll
  _resultUpdate(roll) {
    for (var key in roll) {
      if (!this._result[key]) {
        this._result[key] = roll[key];
      } else {
        this._result[key] += roll[key];
      }
    }
  }

  killSoldiers() {
    let kills= [];
    if (this._result['success'] > 0) {
      kills.push('1');
      kills.push('3');
      kills.push('5');
      } else {
      kills.push('0');
      kills.push('2');
      kills.push('4');
      }
      if (this._result['advantage'] > 0) {
        kills.push('7');
      } else if (this._result['advantage'] < 0) {
        kills.push('6');
      }
      if (this._result['triumph'] > 0) {
        kills.push('9');
      }
      if (this._result['despair'] > 0) {
        kills.push('8');
      }
    return kills;
  }
}