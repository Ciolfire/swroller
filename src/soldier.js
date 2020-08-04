export default class Soldier {
    _name;
    _start;
    _idle;
    _laser;
    _shootFrom;

    constructor(ressource) {
        this._name = ressource['type'];
        this._start = this.getFilesName(ressource['src']+ressource['type']+"_", ressource['framesStart']);
        this._idle = this.getFilesName(ressource['src']+"idle/"+ressource['type']+"_L_", ressource['framesIdle']);
        this._laser = ressource['laser'];
        this._shootFrom = ressource['shootFrom'];
    }
    
    getFilesName(file, frames) {
        let animation = [];

        for (let index = 1; index <= frames; index++) {      
            animation[index] = file+index+".png";
        }
        return animation;
    }

    getName() {
        return this._name;
    }

}