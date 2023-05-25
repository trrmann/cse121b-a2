import { EncryptionType, EncryptionTypes, Key, Encryption } from "./encryption.js";

function pageElementQuery(document, id) {
    return document.querySelector("#"+id);
}

function getPageElementArray(document, elementNameArray) {
    let elements = [];
    elementNameArray.forEach((element, index) => {
        elements[index] = pageElementQuery(document, element);
    });
    return elements;
}

function getDayOfWeekString(dow) {
    let result;
    switch(dow) {
        case 0:
            result = "Sunday";
            break;
        case 1:
            result = "Monday";
            break;
        case 2:
            result = "Tuesday";
            break;
        case 3:
            result = "Wednesday";
            break;
        case 4:
            result = "Thursday";
            break;
        case 5:
            result = "Friday";
            break;
        case 6:
            result = "Saturday";
            break;
        default:
            result = "Unknown";
    };
    return result;
}

function encryptMessageBy(messageOutElement, encryptByDropBox) {
    messageOutElement.innerHTML = encryptByDropBox.value;
}

function buildLabel(targetName, text) {
    let element = document.createElement("label");
    element.for = targetName;
    element.innerText = text;
    return element;
}

function buildInput(name, type, id) {
    let element = document.createElement("input");
    element.name = name;
    element.type = type;
    element.id = id;
    return element;
}

function buildLabelInput(labelText, inputType, inputName, inputID) {
    return {
        label : buildLabel(inputName, labelText),
        input : buildInput(inputName, inputType, inputID)
    };
}

function buildLabeltextInput(labelHandle, labelText, inputName, inputID) {
    let temp = buildLabelInput(labelHandle, labelText, "text", inputName, inputID);
    return {
        label : temp.label,
        textInput : temp.input
    }
}

function buildButtonInput(buttonName, buttonId, buttonValue) {
    let result = buildInput(buttonName, "button", buttonId);
    result.value = buttonValue;
    return result;
}

function buildKeyDiv(encryptionHomePage) {
    let keyInputDiv = encryptionHomePage.keyDivElement();
    keyInputDiv.innerHTML = "";
    switch(encryptionHomePage.encryptByElement().value) {
        case "SimplePharaohsRod":
            let simplePharaohsRodKeyTextInput = buildLabeltextInput("Key:", "Key", encryptionHomePage.keyID());
            keyInputDiv.appendChild(simplePharaohsRodKeyTextInput.label);
            keyInputDiv.appendChild(simplePharaohsRodKeyTextInput.textInput);
            keyInputDiv.appendChild(buildButtonInput("Encrypt", encryptionHomePage.encryptID(), "Encrypt"));
            keyInputDiv.appendChild(buildButtonInput("Decrypt", encryptionHomePage.decryptID(), "Decrypt"));
        break;
        case "Enigma":
            let enigmaWheelOrderTextInput = buildLabeltextInput("Wheel Order:", "WheelOrder", encryptionHomePage.wheelOrderID());
            keyInputDiv.appendChild(enigmaWheelOrderTextInput.label);
            keyInputDiv.appendChild(enigmaWheelOrderTextInput.textInput);
            keyInputDiv.appendChild(document.createElement("br"));
            let enigmaRingSettingsTextInput = buildLabeltextInput("Ring Settings:", "RingSettings", encryptionHomePage.ringSettingsID());
            keyInputDiv.appendChild(enigmaRingSettingsTextInput.label);
            keyInputDiv.appendChild(enigmaRingSettingsTextInput.textInput);
            keyInputDiv.appendChild(document.createElement("br"));
            let enigmaReflectorWiringTextInput = buildLabeltextInput("Reflector Wiring:", "ReflectorWiring", encryptionHomePage.reflectorWiringID());
            keyInputDiv.appendChild(enigmaReflectorWiringTextInput.label);
            keyInputDiv.appendChild(enigmaReflectorWiringTextInput.textInput);
            keyInputDiv.appendChild(document.createElement("br"));
            let enigmaReflectorPositionTextInput = buildLabeltextInput("Reflector Position:", "ReflectorPosition", encryptionHomePage.reflectorPositionID());
            keyInputDiv.appendChild(enigmaReflectorPositionTextInput.label);
            keyInputDiv.appendChild(enigmaReflectorPositionTextInput.textInput);
            keyInputDiv.appendChild(document.createElement("br"));
            let enigmaPlugBoardTextInput = buildLabeltextInput("PlugBoard:", "PlugBoard", encryptionHomePage.plugBoardID());
            keyInputDiv.appendChild(enigmaPlugBoardTextInput.label);
            keyInputDiv.appendChild(enigmaPlugBoardTextInput.textInput);
            keyInputDiv.appendChild(document.createElement("br"));
            keyInputDiv.appendChild(buildButtonInput("Process", encryptionHomePage.processID(), "Process"));
            break;
        default:
    }
}

