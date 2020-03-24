const { SESSION_TIMEOUT } = require('./constants');

class Session {
    createEntry = () => null;
    map;
    timeout = 1000;
    constructor(_createEntry, _timeout) {
        this.createEntry = _createEntry ? _createEntry : () => null;
        this.timeout = _timeout;
        this.map = new Map();
    }
    
    build(key) {
       const entry = this.createEntry();
       this.map.set(key, entry);
       this.gc(key);
       return entry;
    }
    
    gc(key) {
        setTimeout(() => {
            if (this.map.has(key))
                this.map.delete(key);
        }, SESSION_TIMEOUT)
    }
}

const getHandler = {
    get: function(target, phrase) {
        return target.map.has(phrase)
            ? target.map.get(phrase)
            : target.build(phrase);
    },
    set: function(target, phrase, value) {
        target.map.set(phrase, value);
    }
};

const constructorHandler = {
    construct: function(target, [_createEntry, _timeout]) {
        return new Proxy(new Session(_createEntry, _timeout), getHandler);
    }
};

module.exports = new Proxy(Session, constructorHandler);