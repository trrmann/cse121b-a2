function encrypt (string = "1234567890", key=new PharoahsRodKey(5)) {
    let array = Array.from(string)
    let result = [];
    let tempIndex = 0;
    let base = 0;
    let temp = [];
    let keyBase = key.getKey();
    array.forEach((element, index) => {
        tempIndex =  ~~(index / keyBase);
        base = index % keyBase;
        if(tempIndex==0) {
            temp[base] = [];
        }
        temp[base][tempIndex] = element;
    });
    tempIndex = 0;
    temp.forEach((outerElement) => {
        outerElement.forEach((innerElement) => {
            result[tempIndex] = innerElement;
            tempIndex++;
        });
    });
    return result.join('');
}

function decrypt(string = "1234567890", key=new PharoahsRodKey(5)) {
let index;
let base;
let array = Array.from(string)
let tempIndex;
let temp = [];
let result = [];
let start = 0;
let end = 0;
let keyBase = key.getKey();
let size = ~~(array.length / keyBase);
let numberOfSizeOne = array.length % keyBase;
if(numberOfSizeOne==0) {
    numberOfSizeOne = keyBase;
}
for(tempIndex = 0; tempIndex < keyBase; tempIndex++) {
    if(tempIndex < numberOfSizeOne && numberOfSizeOne == keyBase) {
        end = start + size;
    } else if(tempIndex < numberOfSizeOne) {
        end = start + size + 1;
    } else {
        end = start + size;
    }
    temp[tempIndex] = [];
    array.slice(start, end).forEach((character, index) => {
        temp[tempIndex][index] = character;
    });
    start = end;
}
for(tempIndex = 0; tempIndex < array.length; tempIndex++) {
    index = ~~(tempIndex / keyBase);
    base = tempIndex % keyBase;
    result[tempIndex] = temp[base][index];
}
return result.join('');
}

export class PharoahsRodKey {
    getKey() {
        return this.size;
    }
    setKey(size) {
        this.size = size;
    }
    constructor(size) {
        this.setKey(size);
    }
}

export class PharoahsRod {
    constructor(key) {
        this.key = key;
    }
    encrypt(message){
        return encrypt(message, this.key);
    }
    decrypt(message){
        return decrypt(message, this.key);
    }
}
