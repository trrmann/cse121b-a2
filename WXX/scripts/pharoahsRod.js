export function encrypt (array = ['1','2','3','4','5'], key=5) {
    let result = [];
    let tempIndex = 0;
    let base = 0;
    let temp = [];
    array.forEach((element, index) => {
        tempIndex = index / key;
        base = index % key;
        if(base==0) {
            temp[index] = [];
        }
        temp[tempIndex][base] = element;
    });
    tempIndex = 0;
    temp.forEach((outerElement) => {
        outerElement.forEach((innerElement) => {
            result[tempIndex] = innerElement;
            tempIndex++;
        });
    });
    return result;
}

export function decrypt(array = ['1','2','3','4','5'], key=5) {
    let tempIndex;
    let temp = [];
    let result = [];
    let start = 0;
    let end = 0;
    let size = array.length/key;
    let numberOfSizeOne = array.length%key;
    for(tempIndex = 0; tempIndex < key; tempIndex++) {
        if(tempIndex < numberOfSizeOne) {
            end = start + size;
        } else {
            end = start + size - 1;
        }
        temp[tempIndex] = [];
        array.slice(start, end).forEach((character, index) => {
            temp[tempIndex][index] = character;
        });
        start = end + 1;
    }
    for(tempIndex = 0; tempIndex < array.length; tempIndex++) {
        index = tempIndex / key;
        base = tempIndex % key;
        result[tempIndex] = temp[index][base];
    }
    return result;
}