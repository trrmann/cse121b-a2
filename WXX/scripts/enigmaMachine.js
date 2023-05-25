export class KeyPair {
    constructor(first, second) {
        this.first = first;
        this.second = second;
    }
    First() {
        return this.first;
    }
    Second() {
        return this.second;
    }
}

export class KeyPairs {
    constructor(pairArray) {
        this.pairArray = pairArray;
    }
    PairArray() {
        return this.pairArray;
    }
    Filter(letter, first) {
        if(typeof first === "boolean" && typeof letter === "string") {
            if(first) {
                return this.pairArray.filter((pair) => {
                    return (pair.First()==letter);
                });
            } else {
                return this.pairArray.filter((pair) => {
                    return (pair.Second()==letter);
                });
            }
        } else {
            return [];
        }
    }
}

export class ReflectorWiring {

    constructor(keyPairs) {
        this.keyPairs = keyPairs;        
    }

    getReflection(letter) {
        if(typeof letter === "string" ) {
            return this.keyPairs.Filter(letter, true)[0].Second();
        } else {
            return "";
        }
    }
}

class RotarWiring {
    constructor(keyPairs) {
        this.keyPairs = keyPairs;
    }
    getForward(letter) {
        if(typeof letter === "string" ) {
            return this.keyPairs.Filter(letter, true)[0].Second();
        } else {
            return "";
        }
    }
    getBackward(letter="") {
        if(typeof letter === "string" ) {
            return this.keyPairs.Filter(letter, false)[0].First();
        } else {
            return "";
        }
    }
}

class Reflector {

    constructor(position, wiring = new ReflectorWiring(new KeyPairs(new []))) {
        this.wiring = wiring;
        this.position = position;
    }

    getReflection(letter) {
        let lowLetter = letter.toLowerCase();
        let reflectionLetter = this.wiring.getReflection(lowLetter);
        let reflectionLetterCode = reflectionLetter.charCodeAt();
        let reflectionLetterNum = reflectionLetterCode - "a".charCodeAt();
        let reflectionLetterPosNumMax = reflectionLetterNum + this.position - 1;
        let reflectionLetterPosNum = reflectionLetterPosNumMax %26;
        let reflectionLetterPosCode = reflectionLetterPosNum + "a".charCodeAt();
        return String.fromCharCode(reflectionLetterPosCode);
    }
}

class Rotar {
    constructor(wiring=new RotarWiring()) {
        this.wiring = wiring;
    }
    initPosition(position) {
        if(typeof position === "number") {
            if(position > 0 && position < 27) {
                this.position = position;
            }
        } else if (typeof position === "string") {
            initPosition((position.toLowerCase().charCodeAt() - "a".charCodeAt()) + 1);
        }
    }
    advancePosition() {
        this.position++;
    }
    getPosition() {
        return this.position;
    }
    getPositionLetter() {
        return String.fromCharCode("a".charCodeAt() + this.getPosition - 1);
    }
    getForward(letter) {
        let lowLetter = letter.toLowerCase();
        let forwardLetter = this.wiring.getForward(lowLetter);
        let forwardLetterCode = forwardLetter.charCodeAt();
        let forwardLetterNum = forwardLetterCode - "a".charCodeAt();
        let forwardLetterPosNumMax = forwardLetterNum + this.position - 1;
        let forwardLetterPosNum = forwardLetterPosNumMax %26;
        let forwardLetterPosCode = forwardLetterPosNum + "a".charCodeAt();
        return String.fromCharCode(forwardLetterPosCode);
    }
    getBackward(letter) {
        let lowLetter = letter.toLowerCase();
        let backwardLetter = this.wiring.getBackward(lowLetter);
        let backwardLetterCode = backwardLetter.charCodeAt();
        let backwardLetterNum = backwardLetterCode - "a".charCodeAt();
        let backwardLetterPosNumMax = backwardLetterNum + this.position - 1;
        let backwardLetterPosNum = backwardLetterPosNumMax %26;
        let backwardLetterPosCode = backwardLetterPosNum + "a".charCodeAt();
        return String.fromCharCode(backwardLetterPosCode);
    }
}

