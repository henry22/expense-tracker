module.exports = records => {
  return records.reduce((acc, cur) => acc += cur.amount, 0)
}