function activateListeners(encryptionHomePage) {
    encryptionHomePage.encryptByElement().addEventListener("change", encryptionHomePage.handleEncryptBy);
    switch(encryptionHomePage.encryptByElement().value) {
        case "SimplePharaohsRod":
            encryptionHomePage.encryptElement().addEventListener("click", encryptionHomePage.handleEncrypt);
            encryptionHomePage.decryptElement().addEventListener("click", encryptionHomePage.handleDecrypt);
            break;
        case "Enigma":
            encryptionHomePage.processElement().addEventListener("click", encryptionHomePage.handleProcess);
            break;
        default:
            encryptionHomePage.encryptElement().addEventListener("click", encryptionHomePage.handleEncrypt);
            encryptionHomePage.decryptElement().addEventListener("click", encryptionHomePage.handleDecrypt);
    }
}

function encrypt(encryptionType, encryptionKey, messageInput, messageOutput) {
    const encryption = new Encryption(encryptionType, encryptionKey);
    messageOutput.innerHTML = encryption.encrypt(messageInput.value);
}

function encryptMessage(encryptionHomePage) {
    let encryptionType;
    let encryptionKey;
    switch(encryptionHomePage.encryptByElement().value) {
        case "SimplePharaohsRod":
            encryptionType = new EncryptionType(encryptionHomePage.encryptByElement().value);
            encryptionKey = new Key(encryptionType, {size:encryptionHomePage.keyElement().value});
            encrypt(encryptionType, encryptionKey, encryptionHomePage.messageInElement(), encryptionHomePage.encryptedResultElement());
            break;
        case "Enigma":
            encryptionType = new EncryptionType(encryptionHomePage.encryptByElement().value);
            encryptionKey = new Key(encryptionType, {
                wheelOrder:encryptionHomePage.wheelOrderElement().value,
                ringSettings:encryptionHomePage.ringSettingsElement().value,
                reflectorWiring:encryptionHomePage.reflectorWiringElement().value,
                reflectorPosition:encryptionHomePage.reflectorPositionElement().value,
                plugBoard:encryptionHomePage.plugBoardElement().value,
            });
            encrypt(encryptionType, encryptionKey, encryptionHomePage.messageInElement(), encryptionHomePage.encryptedResultElement());
            break;
        default:
            encryptionHomePage.encryptedResultElement().innerHTML = `encrypt for ${encryptionHomePage.encryptByElement().value} is currently not supported!`;
    }
}

function decrypt(encryptionType, encryptionKey, messageInput, messageOutput) {
    const encryption = new Encryption(encryptionType, encryptionKey);
    messageOutput.innerHTML = encryption.decrypt(messageInput.value);
}

function decryptMessage(encryptionHomePage) {
    let encryptionType;
    let encryptionKey;
    switch(encryptionHomePage.encryptByElement().value) {
        case "SimplePharaohsRod":
            encryptionType = new EncryptionType(encryptionHomePage.encryptByElement().value);
            encryptionKey = new Key(encryptionType, {size:encryptionHomePage.keyElement().value});
            decrypt(encryptionType, encryptionKey, encryptionHomePage.messageInElement(), encryptionHomePage.encryptedResultElement());
            break;
        case "Enigma":
            encryptionType = new EncryptionType(encryptionHomePage.encryptByElement().value);
            encryptionKey = new Key(encryptionType, {
                wheelOrder:encryptionHomePage.wheelOrderElement().value,
                ringSettings:encryptionHomePage.ringSettingsElement().value,
                reflectorWiring:encryptionHomePage.reflectorWiringElement().value,
                reflectorPosition:encryptionHomePage.reflectorPositionElement().value,
                plugBoard:encryptionHomePage.plugBoardElement().value,
            });
            decrypt(encryptionType, encryptionKey, encryptionHomePage.messageInElement(), encryptionHomePage.encryptedResultElement());
            break;
        default:
            encryptionHomePage.encryptedResultElement().innerHTML = `decrypt for ${encryptionHomePage.encryptByElement().value} is currently not supported!`;
    }
}

function getIdIndex(nameArray, id) {
    let result=-1;
    nameArray.map((element, index) => {
        if(element==id) {
            result=index;
        }
    });
    return result;
}