class Wheel {
    getRotarWiringFromName(name="") {
        let pairArray;
        switch (name) {
            case "I":
                pairArray = [new KeyPair("a", "b"), new KeyPair("b", "c"), new KeyPair("c", "d"), new KeyPair("d", "e"), new KeyPair("e", "f"), new KeyPair("f", "g"), new KeyPair("g", "h"), new KeyPair("h", "i"), new KeyPair("i", "j"), new KeyPair("j", "k"), new KeyPair("k", "l"), new KeyPair("l", "m"), new KeyPair("m", "n"), new KeyPair("n", "o"), new KeyPair("o", "p"), new KeyPair("p", "q"), new KeyPair("q", "r"), new KeyPair("r", "s"), new KeyPair("s", "t"), new KeyPair("t", "u"), new KeyPair("u", "v"), new KeyPair("v", "w"), new KeyPair("w", "x"), new KeyPair("x", "y"), new KeyPair("y", "z"), new KeyPair("z", "a")];
                break;
            case "II":
                pairArray = [new KeyPair("a", "c"), new KeyPair("b", "d"), new KeyPair("c", "e"), new KeyPair("d", "f"), new KeyPair("e", "g"), new KeyPair("f", "h"), new KeyPair("g", "i"), new KeyPair("h", "j"), new KeyPair("i", "k"), new KeyPair("j", "l"), new KeyPair("k", "m"), new KeyPair("l", "n"), new KeyPair("m", "o"), new KeyPair("n", "p"), new KeyPair("o", "q"), new KeyPair("p", "r"), new KeyPair("q", "s"), new KeyPair("r", "t"), new KeyPair("s", "u"), new KeyPair("t", "v"), new KeyPair("u", "w"), new KeyPair("v", "x"), new KeyPair("w", "y"), new KeyPair("x", "z"), new KeyPair("y", "a"), new KeyPair("z", "b")];
                break;
            case "III":
                pairArray = [new KeyPair("a", "d"), new KeyPair("b", "e"), new KeyPair("c", "f"), new KeyPair("d", "g"), new KeyPair("e", "h"), new KeyPair("f", "i"), new KeyPair("g", "j"), new KeyPair("h", "k"), new KeyPair("i", "l"), new KeyPair("j", "m"), new KeyPair("k", "n"), new KeyPair("l", "o"), new KeyPair("m", "p"), new KeyPair("n", "q"), new KeyPair("o", "r"), new KeyPair("p", "s"), new KeyPair("q", "t"), new KeyPair("r", "u"), new KeyPair("s", "v"), new KeyPair("t", "w"), new KeyPair("u", "x"), new KeyPair("v", "y"), new KeyPair("w", "z"), new KeyPair("x", "a"), new KeyPair("y", "b"), new KeyPair("z", "c")];
                break;
            case "IV":
                pairArray = [new KeyPair("a", "e"), new KeyPair("b", "f"), new KeyPair("c", "g"), new KeyPair("d", "h"), new KeyPair("e", "i"), new KeyPair("f", "j"), new KeyPair("g", "k"), new KeyPair("h", "l"), new KeyPair("i", "m"), new KeyPair("j", "n"), new KeyPair("k", "o"), new KeyPair("l", "p"), new KeyPair("m", "q"), new KeyPair("n", "r"), new KeyPair("o", "s"), new KeyPair("p", "t"), new KeyPair("q", "u"), new KeyPair("r", "v"), new KeyPair("s", "w"), new KeyPair("t", "x"), new KeyPair("u", "y"), new KeyPair("v", "z"), new KeyPair("w", "a"), new KeyPair("x", "b"), new KeyPair("y", "c"), new KeyPair("z", "d")];
                break;
            case "V":
                pairArray = [new KeyPair("e", "a"), new KeyPair("f", "b"), new KeyPair("g", "c"), new KeyPair("h", "d"), new KeyPair("i", "e"), new KeyPair("j", "f"), new KeyPair("k", "g"), new KeyPair("l", "h"), new KeyPair("m", "i"), new KeyPair("n", "j"), new KeyPair("o", "k"), new KeyPair("p", "l"), new KeyPair("q", "m"), new KeyPair("r", "n"), new KeyPair("s", "o"), new KeyPair("t", "p"), new KeyPair("u", "q"), new KeyPair("v", "r"), new KeyPair("w", "s"), new KeyPair("x", "t"), new KeyPair("y", "u"), new KeyPair("z", "v"), new KeyPair("a", "w"), new KeyPair("b", "x"), new KeyPair("c", "y"), new KeyPair("d", "z")];
                break;
            case "VI":
                pairArray = [new KeyPair("d", "a"), new KeyPair("e", "b"), new KeyPair("f", "c"), new KeyPair("g", "d"), new KeyPair("h", "e"), new KeyPair("i", "f"), new KeyPair("j", "g"), new KeyPair("k", "h"), new KeyPair("l", "i"), new KeyPair("m", "j"), new KeyPair("n", "k"), new KeyPair("o", "l"), new KeyPair("p", "m"), new KeyPair("q", "n"), new KeyPair("r", "o"), new KeyPair("s", "p"), new KeyPair("t", "q"), new KeyPair("u", "r"), new KeyPair("v", "s"), new KeyPair("w", "t"), new KeyPair("x", "u"), new KeyPair("y", "v"), new KeyPair("z", "w"), new KeyPair("a", "x"), new KeyPair("b", "y"), new KeyPair("c", "z")];
                break;
            case "VII":
                pairArray = [new KeyPair("c", "a"), new KeyPair("d", "b"), new KeyPair("e", "c"), new KeyPair("f", "d"), new KeyPair("g", "e"), new KeyPair("h", "f"), new KeyPair("i", "g"), new KeyPair("j", "h"), new KeyPair("k", "i"), new KeyPair("l", "j"), new KeyPair("m", "k"), new KeyPair("n", "l"), new KeyPair("o", "m"), new KeyPair("p", "n"), new KeyPair("q", "o"), new KeyPair("r", "p"), new KeyPair("s", "q"), new KeyPair("t", "r"), new KeyPair("u", "s"), new KeyPair("v", "t"), new KeyPair("w", "u"), new KeyPair("x", "v"), new KeyPair("y", "w"), new KeyPair("z", "x"), new KeyPair("a", "y"), new KeyPair("b", "z")];
                break;
            case "VIII":
                pairArray = [new KeyPair("b", "a"), new KeyPair("c", "b"), new KeyPair("d", "c"), new KeyPair("e", "d"), new KeyPair("f", "e"), new KeyPair("g", "f"), new KeyPair("h", "g"), new KeyPair("i", "h"), new KeyPair("j", "i"), new KeyPair("k", "j"), new KeyPair("l", "k"), new KeyPair("m", "l"), new KeyPair("n", "m"), new KeyPair("o", "n"), new KeyPair("p", "o"), new KeyPair("q", "p"), new KeyPair("r", "q"), new KeyPair("s", "r"), new KeyPair("t", "s"), new KeyPair("u", "t"), new KeyPair("v", "u"), new KeyPair("w", "v"), new KeyPair("x", "w"), new KeyPair("y", "x"), new KeyPair("z", "y"), new KeyPair("a", "z")];
                break;
            default:
                pairArray = [new KeyPair("a", "a"), new KeyPair("b", "b"), new KeyPair("c", "c"), new KeyPair("d", "d"), new KeyPair("e", "e"), new KeyPair("f", "f"), new KeyPair("g", "g"), new KeyPair("h", "h"), new KeyPair("i", "i"), new KeyPair("j", "j"), new KeyPair("k", "k"), new KeyPair("l", "l"), new KeyPair("m", "m"), new KeyPair("n", "n"), new KeyPair("o", "o"), new KeyPair("p", "p"), new KeyPair("q", "q"), new KeyPair("r", "r"), new KeyPair("s", "s"), new KeyPair("t", "t"), new KeyPair("u", "u"), new KeyPair("v", "v"), new KeyPair("w", "w"), new KeyPair("x", "x"), new KeyPair("y", "y"), new KeyPair("z", "z")];
        }
        return new RotarWiring(new KeyPairs(pairArray));
    }

