module.exports = category => {
  switch (category) {
    case '家居物業':
      return '<i class="fas fa-home"></i>'
    case '交通出行':
      return '<i class="fas fa-shuttle-van"></i>'
    case '休閒娛樂':
      return '<i class="fas fa-grin-beam"></i>'
    case '餐飲食品':
      return '<i class="fas fa-utensils"></i>'
    case '其他':
      return '<i class="fas fa-pen"></i>'
  }
}