import {PharoahsRod, PharoahsRodKey} from "./pharoahsRod.js";
import {Enigma, KeyPair, KeyPairs, PlugBoard, ReflectorWiring, RingSettings, WheelOrder } from "./enigmaMachine.js";

function getEncryptionKeyValueObject(name, value) {
    switch(name) {
        case "SimplePharaohsRod":
            return new PharoahsRodKey(value.size);
        case "Enigma":
            // value.wheelOrder = "IV,VI,II,I"
            //let wheelOrder = new WheelOrder(["IV","VI","II","I"]);
            let wheelOrder = new WheelOrder(value.wheelOrder.split(","));
            // value.ringSettings = "7,24,18,2"  or  value.ringSettings = "G,X,R,B"
            //let ringSettings = new RingSettings([7,24,18,2]);
            let ringSettingsArray = [];
            value.ringSettings.split(",").map((setting, index) => {
                ringSettingsArray[index] = parseInt(setting);
                if(ringSettingsArray[index]==NaN) {
                    let lowLetter = letter.toLowerCase();
                    let LetterCode = lowLetter.charCodeAt();
                    let LetterNum = LetterCode - "a".charCodeAt();
                    ringSettingsArray[index] = LetterNum;
                }
                if(ringSettingsArray[index]<1||ringSettingsArray[index]>26) {
                    ringSettingsArray[index] = 1;
                }
            });
            let ringSettings = new RingSettings(ringSettingsArray);
            // value.reflectorWiring = "AA,BB,CC,DD,EE,FF,GG,HH,II,JJ,KK,LL,MM,NN,OO,PP,QQ,RR,SS,TT,UU,VV,WW,XX,YY,ZZ"
            //let reflectorWiring = new ReflectorWiring(new KeyPairs([new KeyPair("a", "a"), new KeyPair("b", "b"), new KeyPair("c", "c"), new KeyPair("d", "d"), new KeyPair("e", "e"), new KeyPair("f", "f"), new KeyPair("g", "g"), new KeyPair("h", "h"), new KeyPair("i", "i"), new KeyPair("j", "j"), new KeyPair("k", "k"), new KeyPair("l", "l"), new KeyPair("m", "m"), new KeyPair("n", "n"), new KeyPair("o", "o"), new KeyPair("p", "p"), new KeyPair("q", "q"), new KeyPair("r", "r"), new KeyPair("s", "s"), new KeyPair("t", "t"), new KeyPair("u", "u"), new KeyPair("v", "v"), new KeyPair("w", "w"), new KeyPair("x", "x"), new KeyPair("y", "y"), new KeyPair("z", "z")]));
            let reflectorWiringPairArray = [];
            value.reflectorWiring.split(",").map((pair, index) => {
                reflectorWiringPairArray[index] = new KeyPair(pair[0].toLowerCase(),pair[1].toLowerCase());
            });
            let reflectorWiring = new ReflectorWiring(new KeyPairs(reflectorWiringPairArray));
            // value.reflectorPosition = "1" or value.reflectorPosition = "A"
            //let reflectorPosition = 1;
            let reflectorPosition = parseInt(value.reflectorPosition);
            if(reflectorPosition==NaN) {
                let lowLetter = value.reflectorPosition.toLowerCase();
                let LetterCode = lowLetter.charCodeAt();
                let LetterNum = LetterCode - "a".charCodeAt();
                reflectorPosition = LetterNum;
            }
            if(reflectorPosition<1||reflectorPosition>26) {
                reflectorPosition = 1;
            }
            // value.plugBoard = "AA,BB,CC,DD,EE,FF,GG,HH,II,JJ,KK,LL,MM,NN,OO,PP,QQ,RR,SS,TT,UU,VV,WW,XX,YY,ZZ"
            //let plugBoard = new PlugBoard(new KeyPairs([new KeyPair("a", "a"), new KeyPair("b", "b"), new KeyPair("c", "c"), new KeyPair("d", "d"), new KeyPair("e", "e"), new KeyPair("f", "f"), new KeyPair("g", "g"), new KeyPair("h", "h"), new KeyPair("i", "i"), new KeyPair("j", "j"), new KeyPair("k", "k"), new KeyPair("l", "l"), new KeyPair("m", "m"), new KeyPair("n", "n"), new KeyPair("o", "o"), new KeyPair("p", "p"), new KeyPair("q", "q"), new KeyPair("r", "r"), new KeyPair("s", "s"), new KeyPair("t", "t"), new KeyPair("u", "u"), new KeyPair("v", "v"), new KeyPair("w", "w"), new KeyPair("x", "x"), new KeyPair("y", "y"), new KeyPair("z", "z")]));
            let plugboardPairArray = [];
            value.plugBoard.split(",").map((pair, index) => {
                plugboardPairArray[index] = new KeyPair(pair[0].toLowerCase(),pair[1].toLowerCase());
            });
            let plugBoard = new PlugBoard(new KeyPairs(plugboardPairArray));
            return {
                wheelOrder:wheelOrder,
                ringSettings:ringSettings,
                reflectorWiring:reflectorWiring,
                reflectorPosition:reflectorPosition,
                plugBoard:plugBoard
            }
        default:
            return {};
        }
}

function getEncryptionObject(name, key) {
    switch(name) {
        case "SimplePharaohsRod":
            return new PharoahsRod(key.getKeyValueObject());
        case "Enigma":
            return new Enigma(key.getKeyValueObject().wheelOrder, key.getKeyValueObject().ringSettings, key.getKeyValueObject().reflectorWiring, key.getKeyValueObject().reflectorPosition, key.getKeyValueObject().plugBoard);
        default:
            return {};
        }
}

function getEncrypt(encryptionType, encryptionObject, message) {
    switch(encryptionType.getName()) {
        case "SimplePharaohsRod":
            return encryptionObject.encrypt(message);
        case "Enigma":
            return encryptionObject.getString(message);
        default:
            return "";
    }
}

function getDecrypt(encryptionType, encryptionObject, message) {
    switch(encryptionType.getName()) {
        case "SimplePharaohsRod":
            return encryptionObject.decrypt(message);
        case "Enigma":
            return encryptionObject.getString(message);
        default:
            return "";
    }
}

export class EncryptionType {
    setName(name) {
        this.name = name;
    }
    constructor(name) {
        this.setName(name)
    }
    getName() {
        return this.name;
    }
}

export class EncryptionTypes {
    constructor() {
        
    }

}

export class Key {
    constructor(encryptionType, keyValue) {
        this.encryptionType = encryptionType;
        this.encryptionKeyValueObject = getEncryptionKeyValueObject(this.encryptionType.getName(), keyValue);
    }
    getKeyValueObject() {
        return this.encryptionKeyValueObject;
    }

}

export class Encryption {
    constructor(encryptionType, key) {
        this.encryptionType = encryptionType;
        this.encryptionKeyValueObject = key;
        this.encryptionObject = getEncryptionObject(this.encryptionType.getName(), this.encryptionKeyValueObject);
    }
    getEncryptionType(){
        return this.encryptionType;
    }
    getObject() {
        return this.encryptionObject;
    }
    encrypt(message){
        return getEncrypt(this.encryptionType, this.encryptionObject, message);
    }
    decrypt(message){
        return getDecrypt(this.encryptionType, this.encryptionObject, message);
    }

}