    getWheelCountingRulesFromName(name="") {
        switch(name) {
            case "I":
                return {max:676,advance:[0]};
            case "II":
                return {max:26,advance:[0]};
            case "III":
                return {max:26,advance:[0, 13]};
            case "IV":
                return {max:1,advance:[0]};
            case "V":
                return {max:1,advance:[0]};
            case "VI":
                return {max:26,advance:[0, 13]};
            case "VII":
                return {max:26,advance:[0]};
            case "VIII":
                return {max:676,advance:[0]};
            default:
                return {max:1,advance:[0]};
        }
    }

    constructor(name) {
        this.name = name;
        this.rotar = new Rotar(this.getRotarWiringFromName(name));
        this.counter = 0;
        this.max = this.getWheelCountingRulesFromName(name).max;
        this.advance = this.getWheelCountingRulesFromName(name).advance;
    }
    getName() {
        return this.name;
    }
    initPosition(position) {
        this.rotar.initPosition(position);
    }
    advancePosition() {
        this.rotar.advancePosition();
    }
    getPosition() {
        return this.rotar.getPosition();
    }
    getPositionLetter() {
        return this.rotar.getPositionLetter();
    }
    getForward(letter) {
        return this.rotar.getForward(letter);
    }
    getBackward(letter) {
        let result = this.rotar.getBackward(letter);
        this.counter++;
        if(this.counter>this.max) {
            this.counter=0;
        }
        let advance = true;
        this.advance.forEach((triggerNumber) => {
            advance &= (this.counter % this.max == triggerNumber);
        });
        if(advance) {
            this.advancePosition();
        }
        return result;
    }
}

