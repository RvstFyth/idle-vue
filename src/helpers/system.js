module.exports = {

    timestamp () {
        return Date.now() / 1000 | 0;
    },

    timestampMs() {
        return new Date().getTime();
    }
}