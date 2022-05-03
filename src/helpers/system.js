module.exports = {

  timestamp() {
    return Date.now() / 1000;
  },

  timestampMs() {
    return new Date().getTime();
  },
};
