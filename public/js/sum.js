module.exports = function (records) {
  return records.reduce((acc, cur) => acc += cur.amount, 0)
}