class encryptionHomePage {
    pageElement(selector) {
        return pageElementQuery(this.document, selector);
    }
    getPageElements(elementNameArray) {
        return getPageElementArray(this.document, elementNameArray);
    }
    getDOWString() {
        return getDayOfWeekString(this.dow);
    }
    encryptBy() {
        buildKeyDiv(this)
        this.pageElements = this.getPageElements(this.pageElementNames);
        activateListeners(this);
        this.pageElements = this.getPageElements(this.pageElementNames);
        encryptMessageBy(this.messageOutElement(), this.encryptByElement());
    }
    handleEncryptBy() {
        myEncryptionHomePage.encryptBy();
    }
    encrypt(button) {
        encryptMessage(this);
    }
    handleEncrypt() {
        myEncryptionHomePage.encrypt(this);
    }
    decrypt(button) {
        decryptMessage(this);
    }
    handleDecrypt() {
        myEncryptionHomePage.decrypt(this);        
    }
    process(button) {
        encryptMessage(this);
    }
    handleProcess() {
        myEncryptionHomePage.process(this);        
    }
    dowMessageID() {
        return "dowMessage";
    }
    dowMessageElement() {
        return this.pageElements[getIdIndex(this.pageElementNames, this.dowMessageID())]
    }
    messageOutID() {
        return "messageOut";
    }
    messageOutElement() {
        return this.pageElements[getIdIndex(this.pageElementNames, this.messageOutID())]
    }
    encryptByID() {
        return "encryptBy";
    }
    encryptByElement() {
        return this.pageElements[getIdIndex(this.pageElementNames, this.encryptByID())]
    }
    keyDivID() {
        return "keyDiv";
    }
    keyDivElement() {
        return this.pageElements[getIdIndex(this.pageElementNames, this.keyDivID())]
    }
    keyID() {
        return "key";
    }
    keyElement() {
        return this.pageElements[getIdIndex(this.pageElementNames, this.keyID())]
    }
    wheelOrderID() {
        return "wheelOrder";
    }
    wheelOrderElement() {
        return this.pageElements[getIdIndex(this.pageElementNames, this.wheelOrderID())]
    }
    ringSettingsID() {
        return "ringSettings";
    }
    ringSettingsElement() {
        return this.pageElements[getIdIndex(this.pageElementNames, this.ringSettingsID())]
    }
    reflectorWiringID() {
        return "reflectorWiring";
    }
    reflectorWiringElement() {
        return this.pageElements[getIdIndex(this.pageElementNames, this.reflectorWiringID())]
    }
    reflectorPositionID() {
        return "reflectorPosition";
    }
    reflectorPositionElement() {
        return this.pageElements[getIdIndex(this.pageElementNames, this.reflectorPositionID())]
    }
    plugBoardID() {
        return "plugBoard";
    }
    plugBoardElement() {
        return this.pageElements[getIdIndex(this.pageElementNames, this.plugBoardID())]
    }
    encryptID() {
        return "encrypt";
    }
    encryptElement() {
        return this.pageElements[getIdIndex(this.pageElementNames, this.encryptID())]
    }
    decryptID() {
        return "decrypt";
    }
    decryptElement() {
        return this.pageElements[getIdIndex(this.pageElementNames, this.decryptID())]
    }
    processID() {
        return "process";
    }
    processElement() {
        return this.pageElements[getIdIndex(this.pageElementNames, this.processID())]
    }
    messageInID() {
        return "messageIn";
    }
    messageInElement() {
        return this.pageElements[getIdIndex(this.pageElementNames, this.messageInID())]
    }
    encryptedResultID() {
        return "encryptedResult";
    }
    encryptedResultElement() {
        return this.pageElements[getIdIndex(this.pageElementNames, this.encryptedResultID())]
    }
    constructor(document) {
        this.document = document
        this.currentDate = new Date();
        this.dow = this.currentDate.getDay();
        this.pageElementNames = [this.dowMessageID(),
            this.messageOutID(),
            this.encryptByID(),
            this.keyDivID(),
            this.encryptID(),
            this.decryptID(),
            this.processID(),
            this.messageInID(),
            this.encryptedResultID(),
            this.keyID(),
            this.wheelOrderID(),
            this.ringSettingsID(),
            this.reflectorWiringID(),
            this.reflectorPositionID(),
            this.plugBoardID()
        ];
        this.pageElements = this.getPageElements(this.pageElementNames);
        buildKeyDiv(this)
        this.pageElements = this.getPageElements(this.pageElementNames);
        this.dowMessageElement().innerHTML = this.getDOWString();
        this.encryptBy();
    }
    run() {
        activateListeners(this);
    }
}

const myEncryptionHomePage = new encryptionHomePage(document);
myEncryptionHomePage.run();