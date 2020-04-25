/**
 * @param {number} n
 * @param {number[][]} reservedSeats
 * @return {number}
 */
var maxNumberOfFamilies = function(n, reservedSeats) {
  const seatToBitsMap = [0x80, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01]
  const newRow = 0x00
  const rowToBits = {}
  for(let r of reservedSeats) {
    if(r[1]>1 && r[1]<10) {
      rowToBits[r[0]] = (rowToBits[r[0]] || newRow) | seatToBitsMap[r[1]-2]
    }
  }

  let famEvicted = 0
  const masks = [
    0x0f, // 00 0011 11
    0xc3, // 11 0000 11
    0xf0 // 11 1100 00
  ]
  const rowsOfReservedSeats = Object.keys(rowToBits)
  for(let row of rowsOfReservedSeats) {
	  rowBits = rowToBits[row]
    if((rowBits | masks[0]) === masks[0] && (rowBits | masks[2]) === masks[2]) {
      continue // can seat both families
    }
    const canSeatOneFam = masks.some(mask => (rowBits | mask) === mask)
    famEvicted += canSeatOneFam ? 1 : 2
  }
  return n * 2 - famEvicted
};