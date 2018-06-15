module.exports = (min, max) => {
  return Math.floor(min + Math.random() * (max-min + 1));
}