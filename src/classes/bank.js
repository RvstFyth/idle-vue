class Bank
{

    constructor(items = {}) {
        this.items = items;
    }

    addItem(name, amount = 1) {
        if(!this.items[name]) {
            this.items[name] = {
                amount: amount,
                item: null // TODO this should be a reference to item module
            }
        }
        else {
            this.items[name].amount += amount;
        }
    }

    hasItem(name) {
        return typeof this.items[name] !== 'undefined';
    }

    takeItem(name, amount = 1) {
        if(this.items[name]) {
            if(this.items[name].amount > amount) {
                this.items[name].amount -= amount;
                return true;
            }
            else if(this.items[name].amount === amount) {
                delete this.items[name];
                return true;
            }
        }

        return false;
    }

    fromJSON(json) {
        // TODO: When item classes are implemented, a reference to the item class should be attached in here.
        this.items = JSON.parse(json);
    }

    toJSON() {
        return JSON.stringify(this.items);
    }
}

module.exports = Bank;