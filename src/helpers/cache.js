const _cache = {};

module.exports = {

    set(key, value) {
        _cache[key] = value;
    },

    get(key) {
        return _cache[key];
    },

    delete(key) {
        delete _cache[key];
    }
};