export class WheelOrder {
    constructor(wheelNameArray) {
        this.wheelNameArray = wheelNameArray;
    }
    getWheelOrderArray() {
        return this.wheelNameArray;
    }
}

export class RingSettings {
    constructor(ringSettingArray) {
        this.ringSettingArray = ringSettingArray;
    }
    getRingSettingArray() {
        return this.ringSettingArray;
    }
}

class Spindle {

    constructor(wheelOrder = new wheelOrder(), ringSettings = new ringSettings(), reflector = new Reflector(new ReflectorWiring(), 1)) {
        this.wheels = [];
        wheelOrder.getWheelOrderArray().forEach((wheelName, index) => {
            this.wheels[index] = new Wheel(wheelName);
        });
        ringSettings.getRingSettingArray().forEach((setting, index) => {
            this.wheels[index].initPosition(setting);
        });
        this.reflector = reflector;
    }
    getWheelOrder() {
        wheelOrder = [];
        this.wheels.forEach((wheel, index) => {
            wheelOrder[index] = wheel.getName();
        });
    }
    getRingSettings() {
        settings = [];
        this.wheels.forEach((wheel, index) => {
            settings[index] = wheel.getPosition();
        });
        return settings;
    }
    getRingLetterSettings() {
        settings = [];
        this.wheels.forEach((wheel, index) => {
            settings[index] = wheel.getPositionLetter();
        });
        return settings;
    }
    getForward(letter) {
        let result = letter;
        this.wheels.forEach((wheel)=>{
            result = wheel.getForward(result);
        });
        return result;
    }
    getBackward(letter) {
        let result = letter;
        this.wheels.slice().reverse().forEach((wheel)=>{
            result = wheel.getBackward(result);
        });
        return result;
    }
    getSpindle(letter) {
        return this.getBackward(this.reflector.getReflection(this.getForward(letter)));
    }
}

export class PlugBoard {

    constructor(keyPairs) {
        this.keyPairs = keyPairs;
    }

    getPlugBoard(letter) {
        if(typeof letter === "string" ) {
            return this.keyPairs.Filter(letter.toLowerCase(), true)[0].Second();
        } else {
            return "";
        }
    }
}

export class Enigma {
    constructor(wheelOrder = new WheelOrder(), ringSettings = new RingSettings(), reflectorWiring = new ReflectorWiring(), reflectorPosition = 1, plugBoard = new PlugBoard()) {
        this.plugBoard = plugBoard;
        this.spindle = new Spindle(wheelOrder, ringSettings, new Reflector(reflectorPosition, reflectorWiring));
    }
    getSubstitution(letter) {
        return this.spindle.getSpindle(this.plugBoard.getPlugBoard(letter));
    }
    getString(string) {
        let result = [];
        let stringArray = Array.from(string);
        stringArray.forEach((letter, index) => {
            result[index] = this.getSubstitution(letter);
        });
        return result.join('');
    }
}