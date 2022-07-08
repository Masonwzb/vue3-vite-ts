export class Other {
    obj = {
        number: 1
    }

    constructor() {
    }

    getNumber() {
        return this.obj.number
    }

    increaseNum() {
        this.obj.number++
    }

    decreaseNum() {
        this.obj.number--
    }
}
