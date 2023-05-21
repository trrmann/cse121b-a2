import { encrypt, decrypt } from "./pharoahsRod";

class encryptionHomePage {
    pageElement(selector) {
        return this.doc.querySelector(selector);
    }
    getPageElements(elementNameArray) {
        let elements = [];
        elementNameArray.foreach((element, index) => {
            elements[index] = this.pageElement(element);
        });
        return elements;
    }
    getDOWString() {
        let result;
        switch(this.dow) {
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
    constructor(document) {
        this.doc = document
        this.currentDate = new Date();
        this.dow = currentDate.getDay();
        this.pageElementNames = ["#dowMessage","#message"];
        this.pageElements = this.getPageElements(this.pageElementNames);
        this.pageElements[0].innerHTML = this.getDOWString();

    }

}

const myEncryptionHomePage = new encryptionHomePage(document);
